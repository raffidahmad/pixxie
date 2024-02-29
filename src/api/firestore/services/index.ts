import { collection, getDocs } from 'firebase/firestore';
import { Service } from '@/types/Common.types';
import { db } from '@/config/firebase';

export const getServices = async () => {
  const querySnapshot = await getDocs(collection(db, 'services'));
  const fetchedServices: Service[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Service[];

  console.log('fetchedServices');
  return fetchedServices;
};
