import { CardStyle } from '@/styles';
import masterCardImage from '@/assets/images/card.png';
import { Image, Text, View } from 'react-native';

const PaymentMethod = ({
  last4,
  cardType //master card / visa etc
}) => (
  <View style={CardStyle.cardBox}>
    <View style={CardStyle.paymentBox}>
      <Image source={masterCardImage} style={CardStyle.cardImg} />
      <Text style={CardStyle.cardText}>... ... .... .... {last4}</Text>
    </View>
    <Text style={CardStyle.connect}>connected</Text>
  </View>
);

export default PaymentMethod;
