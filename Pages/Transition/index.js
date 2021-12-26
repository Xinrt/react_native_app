import React from 'react';
import type {Node} from 'react';

import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Image, Text} from 'react-native-elements';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eff2f3',
  },
  header: {flex: 1},
  title: {flex: 2},
  image: {flex: 5},
  image1: {
    width: 280,
    height: 280,
  },
  textBox: {
    alignItems: 'center',
    flex: 1,
  },
  mainText: {
    opacity: 0.87,
    fontSize: 48 / 2.5,
    fontWeight: 'bold',
  },
  subText: {
    opacity: 0.54,
    fontSize: 44 / 2.5,
  },
  backButtonBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
  },
  backButton: {
    width: 51 / 2,
    height: 30 / 2,
    marginTop: 8,
    marginLeft: 20,
  },
});

const Transition: () => Node = ({navigation}) => {
  const handleTouch = () => {
    navigation.navigate('Face');
  };
  return (
    <TouchableOpacity style={styles.box} onPress={handleTouch}>
      <View style={styles.backButtonBox}>
        <Image //返回按钮
          source={{uri: 'https://z3.ax1x.com/2021/10/09/5irhee.png'}}
          style={styles.backButton}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{opacity: 0}}
          onPress={() => navigation.navigate('Start')}
        />
        <View style={styles.title} />
      </View>
      <View style={styles.image}>
        <Image
          source={{uri: 'https://z3.ax1x.com/2021/10/09/5irOOS.png'}}
          style={styles.image1}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{opacity: 0}}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.mainText}>将检测仪前端摄像头平行贴于面部</Text>
        <Text style={styles.mainText}>皮肤，力度适中，不用过度接触</Text>
      </View>
      <View style={styles.title}>
        <Text style={styles.subText}>点击页面任意位置进入正式检测</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Transition;
