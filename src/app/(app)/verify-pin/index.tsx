import { View, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { MoveLeft } from 'lucide-react-native';
import { GlobalStyle, HomeStyle } from '@/styles';
import { useState, useEffect } from 'react';
import Buttons from '@/components/Buttons';
import { router } from 'expo-router';

const ClientPin = () => {
  const [pin, setPin] = useState<number>(2534);

  const getPinDigit = (index: number) => {
    const pinString = pin.toString();
    const pinArray = pinString.split('');

    // Get the digit at the specified index
    return parseInt(pinArray[index], 10);
  };

  const navigate = () => {

    router.replace('/service-started');
  };

  const handleMoveLeft = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar />
      <View style={GlobalStyle.containers}>
        <View style={{ marginTop: 24 }}>
          <View style={HomeStyle.welBox}>
            <TouchableOpacity style={{ marginBottom: 24 }} onPress={handleMoveLeft}>
              <Text>
                <MoveLeft size={'24px'} color={'#212121'} />
              </Text>
            </TouchableOpacity>

            <Text style={HomeStyle.Welcomes}>PIN code</Text>
            <Text style={HomeStyle.service}>Please share your PIN code with the barber.</Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 24
              }}
            >
              {
                // This is a better way to handle the PIN inputs
                [0, 1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={{
                      borderRadius: 12,
                      backgroundColor: '#FAFAFA',
                      borderWidth: 1,
                      borderColor: '#EEEEEE',
                      height: 61,
                      width: 61,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '700',
                        fontFamily: 'UrbanistBold'
                      }}
                    >
                      {getPinDigit(i)}
                    </Text>
                  </View>
                ))
              }

              {/* <View
                style={{
                  borderRadius: 12,

                  backgroundColor: '#FAFAFA',
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  height: 61,
                  width: 61,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TextInput
                  keyboardType='numeric'
                  value={pin.pin1}
                  onChangeText={(text) => {
                    setPin((prevPin) => ({ ...prevPin, pin1: text }));
                  }}
                  style={{
                    fontSize: 24,
                    fontWeight: '700',
                    fontFamily: 'UrbanistBold'
                  }}
                ></TextInput>
              </View>
              <View
                style={{
                  borderRadius: 12,

                  backgroundColor: '#FAFAFA',
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  height: 61,
                  width: 61,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TextInput
                  keyboardType='numeric'
                  value={pin.pin2}
                  onChangeText={(text) => {
                    setPin((prevPin) => ({ ...prevPin, pin2: text }));
                  }}
                  style={{
                    fontSize: 24,
                    fontWeight: '700',
                    fontFamily: 'UrbanistBold'
                  }}
                ></TextInput>
              </View>
              <View
                style={{
                  borderRadius: 12,

                  backgroundColor: '#FAFAFA',
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  height: 61,
                  width: 61,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TextInput
                  keyboardType='numeric'
                  onChangeText={(text) => {
                    setPin((prevPin) => ({ ...prevPin, pin3: text }));
                  }}
                  value={pin.pin3}
                  style={{
                    fontSize: 24,
                    fontWeight: '700',
                    fontFamily: 'UrbanistBold'
                  }}
                ></TextInput>
              </View>
              <View
                style={{
                  borderRadius: 12,

                  backgroundColor: '#FAFAFA',
                  borderWidth: 1,
                  borderColor: '#EEEEEE',
                  height: 61,
                  width: 61,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TextInput
                  keyboardType='numeric'
                  onChangeText={(text) => {
                    setPin((prevPin) => ({ ...prevPin, pin4: text }));
                  }}
                  value={pin.pin4}
                  style={{
                    fontSize: 24,
                    fontWeight: '700',
                    fontFamily: 'UrbanistBold'
                  }}
                ></TextInput>
              </View> */}
            </View>

            {/* <TouchableOpacity 
            //onPress={handleResendCode}
            >
              <Text
                style={{
                  marginVertical: 10,
                  textAlign: 'center',
                  color: '#192A53',
                  fontSize: 16,
                  fontFamily: 'UrbanistRegular'
                }}
              >
                Resend code in {timer}s
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClientPin;
