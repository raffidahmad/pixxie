import { useEffect, useState } from 'react';
import { Text, View, StatusBar, ScrollView, Image } from 'react-native';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Check, X, Bell, MapPin, LogOut } from 'lucide-react-native';

import Buttons from '@/components/Buttons';
import SearchBox from '@/components/SearchBox';
import CarouselSlider from '@/components/CarouselSlider';
import Flatlists from '@/components/FlatLists';

import { GlobalStyle, HomeStyle, LoginStyle } from '@/styles';
import profileIcon from '@/assets/images/profile.png';
import barberIcon from '@/assets/images/barber1.jpg';
import { Barber, Service } from '@/types/Common.types';

import { getServices } from '@/api/firestore/services';
import { getBarbersNearYou, getTopBarbers } from '@/api/firestore/barbers';
import tw from 'twrnc';
import { router } from 'expo-router';
import { useSession } from '@/context/ctx';
import { useRecoilState } from 'recoil';
import { isLoading, jobRequestAtom } from '@/recoil/atoms';
import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

const Home = () => {
  const { session, signOut } = useSession();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchString, setSearchString] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [jobRequest, setJobRequest] = useRecoilState(jobRequestAtom);
  const [, setIsLoaderActive] = useRecoilState(isLoading);

  const [barbersNearYou, setBarbersNearYou] = useState<Barber[]>([]);

  useEffect(() => {
    setIsLoaderActive(true);

    Promise.all([getServices(), getTopBarbers(), getBarbersNearYou()])
      .then(([servicesData, topBarbersData, barbersNearYouData]) => {
        setServices(servicesData);
        //setTopBarbers(topBarbersData);
        setBarbersNearYou(barbersNearYouData);
        setIsLoaderActive(false); // Set loader to false when all API calls are completed
      })
      .catch((error) => {
        // Handle errors if any of the API calls fail
        console.error('Error fetching data:', error);
        setIsLoaderActive(false); // Ensure loader is set to false even if there's an error
      });
  }, []);

  const toggleServiceSelection = (service: Service) => {
    setJobRequest((prevJobRequest) => {
      const newSelectedServices = new Set(prevJobRequest.services);
      if (newSelectedServices.has(service)) {
        newSelectedServices.delete(service);

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Service removed',
          textBody: 'Service has been removed successfully'
        });
      } else {
        newSelectedServices.add(service);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Service selected',
          textBody: 'Service has been selected successfully'
        });
      }
      return {
        ...prevJobRequest,
        services: Array.from(newSelectedServices)
      };
    });
  };

  const handleServiceSelection = async (service: Service) => {
    setJobRequest((prevJobRequest) => ({
      ...prevJobRequest,
      services: [service]
    }));

    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Service selected',
      textBody: 'Service has been selected successfully'
    });
    router.push('/schedule');
  };

  const renderServices = () =>
    services
      .filter((service) => searchString === '' || service.name.toLowerCase().includes(searchString.toLowerCase()))
      .map((service) => (
        <TouchableOpacity onPress={() => handleServiceSelection(service)} style={tw`w-80`} key={service.id}>
          <View style={LoginStyle.serviceItem}>
            <Image
              source={
                jobRequest.services.includes(service)
                  ? { uri: service.imageURL }
                  : barberIcon
              }
              style={LoginStyle.ServiceImage}
            />
            <View style={LoginStyle.Shadow}></View>
            <View style={LoginStyle.ServiceDetails}>
              <Text style={LoginStyle.Detailtext}>{service.name}</Text>
              <TouchableOpacity style={LoginStyle.deleteBtn} onPress={() => toggleServiceSelection(service)}>
                {jobRequest.services.includes(service) ? (
                  <X size={14} color='red' />
                ) : (
                  <Check size={14} color='green' />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ));
  //signOut()
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor='#ffff' />
      <ScrollView style={tw`mt-10`}>
        <GestureHandlerRootView>
          <View style={GlobalStyle.containers}>
            <View style={HomeStyle.homeHeader}>
              <View style={HomeStyle.profilebox}>
                <Image source={profileIcon} style={{ height: 35, width: 35, borderRadius: 35 }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={HomeStyle.profileText}>Location</Text>
                  <Text style={HomeStyle.Location}>
                    <MapPin color={'#192A53'} size={13} />
                    {session?.address}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-center gap-2`}>
                <TouchableOpacity onPress={signOut} style={tw`rounded-full bg-red-500 p-2`}>
                  <LogOut size={20} color={'#fff'} />
                </TouchableOpacity>

                <Text>
                  <Bell color={'#212121'} size={20} />
                </Text>
              </View>
            </View>
            <View style={HomeStyle.welBox}>
              <Text style={HomeStyle.Welcomes}>Welcome, {session?.displayName}</Text>
              <Text style={HomeStyle.service}>What service would you like to get?</Text>
            </View>

            <SearchBox
              onChangeText={(text) => setSearchString(text)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={searchString}
            />
          </View>
          <View style={tw`items-center`}>{services.length > 0 && isSearchFocused && renderServices()}</View>
          <CarouselSlider />
          <View>
            <Flatlists title={'Barbers near you'} data={barbersNearYou} key={'Braber near You'} />
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <Buttons title={'See more barbers'} onClick={() => setIsSearchFocused(true)} />
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </View>
  );
};

export default Home;
