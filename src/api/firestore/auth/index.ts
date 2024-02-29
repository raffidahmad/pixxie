import { collection, getDoc, setDoc, doc } from 'firebase/firestore';

import { db, createUserWithEmailAndPassword, signInWithEmailAndPassword, auth } from '@/config/firebase';
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';

export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  role: string,
  showError: (message: string) => void
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User account created & signed in!');

    // Use the UID as the document ID in the Firestore users collection
    const uid = userCredential.user.uid;
    const newUser = {
      id: uid,
      displayName,
      email,
      role
      // Add other initial fields as necessary
    };

    //await firestore().collection("users").doc(uid).set(newUser);
    const promise = await setDoc(doc(db, 'users', uid), newUser);

    // if successful, return the new user
    return newUser;
  } catch (error) {
    console.error('Error signing up:', error);
    showError('There was an error signing up. Please try again.');
  }
};

export const signInWithEmail = async (email: string, password: string, showError: (message: string) => void) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const userDetails = await getDoc(doc(db, 'users', userCredential.user.uid));
    const user = userDetails.data();
    console.log('User signed in!', user);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    showError('There was an error signing in. Please try again.');
  }
};

export const signInWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId: '695084823206-hnb3buc9vo6dur1b7ioai9kpo0rrvt0j.apps.googleusercontent.com'
    });
    await GoogleSignin.hasPlayServices();
    const userInfo: User = await GoogleSignin.signIn({});

    // Check if the user already exists in the database
    const userDetails = await getDoc(doc(db, 'users', userInfo.user.id));
    if (userDetails.exists()) {
      console.log('User signed in with Google!', userDetails.data());
      return userDetails.data();
    } else {
      // If the user doesn't exist, create a new user in the database
      const newUser = {
        id: userInfo.user.id,
        displayName: userInfo.user.name,
        email: userInfo.user.email,
        role: 'user'
      };

      await setDoc(doc(db, 'users', userInfo.user.id), newUser);
      console.log('Barber account created & signed in with Google!', newUser);
      return newUser;
    }
  } catch (error) {
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   console.log('User cancelled the Google sign in.');
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   console.log('Sign in is in progress.');
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   console.log('Play services are not available.');
    // } else {
    //   console.log('Something went wrong:', error);
    // }
    console.error('Error signing in with Google:', error);
  }
};

export const signOutFirebase = async () => {
  try {
    //firebase
    await auth.signOut();
    //google
    if(await GoogleSignin.isSignedIn()){
    await GoogleSignin.signOut();
    }
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

