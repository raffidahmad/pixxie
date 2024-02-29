import { View, Text, Image } from 'react-native';
import { MapPin } from 'lucide-react-native';
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AntDesign } from '@expo/vector-icons';
import { Barber } from '@/types/Common.types';

// import { faStar } from "@fortawesome/free-solid-svg-icons";
function Item({ itemData }: { itemData: Barber }) {
  return (
    <View style={{ width: 156, marginHorizontal: 10, paddingHorizontal: 12 }}>
      <Image source={{ uri: itemData.businessImageURL }} style={{ width: 155.5, height: 147, borderRadius: 15.25 }} />
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'UrbanistBold',
            color: '#212121',
            fontWeight: '600'
          }}
        >
          {itemData.businessName}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              marginRight: 5,
              color: '#616161',
              fontSize: 12,
              fontWeight: '500',
              fontFamily: 'UrbanistRegular'
            }}
          >
            <MapPin size={'12px'} color={'#192A53'} /> {itemData.distance ? `${itemData.distance} km` : 'N/A'}
          </Text>
          <Text
            style={{
              color: '#616161',
              fontSize: 12,
              fontWeight: '500',
              fontFamily: 'UrbanistRegular'
            }}
          >
            |
          </Text>
          <Text
            style={{
              marginLeft: 5,
              color: '#616161',
              fontSize: 12,
              fontWeight: '500',
              fontFamily: 'UrbanistRegular'
            }}
          >
            <AntDesign name={'star'} size={10} color='gold' />
            {itemData.rating || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Item;
