import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const addPushTokenToFirestore = async (token: string, userID: string) => {
  const promise = await updateDoc(doc(db, 'users', userID), {
    pushToken: token
  });

  const updatedDetails = await getDoc(doc(db, 'users', userID));

  return updatedDetails.data();
}