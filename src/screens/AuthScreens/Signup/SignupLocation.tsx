import { Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { Phone } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from 'react-native-toast-notifications';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Region, LatLng } from 'react-native-maps';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { LoginStyle } from '@/styles';
import FormInput from '@/components/FormInput';

const formSchema = z.object({
  phone: z.string().refine((value) => /^\d{8,}$/.test(value), {
    message: 'Phone must be a minimum of 8 digits'
  }),

  // location: z.string().min(5, "location should be valid"),
  location: z.string().optional()
});

const SignupLocation = () => {
  const [mapRegion, setMapRegion] = useState<Region | undefined>(undefined);
  const [markerPosition, setMarkerPosition] = useState<LatLng | undefined>(undefined);
  const toast = useToast();

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
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      };
      setMapRegion(newRegion);
      setMarkerPosition({ latitude: location.lat, longitude: location.lng });
      toast.show('Location selected');
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

        
        {/* 
          <FormInput
            control={control2}
            name="location"
            placeholder="Your location"
            iconComponent={<MapPin color={"#212121"} size={16} />}
            // other props...
          /> */}

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
    </View>
  );
};

export default SignupLocation;
