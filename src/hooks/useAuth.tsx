import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { authenticator } from '@/config/firebase-web';
import { User } from '@/types/Common.types';

export default function useAuth() {
    const [hookUser, setHookUser] = useState(null);

    useEffect(()=>{
        const unsub = onAuthStateChanged(authenticator, user=>{
            console.log('got user: ', user);
            if(user){
                setHookUser(user);
            }else{
                setHookUser(null);
            }
        });
        return unsub;
    },[])

  return { hookUser }
}