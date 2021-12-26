import React from 'react';
import type {Node} from 'react';

import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Image, Button} from 'react-native-elements';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {flex: 1},
  title: {flex: 2},
  image: {
    width: 465 / 3,
    height: 389 / 3,
  },
  button: {
    backgroundColor: '#CBA3D8',
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: 600 / 3,
    height: 140 / 3,
  },
  buttonContainer: {
    margin: 10,
    color: '#fff',
  },
});

const Index: () => Node = ({navigation}) => {
  return (
    <View style={styles.box}>
      <View style={styles.header} />
      <View style={styles.title}>
        <Image
          source={{uri: 'https://z3.ax1x.com/2021/09/14/4FgqKJ.png'}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          placeholderStyle={{opacity: 0}}
        />
      </View>
      <View style={styles.header} />
      <View style={styles.title}>
        <Button
          title="连接设备"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate('WiFi')}
        />
      </View>
    </View>
  );
};

export default Index;
