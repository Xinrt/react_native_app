/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type {Node} from 'react';
import {useEffect} from 'react';

import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Image, Text} from 'react-native-elements';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Synthesizer, SpeechConstant} from 'react-native-speech-iflytek';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {flex: 1},
  image1: {
    width: 51 / 1.5,
    height: 52 / 1.5,
    marginTop: 20,
  },
  mainImage: {
    resizeMode: 'contain',
    height: '100%',
    aspectRatio: 721 / 1000,
    // transform: [{scale: 0.8}],
  },
  mainImageFlex: {
    flex: 4.8,
  },
  title: {flex: 2},
  bigTitle: {flex: 6},
  inlineBlack: {
    fontSize: 72 / 3,
    opacity: 0.87,
    color: '#000000',
    fontFamily: 'SourceHanSansSc Regular',
  },
  inlineWhite: {
    fontSize: 56 / 3,
    color: '#FEFEFE',
    fontFamily: 'SourceHanSansSc Regular',
  },
  inlinePosition: {
    position: 'absolute',
    zIndex: 99,
    top: 55,
    left: 40,
  },
  radiusBox: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radius: {
    backgroundColor: '#CBA3D8',
    width: 180,
    height: 180,
    borderRadius: 500,
    marginTop: 20,
    marginLeft: 20,
  },
});

const Start: () => Node = ({navigation}) => {
  const handleSwipeUp = () => {
    navigation.navigate('Transition');
  };
  useEffect(() => {
    const AppId = '4ce5a360';
    Synthesizer.init(AppId);
    Synthesizer.start('欢迎开启您的肌肤之旅');
  }, []);
  return (
    <GestureRecognizer style={styles.box} onSwipeUp={handleSwipeUp}>
      <View style={styles.inlinePosition}>
        <Text
          style={[
            styles.inlineBlack,
            {
              marginBottom: 16,
            },
          ]}>
          您好，
        </Text>
        <Text
          style={[
            styles.inlineBlack,
            {
              marginBottom: 5,
            },
          ]}>
          开启肌肤的健康旅程
        </Text>
        <Text style={styles.inlineWhite}>上划开始检测</Text>
      </View>
      <View style={styles.radiusBox}>
        <View style={styles.radius} />
        <View style={styles.title} />
      </View>

      <View style={styles.header}>
        <Image
          source={{uri: 'https://z3.ax1x.com/2021/09/23/409flF.png'}}
          style={styles.image1}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{opacity: 0}}
        />
      </View>

      <View style={styles.mainImageFlex}>
        <Image
          source={{uri: 'https://z3.ax1x.com/2021/09/23/40P9u4.png'}}
          style={styles.mainImage}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{opacity: 0}}
        />
      </View>
    </GestureRecognizer>
  );
};

export default Start;
