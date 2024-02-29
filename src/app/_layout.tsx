import { Slot } from 'expo-router';
import { SessionProvider } from '@/context/ctx';
import { RecoilRoot } from 'recoil';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { StripeProvider } from '@stripe/stripe-react-native';
import OverlayLoader from '@/components/OverlayLoader';

const Root = () => (
  <RecoilRoot>
    <SessionProvider>
      <AlertNotificationRoot>
        <StripeProvider publishableKey={'pk_test_51OoTHIBeJqGtaUET5eCfisrhJfo9SoIr1J32c4PizkPtM5x4Hm2jg4cFB0XADPSmuAp0EZWSY7firlphWO8XLMM500rZdIstns'}>
          <OverlayLoader />
          <Slot />
        </StripeProvider>
      </AlertNotificationRoot>
    </SessionProvider>
  </RecoilRoot>
);

export default Root;
