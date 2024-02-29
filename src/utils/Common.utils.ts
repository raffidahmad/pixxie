import { LatLng } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

/**
 * Calculates the Haversine distance between two points on the Earth.
 * @param {LatLng} coords1 The latitude and longitude of the first point.
 * @param {LatLng} coords2 The latitude and longitude of the second point.
 * @param {boolean} isMiles Whether to return the distance in miles (true) or kilometers (false).
 * @returns {number} The distance between the two points in kilometers or miles.
 */

export const haversineDistance = (coords1: LatLng, coords2: LatLng, isMiles: boolean = false): number => {
  const toRad = (x: number): number => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return isMiles ? distance * 0.621371 : distance;
};

export const selectImage = async ({ setImage }) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    console.log('Permission to access camera roll is required!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  } else {
    console.log('Image selection canceled or failed.');
  }
};
