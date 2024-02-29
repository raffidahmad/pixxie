import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Minus, MapPin, Phone, X, MessageCircleMore } from 'lucide-react-native';
import Buttons from '@/components/Buttons';
import { LoginStyle, MapStyle } from '@/styles';
import { AntDesign } from '@expo/vector-icons';
import barberImage from '@/assets/images/barber2.jpg';
import { Barber, User } from '@/types/Common.types';
import tw from 'twrnc';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Check, ChevronDown, Clock2 } from 'lucide-react-native';
import { router } from 'expo-router';

const BarberInfo = ({
  barber,
  handleNextBarber,
  isJobAccepted,
  handleDismissSearch,
  sendRequestToBarber
}: {
  barber: Barber;
  handleNextBarber: () => void;
  isJobAccepted: boolean;
  handleDismissSearch: () => void;
  sendRequestToBarber: () => void;
}) => {

  const [showMore, setShowMore] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [travelTime, setTravelTime] = useState('5');
  const [barberLocationName, setBarberLocationName] = useState('');
  
  const handleSeeMoreClick = () => {
    console.log('see more clicked');
    setShowMore((prevShowMore) => !prevShowMore);
  };
  return (
    <View>
      <View style={tw`px-5`}>
        <View style={{ flex: 1 }}>
          <View style={MapStyle.ScrollHeader}>
            <Text style={MapStyle.HeaderText}>Finding you a barber...</Text>
            <Text style={MapStyle.Text2}>
              {travelTime}
              <Text> mins</Text>
              <Text style={{ marginLeft: 10 }}>
                <Clock2 color={'#192A53'} size={16} />
              </Text>
            </Text>
          </View>

          <Text style={MapStyle.check}>
            Criminal Background Check{' '}
            {loaderVisible ? (
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <ActivityIndicator size='small' color='#192A53' />
              </View>
            ) : (
              <Check size={12} color='#192A53' />
            )}
          </Text>
          <Text style={MapStyle.check}>
            Barber Certification Check{' '}
            {loaderVisible ? (
              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <ActivityIndicator size='small' color='#192A53' />
              </View>
            ) : (
              <Check size={12} color='#192A53' />
            )}
          </Text>

          <TouchableOpacity style={MapStyle.seemore} onPress={handleSeeMoreClick}>
            <Text style={MapStyle.seeText}>see more</Text>
            <Text>
              <ChevronDown color={'#212121'} size={16} />
            </Text>
          </TouchableOpacity>
          {showMore && (
            <View>
              <View style={MapStyle.hr2}></View>
              <View style={MapStyle.clintBox}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    source={barberImage}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 40,
                      marginRight: 5
                    }}
                  />
                  <View>
                    <Text style={MapStyle.clintName}>{barber?.businessName || barber?.displayName || ''}</Text>
                    <Text style={MapStyle.clintLocation}>
                      <MapPin size={13} color={'#192A53'} />
                      {barberLocationName || ''}
                    </Text>
                  </View>
                </View>

                <Text>
                  <AntDesign name={'star'} size={15} color='gold' />
                  4.8
                </Text>
              </View>

              <View>
                <View style={MapStyle.reqstbuttonsBox}>
                  <TouchableOpacity style={MapStyle.requestbtns}>
                    <Text>
                      <X color={'#fff'} size={24} />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={MapStyle.requestbtns}>
                    <Text>
                      <MessageCircleMore color={'#fff'} size={24} />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={MapStyle.requestbtns}>
                    <Text>
                      <Phone color={'#fff'} size={24} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
        <View>
          <Buttons
            title={isJobAccepted ? 'Verify PIN' : 'Send Request'}
            onClick={() => {
              if (isJobAccepted) {
                //handleVerifyPIN();
                router.push('/verify-pin');
              } else {
                sendRequestToBarber(barber);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default BarberInfo;

// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { MapPin, Phone, X, MessageCircleMore } from 'lucide-react-native';
// import Buttons from '@/components/Buttons';
// import { LoginStyle, MapStyle } from '@/styles';
// import { AntDesign } from '@expo/vector-icons';
// import barberImage from '@/assets/images/barber2.jpg';
// import { Service, User } from '@/types/Common.types';
// import tw from 'twrnc';
// import * as Linking from 'expo-linking';

// const ClientInfo = ({
//   customer,
//   isJobAccepted,
//   handleDismiss,
//   handleStartJob,
//   handleEndJob,
//   services,
//   time,
//   isChild,
//   distance
// }: {
//   customer: User;
//   isJobAccepted: boolean;
//   handleDismiss: () => void;
//   handleStartJob: () => void;
//   handleEndJob: () => void;
//   services: Service[];
//   time: string;
//   isChild?: boolean;
//   distance: string;
// }) => {
//   return (
//     <View style={tw`mx-5`}>
//       <View style={tw`flex flex-row justify-between`}>
//         <Text style={MapStyle.HeaderText}>Client</Text>
//         <Text style={MapStyle.Text2}>{distance}</Text>
//       </View>
//       {/* underline here */}
//       <View style={MapStyle.hr}></View>
//       {/*  */}
//       <View style={MapStyle.clintBox}>
//         <View
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             alignItems: 'center'
//           }}
//         >
//           <Image
//             source={barberImage}
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: 40,
//               marginRight: 5
//             }}
//           />
//           <View>
//             <Text style={MapStyle.clintName}>Client name</Text>
//             <Text style={MapStyle.clintLocation}>
//               <MapPin size={13} color={'#192A53'} />
//               {customer.displayName}
//             </Text>
//           </View>
//         </View>

//         <Text>
//           5.0
//           <AntDesign name={'star'} size={15} color='gold' />
//         </Text>
//       </View>

//       {/* service requested */}
//       <View>
//         <Text style={MapStyle.requestHeading}>Service requested</Text>
//         {services.map((service, index) => (
//           <View key={index} style={LoginStyle.serviceItem}>
//             <Image source={barberImage} style={LoginStyle.ServiceImage} />
//             <View style={LoginStyle.Shadow}></View>
//             <View style={LoginStyle.ServiceDetails}>
//               <Text style={LoginStyle.Detailtext}>{service.name}</Text>
//             </View>
//           </View>
//         ))}

//         <Text style={MapStyle.requestHeading}>Time</Text>

//         <View style={MapStyle.TimeBox}>
//           <Text style={MapStyle.timeText}>
//             {time} {isChild ? 'for child' : ''}
//           </Text>
//         </View>

//         <View style={MapStyle.reqstbuttonsBox}>
//           {!isJobAccepted && (
//             <TouchableOpacity style={MapStyle.requestbtns} onPress={handleDismiss}>
//               <Text>
//                 <X color={'#fff'} size={24} />
//               </Text>
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             style={MapStyle.requestbtns}
//             onPress={() => {
//               //try smsto
//               Linking.openURL(`smsto:${customer.phoneNumber}`);
//             }}
//           >
//             <Text>
//               <MessageCircleMore color={'#fff'} size={24} />
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={MapStyle.requestbtns}
//             onPress={() => {
//               Linking.openURL(`tel:${customer.phoneNumber}`);
//             }}
//           >
//             <Text>
//               <Phone color={'#fff'} size={24} />
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View>
//         <Buttons
//           title={isJobAccepted ? 'End Job' : 'Accept Job'}
//           onClick={isJobAccepted ? handleEndJob : handleStartJob}
//         />
//       </View>
//     </View>
//   );
// };

// export default ClientInfo;
