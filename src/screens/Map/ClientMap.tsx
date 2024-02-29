import { View, StatusBar, Text, Image, StyleSheet } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useMemo, useCallback, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import barberImge from '@/assets/images/barber2.jpg';
import { useSession } from '@/context/ctx';

import tw from 'twrnc';
import { router } from 'expo-router';
import { Barber } from '@/types/Common.types';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import BarberInfo from '@/components/BarberInfo';
import Ripple from '@/components/Ripple';
import { getBarberLiveLocation } from '@/api/firestore/common';

import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { getBarbersNearYou } from '@/api/firestore/barbers';
import { sendJobRequestNotification } from '@/api/backend/push-notifications';
import { useRecoilValue } from 'recoil';
import { expoNotification } from '@/recoil/atoms';
import * as Notifications from 'expo-notifications';
import { Subscription, Notification, NotificationResponse } from 'expo-notifications';

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const BarberMap = () => {
  const { session } = useSession();
  const initialRegion = {
    latitude: session?.home?.latitude || 37.78825, // London's latitude
    longitude: session?.home?.longitude || -122.4324, // London's longitude
    latitudeDelta: 0.0955,
    longitudeDelta: 0.0421
  };
  const [myLocation, setMyLocation] = useState<Location>(initialRegion);
  const mapRef = useRef<MapView>(null);
  const [barbersNearYou, setBarbersNearYou] = useState<Barber[]>([]);
  const [barbersIndexCur, setBarbersIndexCur] = useState<number>(0);
  const [barbersIndexMax, setBarbersIndexMax] = useState<number>(0);
  const [isJobAccepted, setJobAccepted] = useState(false);
  // const jobRequest = useRecoilValue(jobRequestAtom);
  const [barberLocation, setBarberLocation] = useState<Location | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isJobStarted, setJobStarted] = useState(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [barberInitLocation, setBarberInitLocation] = useState<Location>();

  const handleBarberInitLocation = () => {
    if (barbersNearYou[barbersIndexCur].currentLocation)
      setBarberInitLocation({
        latitude: barbersNearYou[barbersIndexCur].currentLocation.latitude,
        longitude: barbersNearYou[barbersIndexCur].currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      });
  };

  const handleNextBarber = () => {
    if (barbersIndexCur < barbersNearYou.length - 1) {
      setBarbersIndexCur((prevIndex) => prevIndex + 1);
      handleBarberInitLocation();
    } else {
      handleDismissSearch();
    }
  };

  const handleDismissSearch = () => {
    bottomSheetModalRef.current?.dismiss();
    router.replace('/');
  };

  const [notification, setNotification] = useState<Notification>({ request: { content: {} } } as Notification);
  useEffect(() => {
    

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response: NotificationResponse) => {
        setNotification(response.notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleJobAcception = (jobID) => {
    if (jobID != null) {
      setJobAccepted(true);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Barber accepted',
        textBody: 'Barber has accepted your request'
      });
    }
  };

  useEffect(() => {
    //console.log('notification', notification.request.content.data)
    if (notification?.request?.content?.data?.jobID) {
      //console.log('notification?.request?.content?.data?.jobID', notification?.request?.content?.data?.jobID);
      handleJobAcception(notification?.request?.content?.data?.jobID);
    } else if (notification?.request?.content?.data?.declined) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Barber declined',
        textBody: 'Barber has declined your request'
      });
      handleNextBarber();
    }
  }, [notification]);

  useEffect(() => {
    Promise.all([getBarbersNearYou()])
      .then(([barbersNearYouData]) => {
        setBarbersNearYou(barbersNearYouData);
        //setBarbersIndexMax(barbersNearYouData.length);
        handlePresentModalPress();
      })
      .catch((error) => {
        // Handle errors if any of the API calls fail
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Error getting barbers. Please try again later.'
        });
      });
  }, []);

  const sendRequestToBarber = (barber: Barber) => {
    sendJobRequestNotification(barber.pushToken!!, session!!.id);
  };

  useEffect(() => {
    if (!session) return;
    if (!isJobAccepted) return;
    getBarberLiveLocation(barbersNearYou[barbersIndexCur].id, (location) => {
      if (location) {
        setBarberLocation({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        });
      }
    }).then((unsubscribe) => {
      if (unsubscribe) {
        if (isJobStarted) {
          console.log('unsubscribe for live location called');
          unsubscribe();
        }
      }
    });
  }, [isJobAccepted, isJobStarted]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (!session) return;
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Permission to access location was denied'
          });
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});

        setMyLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        });
      } catch (e) {
        console.error(e);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Error getting location. Please try again later.'
        });
      }
    };

    requestLocationPermission();
  }, [isJobAccepted]);

  return (
    <GestureHandlerRootView style={tw`w-full flex-1`}>
      <BottomSheetModalProvider>
        <View style={tw`flex-1`}>
          <StatusBar backgroundColor='transparent' translucent />

          <MapView region={myLocation} provider={PROVIDER_GOOGLE} style={styles.mapContainer} ref={mapRef}>
            {/* Self location */}

            <Marker
              coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }}
              title='You are here'
            >
              <View style={tw`m-0 rounded-full border-4 border-primary p-0`}>
                <Image style={tw`h-7 w-7 rounded-full`} source={barberImge} />
              </View>
            </Marker>

            {isJobAccepted && barberLocation && barbersNearYou[barbersIndexCur] && (
              <View>
                <Marker
                  coordinate={{
                    latitude: barberLocation.latitude,
                    longitude: barberLocation.longitude
                  }}
                  title={barbersNearYou[barbersIndexCur].displayName}
                >
                  <View style={tw`m-0 rounded-full border-4 border-primary p-0`}>
                    <Image style={tw`h-7 w-7 rounded-full`} source={barberImge} />
                  </View>
                </Marker>

                <MapViewDirections
                  origin={barberInitLocation}
                  destination={session?.home}
                  apikey={''}
                />
              </View>
            )}
          </MapView>

          {/* {!isJobAccepted && <Ripple image={barberImge} />} */}

          <BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
            <BottomSheetScrollView style={tw``}>
              {barbersNearYou.length > 0 && (
                <BarberInfo
                  isJobAccepted={isJobAccepted}
                  barber={barbersNearYou[barbersIndexCur]}
                  handleNextBarber={handleNextBarber}
                  handleDismissSearch={handleDismissSearch}
                  sendRequestToBarber={sendRequestToBarber}
                />
              )}
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject
  }
  // position: 'absolute',
  // alignSelf: 'center',
});

export default BarberMap;
