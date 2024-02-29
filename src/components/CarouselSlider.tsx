import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import barberIcon from '@/assets/images/barber3.jpg';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

const CarouselSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const flatlistRef: any = useRef();
  const data = [
    {
      title: '40% OFF',
      heading: 'Black Friday deals',
      text: 'Get a discount for every order! only valid for today!',
      image: barberIcon,
      id: 1
    },
    {
      title: '40% OFF',
      heading: 'Black Friday deals',
      text: 'Get a discount for every order! only valid for today!',
      image: barberIcon,
      id: 2
    },
    {
      title: '40% OFF',
      heading: 'Black Friday deals',
      text: 'Get a discount for every order! only valid for today!',
      image: barberIcon,
      id: 3
    }
  ];
  const renderItem = ({ item, Index }: any) => {
    const imageWidth = screenWidth - 40; // Adjusted width to account for the padding
    const imageHeight = 114;
    return (
      <View
        style={{
          position: 'relative',
          width: imageWidth,
          height: imageHeight,
          marginVertical: 5
        }}
      >
        <Image source={item.image} style={{ width: '100%', height: imageHeight, borderRadius: 16 }} />
        <View
          style={{
            flexDirection: 'column',
            width: 200,
            position: 'absolute',
            justifyContent: 'center',
            right: 0,
            paddingHorizontal: 10,
            top: 10,
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              flex: 1,
              color: "#fff",
              lineHeight: 25,
              fontFamily: "UrbanistBold",
            }}
          >
            {item.title}
          </Text> */}

          {/* <Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "700",
              fontFamily: "UrbanistSemiBold",
              marginVertical: 5,
            }}
          >
            {item.heading}
          </Text> */}
          {/* <Text
            style={{
              color: "#ffff",
              fontWeight: "400",
              fontSize: 10,
              fontFamily: "UrbanistRegular",
            }}
          >
            {item.text}
          </Text> */}
          {/* <Image source={item.Image2} style={{ width: 170, height: 128 }} /> */}
        </View>
      </View>
    );
  };

  const renderDotindicator = () => {
    return data.map((dot: any, index: any) => {
      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#FFFFFF',
              opacity: 0.8,
              height: 0,
              width: 0,
              borderRadius: 5,
              marginHorizontal: 5
            }}
          ></View>
        );
      }
      return (
        <View
          key={index}
          style={{
            backgroundColor: '#FFFFFF',
            opacity: 0.4,
            height: 0,
            width: 0,
            borderRadius: 5,
            marginHorizontal: 5
          }}
        ></View>
      );
    });
  };
  const handelScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;

    const index = Math.ceil(scrollPosition / screenWidth);

    setActiveIndex(index);
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        position: 'relative',
        marginVertical: 10
      }}
    >
      <GestureHandlerRootView>
        <FlatList
          ref={flatlistRef}
          keyExtractor={(item: any) => item.id}
          data={data}
          renderItem={renderItem}
          horizontal
          pagingEnabled={true}
          onScroll={handelScroll}
          showsHorizontalScrollIndicator={false}
          // getItemLayout={getItemLayout}
        />
      </GestureHandlerRootView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          bottom: '10%',
          left: '50%',
          right: '50%',
          position: 'absolute'
        }}
      >
        {renderDotindicator()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // paddingHorizontal: 24,
  }
});

export default CarouselSlider;
