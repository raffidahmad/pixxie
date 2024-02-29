import Home from '@/screens/Home';
import { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/utils/Notification.utils';
import { addPushTokenToFirestore } from '@/api/firestore/notifications';
import { useSession } from '@/context/ctx';
import { Subscription, Notification, NotificationResponse } from 'expo-notifications';
import { useRecoilState } from 'recoil';
import { expoNotification } from '@/recoil/atoms';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

const Index = () => {
  const { session, signIn } = useSession();

  const [notification, setNotification] = useRecoilState<Notification>(expoNotification);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      addPushTokenToFirestore(token!!, session?.id!).then((userData) => {
        signIn(userData);
      });
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response: NotificationResponse) => {
        setNotification(response.notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log('notification', session);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Home />
    </View>
  );
};

export default Index;
