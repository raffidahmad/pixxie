import { Text, View, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';
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
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import { Link, router } from 'expo-router';
import tw from 'twrnc';
import SignupLocation from './SignupLocation';
import { useSession } from '@/context/ctx';
import { signUpWithEmail } from '@/api/firestore/auth';
import { useRecoilState } from 'recoil';
import { isLoading } from '@/recoil/atoms';
import GoogleSignIn from '@/components/GoogleSignIn';

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
  const { signIn } = useSession();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const toast = useToast();
  const [isLoaderActive, setIsLoaderActive] = useRecoilState(isLoading);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(step + 1);
      router.push('/signup-location');
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

  const showError = (message: string) => {
    setIsLoaderActive(false);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'There was an error logging in. Please try again.'
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoaderActive(true);
      await signUpWithEmail(data.email, data.password, `${data.first_name} ${data.last_name}`, 'user', showError).then(
        (user) => {
          if (user) {
            signIn(user);
            setIsLoaderActive(false);
            handleNextStep();
          }
        }
      );
    } catch (e) {
      setIsLoaderActive(false);
      toast.show('Unable to sign up with email');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
             
                    <View>
                      <View style={{ marginTop: 10, marginBottom: 0 }}>
                        <View style={{ marginBottom: 10 }}>
                          <Text style={LoginStyle.Subtext}>Already have an account?</Text>
                        </View>

                        <Link href='/sign-in' style={LoginStyle.google}>
                          <Text style={LoginStyle.googleText}>Login</Text>
                        </Link>
                        <Text style={tw`my-2 text-center`}>Or</Text>

                        <GoogleSignIn signIn={signIn} />
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
                  
                </View>
              </View>
            </View>
          </View>
          {step === 1 && (
            <View style={{ paddingHorizontal: 24 }}>
              <Buttons title={'Next'} onClick={
                handleSubmit(onSubmit)
                } />
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;
