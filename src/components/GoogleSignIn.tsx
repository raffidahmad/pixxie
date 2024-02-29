import { Image, Text, TouchableOpacity } from 'react-native';
import googleImage from '@/assets/images/google.png';
import { LoginStyle } from '@/styles';
import { signInWithGoogle } from '@/api/firestore/auth';
import { User } from '@/types/Common.types';

const GoogleSignIn = ({ signIn }: { signIn: (user: User) => void }) => {
  const handleSignIn = () => {
    signInWithGoogle()
      .then((user) => {
        signIn(user as User);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  };

  return (
    <TouchableOpacity style={LoginStyle.google} onPress={handleSignIn}>
      <Image source={googleImage} style={{ width: 20, height: 20, marginRight: 10 }} />
      <Text style={LoginStyle.googleText}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleSignIn;
