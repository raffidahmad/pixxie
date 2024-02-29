import { useState } from 'react';
import { Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { Mail, LockKeyhole, EyeOff } from 'lucide-react-native';

import { GlobalStyle, LoginStyle } from '@/styles';

import Buttons from '@/components/Buttons';
import { Link, router } from 'expo-router';
import { signInWithEmail } from '@/api/firestore/auth';
import { useSession } from '@/context/ctx';
import { Barber } from '@/types/Common.types';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import tw from 'twrnc';
import { useRecoilState } from 'recoil';
import { isLoading } from '@/recoil/atoms';
import OverlayLoader from '@/components/OverlayLoader';
import GoogleSignIn from '@/components/GoogleSignIn';

const Login = () => {
  const { signIn } = useSession();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [, setIsLoaderActive] = useRecoilState(isLoading);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Validate email
    if (!formData.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    } else {
      // Add more sophisticated email validation if needed
      // For simplicity, we're only checking for the presence of '@'
      if (!formData.email.includes('@')) {
        isValid = false;
        newErrors.email = 'Invalid email format';
      }
    }

    // Validate password
    if (!formData.password) {
      isValid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return isValid;
  };

  const showError = (message: string) => {
    setIsLoaderActive(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'There was an error logging in. Please try again.'
    });
  };

  const handleLogin = () => {
    if (validateForm()) {
      setIsLoaderActive(true);
      signInWithEmail(formData.email, formData.password, showError).then((user) => {
        if (user) {
          signIn(user as Barber);
          setIsLoaderActive(false);
          if(user?.home) {
            router.replace('/');
          } else {
            router.push('/signup-location');
          }
        } else {
          setIsLoaderActive(false);
          showError('There was an error logging in. Please try again.');
        }
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor='#ffff' />
      <View style={GlobalStyle.containers}>
        <View style={tw`mt-10`}>
          <View style={LoginStyle.Welcome}>
            <Text style={LoginStyle.welcomeText}>Welcome back</Text>
          </View>
        </View>
        <View style={LoginStyle.center}>
          <View style={LoginStyle.inpBox}>
            <Text>
              <Mail color={'#212121'} size={16} />
            </Text>
            <TextInput
              placeholder='Email address'
              style={LoginStyle.inp}
              placeholderTextColor='#616161'
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
          <Text style={{ color: 'red' }}>{errors.email}</Text>
          <View style={LoginStyle.inpBox}>
            <Text>
              <LockKeyhole color={'#212121'} size={16} />
            </Text>
            <TextInput
              placeholder='Password'
              style={LoginStyle.inp}
              placeholderTextColor='#212121'
              secureTextEntry={!showPassword}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />

            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text>
                <EyeOff size={16} color={'#212121'} />
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'red' }}>{errors.password}</Text>
          <View>
            <Buttons title={'Login'} onClick={handleLogin} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={LoginStyle.Subtext}>Don't have an account?</Text>
          </View>

          <Link href='/sign-up' style={LoginStyle.google}>
            <Text style={LoginStyle.googleText}>Create Account</Text>
          </Link>

          <View style={LoginStyle.Orbox}>
            <View style={LoginStyle.emptyBox}></View>
            <Text style={LoginStyle.OrText}>Or</Text>
            <View style={LoginStyle.emptyBox}></View>
          </View>

          <GoogleSignIn signIn={signIn} />
        </View>
      </View>
    </View>
  );
};

export default Login;
