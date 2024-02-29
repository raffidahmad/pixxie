import { Text, View } from 'react-native';
import { GlobalStyle } from '@/styles';
import Buttons from '@/components/Buttons';
import { Clock2 } from 'lucide-react-native';
import { router } from 'expo-router';

const ServiceStart = () => {
  const navigate = () => {
    //router.replace('/service-completed');
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={GlobalStyle.containers}>
        <View style={GlobalStyle.main}>
          <View style={GlobalStyle.blue}>
            <Text>
              <Clock2 color={'#FFFFFF'} size={32} />
            </Text>
          </View>
          <Text style={GlobalStyle.great}>Service started</Text>
          <Text style={GlobalStyle.confirm}>
            Once the client confirms that the service is done, we will process the payment.
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <Buttons title={'Continue'} onClick={navigate} />
      </View>
    </View>
  );
};

export default ServiceStart;
