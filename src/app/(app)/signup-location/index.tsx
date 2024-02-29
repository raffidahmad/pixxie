import SignupLocation from '@/screens/AuthScreens/Signup/SignupLocation';
import React from 'react';
import { View, Text } from 'react-native';
import { GlobalStyle, LoginStyle } from '@/styles';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';

const Index = () => (
  <View style={tw`mt-14 h-full overflow-scroll`}>
    <StatusBar backgroundColor='#ffff' />
    <View style={GlobalStyle.containers}>
      <View>
        <View style={LoginStyle.HeaderBox}>
          <View style={LoginStyle.progressContainer}>
            <View style={[LoginStyle.progressStep]} />
            <View style={[LoginStyle.progressStep, LoginStyle.completedStep]} />
          </View>
        </View>
        <Text style={LoginStyle.welcomeText}>Join Pixxie today</Text>
        <Text style={LoginStyle.Subtext}>Get started by setting up your account</Text>

        <View>
          <View style={LoginStyle.Welcome}>
            <SignupLocation />
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default Index;
