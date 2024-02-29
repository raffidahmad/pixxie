import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getStorage, getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// import {...} from "firebase/database";
// import {...} from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDsyCKlZRqvWAxwye_QecYh8jVRCmgH57s',
  authDomain: 'pixxie-barber-app.firebaseapp.com',
  projectId: 'pixxie-barber-app',
  storageBucket: 'pixxie-barber-app.appspot.com',
  messagingSenderId: '695084823206',
  appId: '1:695084823206:web:9f136ac55035c2bf807a67'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(app);

export { signInWithEmailAndPassword, createUserWithEmailAndPassword };
export { getDownloadURL, uploadBytes, ref };

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
