import React from 'react';
import {useState} from 'react';
import type {Node} from 'react';

import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Text, Image, Button} from 'react-native-elements';
import WifiManager from 'react-native-wifi-reborn';

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {flex: 1},
  headerRow: {flex: 1, flexDirection: 'row'},
  headerButton: {
    backgroundColor: '#CBA3D8',
    borderRadius: 50,
    width: 20,
    height: 20,
    marginRight: 15,
    opacity: 0.5,
  },
  title: {flex: 2},
  bigTitle: {flex: 6},
  inline: {
    flex: 5,
    fontSize: 36 / 2.5,
    opacity: 0.87,
  },
  successInline: {
    fontSize: 42 / 2.5,
    opacity: 0.87,
    marginTop: 10,
  },
  image: {
    width: 320 / 2,
    height: 254 / 2,
  },
  successImage: {
    width: 82 / 1.3,
    height: 82 / 1.3,
  },
  linkTitle: {
    fontSize: 42 / 2.5,
    opacity: 0.87,
  },
  wifiBox: {
    flex: 4,
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    paddingLeft: 30,
    paddingRight: 30,
    shadowColor: '#222222',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.1,
    elevation: 1.5,
  },
  button: {
    backgroundColor: '#CBA3D8',
    borderRadius: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: 600 / 3,
    height: 140 / 3,
    marginBottom: 10,
  },
  backButtonBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  backButton: {
    width: 51 / 2,
    height: 30 / 2,
    marginTop: 25,
    marginLeft: 15,
  },
  buttonContainer: {
    margin: 10,
    color: '#fff',
  },
});

const WiFi: () => Node = ({navigation}) => {
  const [success, setSuccess] = useState(0);
  const handleWiFi = () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        if (ssid === 'NBZN-luna-0903') {
          setSuccess(1);
          setTimeout(() => {
            navigation.navigate('Start');
          }, 2000);
        } else {
          setSuccess(2); // WiFi连接不正确
          setTimeout(() => {
            setSuccess(0);
          }, 2000);
        }
      },
      () => {
        console.log('Cannot get current SSID!');
        setSuccess(3); // 没开WiFi
        setTimeout(() => {
          setSuccess(0);
        }, 2000);
      },
    );
  };
  return (
    <View style={styles.box}>
      {(success === 1 || success === 2 || success === 3) && (
        <>
          <View style={styles.bigTitle} />
          <View style={styles.title}>
            <Image //WiFi标志
              source={{
                uri:
                  success === 1
                    ? 'https://z3.ax1x.com/2021/09/18/4QcMAf.png'
                    : 'https://s4.ax1x.com/2021/12/07/ogws1S.png',
              }}
              style={styles.successImage}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.successInline}>
              {success === 1
                ? '连接成功'
                : success === 2
                ? '请连接至正确的WiFi'
                : '请确保WiFi开关已开启'}
            </Text>
          </View>
          <View style={styles.bigTitle} />
        </>
      )}
      {success === 0 && (
        <>
          <View style={styles.backButtonBox}>
            <Image //返回按钮
              source={{uri: 'https://z3.ax1x.com/2021/09/14/4kMNSe.png'}}
              style={styles.backButton}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
              onPress={() => navigation.navigate('Index')}
            />
            <View style={styles.title} />
          </View>
          <View style={styles.title}>
            <Image //WiFi标志
              source={{uri: 'https://z3.ax1x.com/2021/09/14/4kurnI.png'}}
              style={styles.image}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.linkTitle}>连接设备</Text>
          </View>
          <View style={styles.wifiBox}>
            <View style={styles.header}>
              <View style={styles.header} />
              <View style={styles.headerRow}>
                <View style={styles.headerButton} />
                <Text style={styles.inline}>打开产品电源</Text>
              </View>
              <View style={styles.headerRow}>
                <View style={styles.headerButton} />
                <Text style={styles.inline}>打开手机 Wi-Fi</Text>
              </View>
              <View style={styles.headerRow}>
                <View style={styles.headerButton} />
                <Text style={styles.inline}>打开 Wi-Fi 网络: Serendipity</Text>
              </View>
              <Button
                title="前往 WiFi"
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                onPress={handleWiFi}
              />
            </View>
          </View>
          <View style={styles.header} />
        </>
      )}
    </View>
  );
};

export default WiFi;
