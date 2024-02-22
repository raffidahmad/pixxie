import { DocumentData } from 'firebase/firestore';
import { LatLng } from 'react-native-maps';

export type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  home?: LatLng;
};

export type Job = {
  id: string;
  customer?: string;
  barber?: string;
  price?: number;
  paid?: boolean;
  startTime?: string;
  endTime?: string;
  service?: string;
};

export type Barber = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  businessName?: string;
  businessImageURL?: string;
  logoImageURL?: string;
  nationalIdURL?: string;
  certificationsURL?: string;
  bank?: string;
  branch?: string;
  accountNumber?: string;
  nationalInsuranceNumber?: string;
  services?: DocumentData;
  currentLocation?: LatLng;
  distance?: number;
  rating?: number;
};

export type Service = {
  id: string;
  imageURL: string;
  price: number;
  name: string;
};
