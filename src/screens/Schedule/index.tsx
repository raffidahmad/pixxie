import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Clock, MoveLeft } from 'lucide-react-native';
import { useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { GlobalStyle, HomeStyle, ScheduleStyle } from '@/styles';

import Buttons from '@/components/Buttons';
import Calender from '@/components/Calender';
import { router } from 'expo-router';
import { useRecoilState } from 'recoil';
import { jobRequestAtom } from '@/recoil/atoms';
import tw from 'twrnc';
import { useSession } from '@/context/ctx';
import { User } from '@/types/Common.types';

const Schedule = () => {
  // const [selectedTime, setSelectedTime] = useState('');
  const {session} = useSession();
  const [selectedDate, setSelectedDate] = useState('');
  // const [numberOfChildren, setNumberOfChildren] = useState('');
  // const [isBookingForChild, setIsBookingForChild] = useState(false);

  const [jobRequest, setJobRequest] = useRecoilState(jobRequestAtom);

  const navigate = () => {
    // Check if a valid time is selected
    // if (!jobRequest.time) {
    //   alert('Error:Please select a valid time.');
    //   return;
    // }

    // // Check if a valid date is selected
    // if (!jobRequest.date) {
    //   alert('Error:Please select a valid date.');
    //   return;
    // }

    if (jobRequest.isBookingForChild) {
      // Check if a valid number of children is entered
      if (!jobRequest.noOfChildren || isNaN(Number(jobRequest.noOfChildren))) {
        alert('Error: Please enter a valid number of children.');
        return;
      }
    }

    // Check if a valid number of children is entered
    setJobRequest((prevJobRequest) => ({
      ...prevJobRequest,
      customer: session as User
    }));

    router.push('/payment/select-method');
  };

  // const handleNowButtonClick = () => {
  //   const now = new Date();
  //   const hours = now.getHours().toString().padStart(2, '0');
  //   const minutes = now.getMinutes().toString().padStart(2, '0');
  //   const currentTime = `${hours}:${minutes}`;

  //   setSelectedTime(currentTime);
  //   console.log(selectedTime);
  // };

  const handleBookingForChild = (isYes: boolean) => {
    setJobRequest((prevJobRequest) => ({
      ...prevJobRequest,
      isBookingForChild: isYes
    }));
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleMoveBack = () => {
    router.back();
  };

  const handleNoOfChildren = (children: number) => {
    setJobRequest((prevJobRequest) => ({
      ...prevJobRequest,
      noOfChildren: children
    }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={GlobalStyle.containers}>
          <View style={HomeStyle.welBox}>
            <TouchableOpacity style={{ marginBottom: 24 }} onPress={handleMoveBack}>
              <Text>
                <MoveLeft size={'24px'} color={'#212121'} />
              </Text>
            </TouchableOpacity>
            <Text style={HomeStyle.Welcomes}>Select a time</Text>
            <Text style={HomeStyle.service}>When would you like to see the barber??</Text>

            <View style={ScheduleStyle.scheduleBox}>
              <Text style={ScheduleStyle.selectTime}>Select Time</Text>
              <View style={ScheduleStyle.timeBox}>
                <TouchableOpacity
                  style={ScheduleStyle.Now}
                  // onPress={handleNowButtonClick}
                >
                  <Text style={ScheduleStyle.NowText}>Now</Text>
                </TouchableOpacity>

                <View style={tw`flex-row-reverse items-center gap-2`}>
                  <Text style={tw`text-gray-400`}>Coming soon</Text>
                  <View style={ScheduleStyle.timeinput} pointerEvents='none'>
                    <TextInput
                      // keyboardType="numeric"
                      placeholder='Type time'
                      style={ScheduleStyle.inpt}
                      //value={selectedTime}
                      //onChangeText={(text) => setSelectedTime(text)}
                    />
                    <Text>
                      <Clock size={16.67} color={'#212121'} />
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={ScheduleStyle.scheduleBox}>
              <Text style={ScheduleStyle.selectTime}>Select Date</Text>
              <Calender onDateSelect={handleDateSelect} />
            </View>
            <View style={ScheduleStyle.scheduleBox}>
              <Text style={ScheduleStyle.selectTime}>Booking for a child?</Text>
              <View style={ScheduleStyle.childBox}>
                <TouchableOpacity
                  style={jobRequest.isBookingForChild ? ScheduleStyle.childbtnFilled : ScheduleStyle.childbtn}
                  onPress={() => handleBookingForChild(true)}
                >
                  <Text style={ScheduleStyle.childText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={!jobRequest.isBookingForChild ? ScheduleStyle.childbtnFilled : ScheduleStyle.childbtn}
                  onPress={() => handleBookingForChild(false)}
                >
                  <Text style={[ScheduleStyle.childText]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={ScheduleStyle.scheduleBox}>
              <Text style={ScheduleStyle.selectTime}>Number of children</Text>
              <View style={ScheduleStyle.timeinput2}>
                <TextInput
                  keyboardType='numeric'
                  placeholder='child'
                  style={ScheduleStyle.inpt}
                  value={jobRequest.noOfChildren}
                  onChangeText={(text) => handleNoOfChildren(text)}
                />
                <Text>
                  <FontAwesome name='users' size={16.67} color='#212121' />
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 24 }}>
        <Buttons title={'See barbers'} onClick={navigate} />
      </View>
    </View>
  );
};

export default Schedule;
