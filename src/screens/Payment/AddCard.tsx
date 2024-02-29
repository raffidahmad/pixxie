import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { MoveLeft } from 'lucide-react-native';
import Buttons from '../../components/Buttons';

import { GlobalStyle, HomeStyle, CardStyle } from '@/styles';
import card2Image from '@/assets/images/card2.png';
import StripeScreen from './StripeScreen';
import { fetchPaymentMethods } from '@/api/backend/stripe';
import { useEffect, useState } from 'react';
import { useSession } from '@/context/ctx';
import PaymentMethod from '@/components/PaymentMethod';
import { router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoading, jobRequestAtom } from '@/recoil/atoms';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';
import { createRequest } from '@/api/firestore/jobs';

const AddCard = () => {
  const { session } = useSession();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [, setIsLoaderActive] = useRecoilState(isLoading);
  const jobRequest = useRecoilValue(jobRequestAtom);

  useEffect(() => {
    setIsLoaderActive;
    try {
      fetchPaymentMethods({ session }).then((data) => {
        setPaymentMethods(data);
        setIsLoaderActive(false);
      });
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      setIsLoaderActive(false);
    }
  }, []);

  //console.log('paymentMethods', paymentMethods);

  const showError = (message: string) => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: message
    });
  };

  const handleSearchforBarber = () => {
    //atleast 1 payment method added
    setIsLoaderActive(true);
    // if (paymentMethods.length < 1) {
    //   Toast.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: 'Please add a payment method'
    //   });
    //   setIsLoaderActive(false);
    //   return;
    // }
    createRequest(jobRequest, showError)
      .then((jobRequestId) => {
        router.push(`/map`);
      })
      .catch((error) => {
        showError('Error creating job request');
      });
    setIsLoaderActive(false);

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={GlobalStyle.containers}>
        <View style={HomeStyle.welBox}>
          <TouchableOpacity style={{ marginBottom: 24, marginTop: 24 }} onPress={() => router.back()}>
            <Text>
              <MoveLeft size={'24px'} color={'#212121'} />
            </Text>
          </TouchableOpacity>
          <Text style={HomeStyle.Welcomes}>Payment Methods</Text>
          <Text style={HomeStyle.service}>Your active payment methods</Text>

          <View style={{ marginVertical: 10 }}>
            <ImageBackground
              source={card2Image}
              style={CardStyle.cardsImg}
              imageStyle={CardStyle.imageStyle}
            ></ImageBackground>
          </View>

          {paymentMethods.map((method, index) => (
            <PaymentMethod key={index} last4={method?.last4} cardType={method?.brand} />
          ))}

          <View>
            <StripeScreen />
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 24 }}>
        <Buttons title={'Continue'} onClick={handleSearchforBarber} />
      </View>
    </View>
  );
};

export default AddCard;
