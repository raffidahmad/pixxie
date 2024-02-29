import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { LatLng } from 'react-native-maps';

export const getBarberLiveLocation = async (barberID: string, setLocation: (location: any) => void) => {
  //this can be updated to getDoc with setInterval
  const docRef = doc(db, 'barbers', barberID);
  const unsubscribe = onSnapshot(docRef, (doc) => {
    console.log('Current data: ', doc.data());
    if (doc.data()?.currentLocation) {
      setLocation(doc.data()?.currentLocation);
    }
  });

  return unsubscribe;
};

export const createUserStripeID = async (userID: string, stripeID: string) => {
  try {
    await updateDoc(doc(db, 'users', userID), {
      stripe: {
        ID: stripeID
      }
    });
  } catch (e) {
    console.error('Error adding stripe ID to document:', e);
  }
};

export const updateUserHome = async (userID: string, phoneNumber: string, home: LatLng, locationName: string) => {
  try {
    await updateDoc(doc(db, 'users', userID), {
      phoneNumber,
      home,
      address: locationName
    });
  } catch (e) {
    console.error('Error updating document:', e);
  }
};
