import { query, orderBy, limit, collection, getDocs } from 'firebase/firestore';

import { Barber } from '@/types/Common.types';
import { db } from '@/config/firebase';
import { haversineDistance } from '@/utils/Common.utils';

export const getTopBarbers = async () => {
  const q = query(collection(db, 'barbers'), orderBy('rating', 'desc'), limit(5));
  const querySnapshot = await getDocs(q);

  const fetchedTopBarbers: Barber[] = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        distance: 12
      }) as Barber
  ); // Cast the data to the Barber type

  console.log('fetched top');
  return fetchedTopBarbers;
  //console.log('fetched top', fetchedTopBarbers);
};

export const getBarbersNearYou = async () => {
  const querySnapshot = await getDocs(collection(db, 'barbers'));
  const allBarbers: Barber[] = querySnapshot.docs.map((doc) => {
    const barberData = doc.data() as Barber; // Ensure the data matches the Barber type
    return {
      ...barberData,
      id: doc.id
    };
  });

  const barbersWithin100km = allBarbers.filter((barber) => {
    if (!barber.currentLocation && !barber.pushToken) return;
    const distance = haversineDistance(
      { latitude: barber.currentLocation.latitude + 0.003, longitude: barber.currentLocation.longitude + 0.005 },
      {
        latitude: barber.currentLocation.latitude,
        longitude: barber.currentLocation.longitude
      }
    );

    return distance <= 100;
  });

  //console.log('barbers near you', barbersWithin100km);
  console.log('barbers near you');

  return barbersWithin100km;
};

export const getBarbers = async () => {
  const querySnapshot = await getDocs(collection(db, 'barbers'));
  const allBarbers: Barber[] = querySnapshot.docs.map((doc) => {
    const barberData = doc.data() as Barber; // Ensure the data matches the Barber type
    return {
      ...barberData,
      id: doc.id
    };
  });

  console.log('all barbers');

  return allBarbers;
};
