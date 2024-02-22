// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/firestore";
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
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const db = firebase.firestore();
export const auth = firebase.auth();
