import React from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { User } from '@/types/Common.types';
import { signOutFirebase } from '@/api/firestore/auth';

const AuthContext = React.createContext<{
  signIn: (barber: User) => void;
  signOut: () => void;
  session: User | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: User) => {
          // Perform sign-in logic here
          const stringifiedUser = JSON.stringify(user);
          setSession(stringifiedUser);
        },
        signOut: () => {
          signOutFirebase();
          setSession(null);
        },
        session: session ? JSON.parse(session) : null,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
