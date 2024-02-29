import { atom, RecoilState } from 'recoil';
import { Notification } from 'expo-notifications';
import { JobRequest } from '@/types/Common.types';

export const isLoading = atom({
  key: 'isLoading',
  default: false
});

export const expoNotification: RecoilState<Notification> = atom({
  key: 'expoNotification',
  default: {} as Notification
});

export const jobRequestAtom: RecoilState<JobRequest> = atom({
  key: 'jobRequest',
  default: {
    date: new Date().toISOString().split('T')[0],
    time: Date.now().toString(),
    customer: {
      id: '',
      displayName: '',
      email: '',
      address: ''
    },
    services: [],
    isBookingForChild: false,
    noOfChildren: 0,
    barbers: [],
    accepted: false,
  } as JobRequest
});