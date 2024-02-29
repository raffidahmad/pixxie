import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Item from './Item';
import { Link } from 'expo-router';

function Flatlists({ data, title }: any) {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          alignItems: 'center',
          marginVertical: 15
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'UrbanistSemiBold',
            fontWeight: '700',
            color: '#212121'
          }}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Link
            //TBD
            href='/service-selection'
            style={{
              color: '#192A53',
              fontFamily: 'UrbanistSemiBold',
              fontSize: 14,
              fontWeight: '600'
            }}
          >
            See more
          </Link>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => <Item itemData={item} />}
      />
    </View>
  );
}

export default Flatlists;
