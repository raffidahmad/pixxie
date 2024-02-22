import { Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Mail, LockKeyhole, User, MoveLeft } from 'lucide-react-native';
import { FormData } from '@/types/Auth.types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from 'react-native-toast-notifications';

import { LoginStyle, GlobalStyle } from '@/styles';
import FormInput from '@/components/FormInput';
import Buttons from '@/components/Buttons';

import googleIcon from '@/assets/images/google.png';
import { Link } from 'expo-router';
import tw from 'twrnc';
import SignupLocation from './SignupLocation';

const formSchema = z
  .object({
    email: z.string().email('Please enter a valid email'),
    first_name: z.string().min(3, 'First Name must be at least 3 characters'),
    last_name: z.string().min(3, 'Last Name must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters')
  })
  .refine((data: FormData) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'] // specifying the path of the field that fails validation
  });

const Signup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const toast = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      //signUpWithEmail(data.email, data.password, `${data.first_name} ${data.last_name}`);
      handleNextStep();
    } catch (e) {
      toast.show('Unable to sign up with email');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#fff' }} keyboardShouldPersistTaps='handled'>
        <StatusBar backgroundColor='#ffff' />
        <View style={GlobalStyle.containers}>
          <View>
            <View style={LoginStyle.HeaderBox}>
              {step !== 1 && (
                <TouchableOpacity style={{}} onPress={handlePreviousStep}>
                  <Text>
                    <MoveLeft size={24} color={'#212121'} />
                  </Text>
                </TouchableOpacity>
              )}
              <View style={LoginStyle.progressContainer}>
                <View style={[LoginStyle.progressStep, step >= 1 && LoginStyle.completedStep]} />
                <View style={[LoginStyle.progressStep, step >= 2 && LoginStyle.completedStep]} />
              </View>
            </View>
            <Text style={LoginStyle.welcomeText}>Join Pixxie today</Text>
            <Text style={LoginStyle.Subtext}>Get started by setting up your account</Text>

            <View>
              <View style={LoginStyle.Welcome}>
                {step === 1 ? (
                  <View>
                    <View style={{ marginTop: 10, marginBottom: 0 }}>
                      <View style={{ marginBottom: 10 }}>
                        <Text style={LoginStyle.Subtext}>Already have an account?</Text>
                      </View>

                      <Link href='/login' style={LoginStyle.google}>
                        <Text style={LoginStyle.googleText}>Login</Text>
                      </Link>
                      <Text style={tw`my-2 text-center`}>Or</Text>
                      <TouchableOpacity
                        style={LoginStyle.google}
                        // onPress={handleGoogleSignIn}
                      >
                        <Image source={googleIcon} style={{ width: 20, height: 20, marginRight: 10 }} />
                        <Text style={LoginStyle.googleText}>Continue with Google</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={LoginStyle.Orbox}>
                      <View style={LoginStyle.emptyBox}></View>
                      <Text style={LoginStyle.OrText}>Or</Text>
                      <View style={LoginStyle.emptyBox}></View>
                    </View>

                    <FormInput
                      control={control}
                      name='first_name'
                      placeholder='First Name'
                      iconComponent={<User color={'#212121'} size={16} />}
                      // other props...
                    />
                    <FormInput
                      control={control}
                      name='last_name'
                      placeholder='Last Name'
                      iconComponent={<User color={'#212121'} size={16} />}
                      // other props...
                    />
                    <FormInput
                      control={control}
                      name='email'
                      placeholder='Email Address'
                      iconComponent={<Mail color={'#212121'} size={16} />}
                      // other props...
                    />
                    <FormInput
                      control={control}
                      name='password'
                      placeholder='Password'
                      secureTextEntry={!showPassword}
                      isPassword
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                      iconComponent={<LockKeyhole color={'#212121'} size={16} />}
                      // other props...
                    />
                    <FormInput
                      control={control}
                      name='confirmPassword'
                      placeholder='Confirm Password'
                      secureTextEntry={!confirmShowPassword}
                      isPassword
                      showPassword={confirmShowPassword}
                      togglePasswordVisibility={togglePasswordVisibility2}
                      iconComponent={<LockKeyhole color={'#212121'} size={16} />}
                      // other props...
                    />
                  </View>
                ) : step === 2 ? (
                  <View>
                    <SignupLocation />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 24 }}>
          <Buttons title={'Next'} onClick={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
