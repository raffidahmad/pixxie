import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from '@motify/components';
import { Image } from 'react-native';
import tw from 'twrnc';

const _color = '#192A53';
const _size = 100;

const Ripple = ({ image }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View style={[styles.dot, styles.center]}>
        {[...Array(10).keys()].map((index) => {
          return (
            <MotiView
              from={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 4 }}
              transition={{
                type: 'timing',
                duration: 2000,
                delay: index * 200,
                loop: true,
                repeatReverse: false
              }}
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Image style={tw`h-14 w-14 rounded-full`} source={image} />
        {/* </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color
  },
  center: { alignItems: 'center', justifyContent: 'center' }
});

export default Ripple;
