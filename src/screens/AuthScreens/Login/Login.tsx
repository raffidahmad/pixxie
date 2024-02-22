import { useState } from 'react';
import { Text, View, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native';
import { MoveLeft, Mail, LockKeyhole, EyeOff } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import googleIcon from '@/assets/images/google.png';
import { GlobalStyle, LoginStyle } from '@/styles';

import Buttons from '@/components/Buttons';
import { Link } from 'expo-router';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigation: any = useNavigation();

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

  const navigate = () => {
    if (validateForm()) {
      navigation.navigate('Home');
      setFormData({ email: '', password: '' });
      setErrors({ email: '', password: '' });
    }
  };
  const handleMoveLeft = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor='#ffff' />
      <View style={GlobalStyle.containers}>
        <View>
          <View style={LoginStyle.Welcome}>
            <TouchableOpacity style={{ marginBottom: 24 }} onPress={handleMoveLeft}>
              <Text>
                <MoveLeft size={24} color={'#212121'} />
              </Text>
            </TouchableOpacity>
            <Text style={LoginStyle.welcomeText}>Welcome back</Text>
            <Text style={LoginStyle.Subtext}>Let’s find a barber for you!</Text>
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
            <Buttons title={'Login'} onClick={navigate} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={LoginStyle.Subtext}>Already have an account?</Text>
          </View>

          <Link href='/sign-up' style={LoginStyle.google}>
            <Text style={LoginStyle.googleText}>Create Account</Text>
          </Link>

          <View style={LoginStyle.Orbox}>
            <View style={LoginStyle.emptyBox}></View>
            <Text style={LoginStyle.OrText}>Or</Text>
            <View style={LoginStyle.emptyBox}></View>
          </View>

          <TouchableOpacity style={LoginStyle.google}>
            <Image source={googleIcon} style={{ width: 20, height: 20, marginRight: 10 }} />
            <Text style={LoginStyle.googleText}>Continue with google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
