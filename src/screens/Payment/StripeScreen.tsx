import { fetchPaymentSheetParams } from '@/api/backend/stripe';
import { createUserStripeID } from '@/api/firestore/common';
import Buttons from '@/components/Buttons';
import { useSession } from '@/context/ctx';
import { isLoading } from '@/recoil/atoms';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useRecoilState } from 'recoil';

const StripeScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useRecoilState(isLoading);
  const { session } = useSession();

  const initializePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams({ session });

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Pixxe Barber',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent
    });
    if (!error) {
      setLoading(true);

      await createUserStripeID(session.id, customer);

      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(`Error code payment sheet: ${error.code}`, error.message);
    } else {
      console.log('Success', 'Your payment method is successfully set up for future payments!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <View style={{ paddingHorizontal: 24 }}>
        <Buttons disabled={loading} title={'Add New'} onClick={openPaymentSheet} />
      </View>
    </View>
  );
};

export default StripeScreen;
