// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsyCKlZRqvWAxwye_QecYh8jVRCmgH57s",
  authDomain: "pixxie-barber-app.firebaseapp.com",
  projectId: "pixxie-barber-app",
  storageBucket: "pixxie-barber-app.appspot.com",
  messagingSenderId: "695084823206",
  appId: "1:695084823206:web:9f136ac55035c2bf807a67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenticator = getAuth(app);
export const db = getFirestore(app);
