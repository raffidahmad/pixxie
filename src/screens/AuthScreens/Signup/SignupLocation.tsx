import { Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { Phone } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Region, LatLng } from 'react-native-maps';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import { LoginStyle } from '@/styles';
import FormInput from '@/components/FormInput';
import { useSession } from '@/context/ctx';
import { router } from 'expo-router';
import Buttons from '@/components/Buttons';
import { updateUserHome } from '@/api/firestore/common';

type FormData = {
  phone: string;
  location: string;
};

const formSchema = z.object({
  phone: z.string().refine((value) => /^\d{8,}$/.test(value), {
    message: 'Phone must be a minimum of 8 digits'
  }),
  // location: z.string().min(5, "location should be valid"),
  location: z.string().optional()
});

const SignupLocation = () => {
  const { session } = useSession();
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [markerPosition, setMarkerPosition] = useState<LatLng | undefined>(undefined);
  const [locationName, setLocationName] = useState<string>('');

  const { control: controlFinish, handleSubmit: handleSubmitFinish } = useForm({
    defaultValues: {
      phone: '',
      location: ''
    },
    resolver: zodResolver(formSchema)
  });

  const onLocationSelect = (data: any, details: any) => {
    if (details && details.geometry && details.geometry.location) {
      const location = details.geometry.location;
      const newRegion: Region = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      };
      setMapRegion(newRegion);
      setMarkerPosition({ latitude: location.lat, longitude: location.lng });
      setLocationName(details.name);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!data.phone) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Phone number is required'
      });
      return;
    }
    if (!markerPosition) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please select your location'
      });
      return;
    }
    try {
      updateUserHome(session!!.id, data.phone, markerPosition, locationName).then(() => {
        router.push('/');
      });
    } catch (e) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'There was an error getting location info.'
      });
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={LoginStyle.Welcome} keyboardShouldPersistTaps='handled'>
        <FormInput
          control={controlFinish}
          name='phone'
          placeholder='(452-654-652)'
          iconComponent={<Phone color={'#212121'} size={16} />}
          // other props...
        />

        <View style={{ marginVertical: 20 }}>
          <Text style={LoginStyle.headText}>Select your home address</Text>
          <Text style={LoginStyle.Subtext}>That way your barber will know exactly where to come</Text>
        </View>

        <GooglePlacesAutocomplete
          placeholder='Your location'
          debounce={400}
          fetchDetails={true}
          enablePoweredByContainer={false}
          // onPress={(data, details = null) => {
          //   toast.show("Hi");
          //   // 'details' is provided when fetchDetails = true
          //   console.log(data, details);
          // }}
          onPress={onLocationSelect}
          query={{
            key: 'AIzaSyDyBQnBwF9CkDGalCi2ZHNv7YQKHvAEH9M',
            language: 'en'
          }}
        />

        <View style={{ borderRadius: 14, overflow: 'hidden' }}>
          <MapView
            style={{ width: '100%', height: 250 }}
            provider={PROVIDER_GOOGLE}
            region={mapRegion} // mapRegion can now be undefined, which is acceptable
            onRegionChangeComplete={(region: Region) =>
              setMarkerPosition({
                latitude: region.latitude,
                longitude: region.longitude
              })
            }
          >
            {markerPosition && (
              <Marker
                coordinate={markerPosition}
                draggable
                onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
              />
            )}
          </MapView>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 24 }}>
        <Buttons title={'Next'} onClick={handleSubmitFinish(onSubmit)} />
      </View>
    </View>
  );
};

export default SignupLocation;
