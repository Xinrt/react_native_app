/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import type {Node} from 'react';
import {useEffect, useState, useRef} from 'react';
import dgram from 'react-native-udp';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import {Image, Text, Button} from 'react-native-elements';

import Tflite from 'tflite-react-native';

import {RNCv, Mat, ColorConv, CvSize, CvType} from 'react-native-opencv3';
import {Synthesizer, SpeechConstant} from 'react-native-speech-iflytek';

let tflite = new Tflite();

var RNFS = require('react-native-fs');

var Buffer = require('buffer').Buffer;

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#eff2f3',
  },
  header: {flex: 1, backgroundColor: '#CBA3D8', width: '100%', height: '100%'},
  title: {flex: 2.4, flexDirection: 'column', alignItems: 'center'},
  titleInline1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  titleInline2: {fontSize: 15},
  titleInline3: {fontWeight: 'bold', marginTop: 30, fontSize: 18},
  face: {flex: 6.6},
  headerTitle: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
  headerTitleBox: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -50}],
  },
  image: {
    width: 465 / 3,
    height: 389 / 3,
  },
  button: {
    backgroundColor: '#CBA3D8',
    borderRadius: 30,
    width: 600 / 4.6,
    height: 140 / 3.4,
  },
  buttonContainer: {
    margin: 10,
    color: '#fff',
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
  faceImage: {
    height: win.height * 0.66,
    // height: '100%',
    aspectRatio: 559 / 832,
    // height: '100%',
    // transform: [{scale: 0.5}],
  },
  faceImageContainer: {
    position: 'relative',
    zIndex: 1,
  },
  faceColorImageContainer1: {
    position: 'absolute',
    zIndex: 2,
  },
  faceColorImageContainer2: {
    position: 'absolute',
    zIndex: 2,
  },
  faceColorImageContainer3: {
    position: 'absolute',
    zIndex: 2,
  },
  faceColorImageContainer4: {
    position: 'absolute',
    zIndex: 2,
  },
  faceColorImageContainer5: {
    position: 'absolute',
    zIndex: 2,
  },
  faceColorImageContainer6: {
    position: 'absolute',
    zIndex: 2,
  },
  faceText: {
    position: 'absolute',
    fontSize: win.height / 45,
    // transform: [{translateX: -50}, {translateY: -50}],
    zIndex: 99,
  },
});

const faceStateURL = {
  one: 'https://z3.ax1x.com/2021/09/29/448Ljg.png',
  two: 'https://z3.ax1x.com/2021/09/29/44aVbD.png',
  three: 'https://z3.ax1x.com/2021/09/29/44a0x0.png',
  four: 'https://z3.ax1x.com/2021/09/29/44aRi9.png',
  five: 'https://z3.ax1x.com/2021/09/29/44aOJA.png',
  six: 'https://z3.ax1x.com/2021/09/29/44ajzt.png',
};

const faceColorURL = {
  one: {
    red: 'https://z3.ax1x.com/2021/11/25/okz0mj.png',
    orange: 'https://z3.ax1x.com/2021/11/25/okzdXQ.png',
    yellow: 'https://z3.ax1x.com/2021/11/25/okza6g.png',
    green: 'https://z3.ax1x.com/2021/11/25/okzNp8.png',
  },
  two: {
    red: 'https://z3.ax1x.com/2021/11/25/okzskq.png',
    orange: 'https://z3.ax1x.com/2021/11/25/okzTtx.png',
    yellow: 'https://z3.ax1x.com/2021/11/25/okzb9K.png',
    green: 'https://z3.ax1x.com/2021/11/25/okzq1O.png',
  },
  three: {
    red: 'https://z3.ax1x.com/2021/11/25/okzLcD.png',
    orange: 'https://z3.ax1x.com/2021/11/25/oASpNt.png',
    yellow: 'https://z3.ax1x.com/2021/11/25/oAS94P.png',
    green: 'https://z3.ax1x.com/2021/11/25/oASP9f.png',
  },
  four: {
    red: 'https://z3.ax1x.com/2021/11/25/oASu40.png',
    orange: 'https://z3.ax1x.com/2021/11/25/oASWPP.png',
    yellow: 'https://z3.ax1x.com/2021/11/25/oAS4xS.png',
    green: 'https://z3.ax1x.com/2021/11/25/oASorQ.png',
  },
  five: {
    red: 'https://z3.ax1x.com/2021/11/25/oASban.png',
    orange: 'https://z3.ax1x.com/2021/11/25/oASXGV.png',
    yellow: 'https://z3.ax1x.com/2021/11/25/oASzMF.png',
    green: 'https://z3.ax1x.com/2021/11/25/oApiI1.png',
  },
  six: {
    red: 'https://z3.ax1x.com/2021/11/25/oApkPx.png',
    orange: 'https://z3.ax1x.com/2021/11/25/oApVxO.png',
    yellow: 'https://z3.ax1x.com/2021/11/25/oApnqH.png',
    green: 'https://z3.ax1x.com/2021/11/25/oApQII.png',
  },
};

const Face: () => Node = ({navigation}) => {
  const URL = '192.168.10.10';
  const open_msg = new Uint8Array([0x20, 0x36]);
  const close_msg = new Uint8Array([0x20, 0x37]);
  let app = dgram.createSocket({type: 'udp4', reuseAddr: true});
  let server = dgram.createSocket({type: 'udp4', reuseAddr: true});
  const app_port = 7071;
  const server_port = 7070;
  const stop = useRef(false);
  const tempArr = useRef({arr: [], count: 0});
  const imgArr = useRef([]);
  const flag = useRef(0);
  const firstUpdate = useRef(0);
  const [result, setResult] = useState({
    yes: 0,
    container: [],
  });
  const [regionResult, setRegionResult] = useState({
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
  });
  const [testResult, setTestResult] = useState();

  const threshold = 6;

  // Load Model
  useEffect(() => {
    async function init() {
      tflite.loadModel(
        {
          model: 'models/test-t3_fp16.tflite', // required
          labels: 'models/test-t3_fp16.txt', // required (yes/no/other)
          numThreads: 1, // defaults to 1
        },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        },
      );
      async function binding() {
        app.bind(app_port, err => {
          if (err) {
            throw err;
          }
          console.log('app bound to port', app_port);
        });
        server.bind(server_port, err => {
          if (err) {
            throw err;
          }
          console.log('server bound to port', server_port);
        });
      }
      await binding();
    }
    init();
    runModelPre();
  }, []);

  const runModelPre = () => {
    app.send(open_msg, 0, open_msg.length, server_port, URL, function (err) {
      if (err) {
        throw err;
      }
      console.log('app sent data, starting frame');
    });
    app.on('message', async (data, rinfo) => {
      const rawData = data.toJSON().data;
      // console.log('frame', rawData[0], rawData[1], rawData[2], rawData[3]);
      tempArr.current.arr = tempArr.current.arr.concat(rawData.slice(4)); // ID, over_tag, package_number, 0
      tempArr.current.count += 1;
      if (rawData[1] !== 0) {
        if (tempArr.current.count === rawData[2]) {
          console.log('frame', rawData[0], 'works!');
          // 确保没有丢包
          imgArr.current.push([
            // Base64.fromUint8Array(new Uint8Array(tempArr.current.arr)),
            // String.fromCharCode(null, new Uint8Array(tempArr.current.arr)),
            // new Blob([new Uint8Array(tempArr.current.arr), {type: 'image/jpeg'}]),
            Buffer.from(tempArr.current.arr).toString('base64'),
            rawData[0], // Process Id
          ]);
          if (firstUpdate.current === 1) {
            flag.current = rawData[0]; // After FIRST UPDATE, activate runModel
            firstUpdate.current = 2;
          } else if (imgArr.current.length === 1) {
            flag.current = rawData[0]; // imgArr cleared, activate runModel
          }
        }
        tempArr.current.arr = [];
        tempArr.current.count = 0;
      }

      if (stop.current) {
        app.send(
          close_msg,
          0,
          close_msg.length,
          server_port,
          URL,
          function (err) {
            if (err) {
              console.warn(err);
              throw err;
            }
            console.log('app sent data, closing frame');
          },
        );
        imgArr.current = 0;
        tempArr.current.arr = [];
        tempArr.current.count = 0;
        // setTimeout(function () {
        //   app.close();
        // }, 500);
      }
    });
  };

  useEffect(() => {
    if (firstUpdate.current === 0) {
      // Make sure init do not call
      firstUpdate.current = 1;
      return;
    }
    runModel(imgArr.current[0][1]);
  }, [flag.current]);

  const runModel = async id => {
    const path = `${RNFS.ExternalStorageDirectoryPath}/process${id}.jpeg`;
    const imageString = imgArr.current[0][0];
    console.log('Run Model', id);
    console.log('img String length', imageString.length);
    // console.log(imgArr.current);
    async function writeFile() {
      const exist = await RNFS.exists(path);
      if (exist) {
        await RNFS.unlink(path);
      }
      await RNFS.writeFile(
        path, // avoid overwrite
        imageString,
        'base64',
      );
    }
    async function opencv() {
      const srcMat = await RNCv.imageToMat(path);
      const interMat = await new Mat().init();
      const imageSize = new CvSize(240, 240);
      const ddepth = CvType.CV_8UC3; //3 channels of 8 unsigned char (0-255)
      // const ddepth = -1;
      const kSize = 3;
      RNCv.invokeMethod('cvtColor', {
        p1: srcMat,
        p2: interMat,
        p3: ColorConv.COLOR_BGR2GRAY,
      });
      RNCv.invokeMethod('resize', {
        p1: interMat,
        p2: interMat,
        p3: imageSize,
      });
      RNCv.invokeMethod('Laplacian', {
        p1: interMat,
        p2: interMat,
        p3: ddepth,
        p4: kSize,
      });
      const {uri} = await RNCv.matToImage(interMat, path);
      return uri;
    }

    async function runtflite() {
      // const res = await RNFS.stat(path);
      // console.log('Size', id, res.size);
      // if (parseInt(res.size) < 1024 * 20) {
      //   // Filter small size image (< 20 kb)
      //   return;
      // }
      await tflite.runModelOnImage(
        {
          path,
          imageMean: 128.0,
          imageStd: 128.0,
          numResults: 3,
          threshold: 0.05,
        },
        (err, resp) => {
          if (err) {
            console.log(err);
            return;
          } else {
            setTestResult(resp);
            setResult(v => ({
              yes:
                v.container.length === threshold
                  ? v.container.reduce((a, b) => a + b) / threshold
                  : v.yes,
              container:
                v.container.length === threshold
                  ? []
                  : resp[0].label === 'yes'
                  ? [...v.container, resp[0].confidence]
                  : resp.length === 2 // avoid resp[1] undefined
                  ? [...v.container, resp[1].confidence]
                  : [...v.container],
            }));
          }
        },
      );
    }
    async function deleteFile() {
      await RNFS.unlink(path);
      if (imgArr.current.length > 0) {
        imgArr.current.shift(); // remove first element
      }
    }

    await writeFile();
    // await opencv();
    await runtflite();
    await deleteFile();

    if (imgArr.current.length > 0 && !stop.current) {
      return runModel(imgArr.current[0][1]); // Run Recursively
    } else {
      return;
    }
  };

  const initialTime = 10;
  const [timer, setTimer] = useState(initialTime);
  const [region, setRegion] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setRegionResult(v => ({
        one: region === 1 ? [...v.one, result.yes] : [...v.one],
        two: region === 2 ? [...v.two, result.yes] : [...v.two],
        three: region === 3 ? [...v.three, result.yes] : [...v.three],
        four: region === 4 ? [...v.four, result.yes] : [...v.four],
        five: region === 5 ? [...v.five, result.yes] : [...v.five],
        six: region === 6 ? [...v.six, result.yes] : [...v.six],
      }));
      if (timer > 1) {
        setTimer(v => v - 1);
      } else {
        if (region === 6) {
          setTimer(0);
          //Finish State
          stop.current = true; // Stop calling runModel()
          return;
        }
        setTimer(initialTime);
        setRegion(v => v + 1);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    const AppId = '4ce5a360';
    Synthesizer.init(AppId);
    Synthesizer.start('请移动至区域${region} 请在区域范围内移动');
    // Synthesizer.start('请在区域范围内移动');
  }, []);

  const handleRetry = () => {
    setTimer(initialTime);
    setRegion(1);
    setResult({
      yes: 0,
      container: [],
    });
    setRegionResult({
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
    });
    stop.current = false;
    firstUpdate.current = 0;
    flag.current = 0;
    // runModelPre();
    // TODO: handle retry errors (app bound status wrong)
  };
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <View style={styles.backButtonBox}>
          <Image //返回按钮
            source={{uri: 'https://z3.ax1x.com/2021/09/29/44MGHx.png'}}
            style={styles.backButton}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={{opacity: 0}}
            onPress={() => navigation.navigate('Transition')}
          />
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>皮肤检测</Text>
          </View>
        </View>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleInline1}>
          {region === 6 && stop.current ? '检测详情' : `检测中：剩余${timer}S`}
        </Text>
        <Text style={styles.titleInline2}>
          {region === 6 && stop.current
            ? '请根据各区域残妆程度进行清洁'
            : '请根据提示移动洁面仪至指定区域'}
        </Text>
        {region === 6 && stop.current ? (
          <Button
            title="再次检测"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={handleRetry}
          />
        ) : (
          <Text style={styles.titleInline3}>{`请移动至区域${region}`}</Text>
        )}
      </View>
      <View>
        <Text>{JSON.stringify(testResult)}</Text>
        {/* <Text>regionResult: {JSON.stringify(regionResult)}</Text> */}
      </View>
      <View style={styles.face}>
        {region > 1 && (
          <View style={styles.faceColorImageContainer1}>
            <Image
              source={{
                uri:
                  regionResult.one.reduce((a, b) => a + b) /
                    regionResult.one.length <
                  0.25
                    ? faceColorURL.one.green
                    : regionResult.one.reduce((a, b) => a + b) /
                        regionResult.one.length <
                      0.5
                    ? faceColorURL.one.yellow
                    : regionResult.one.reduce((a, b) => a + b) /
                        regionResult.one.length <
                      0.75
                    ? faceColorURL.one.orange
                    : faceColorURL.one.red,
              }}
              style={styles.faceImage}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
        )}
        {region > 2 && (
          <View style={styles.faceColorImageContainer2}>
            <Image
              source={{
                uri:
                  regionResult.two.reduce((a, b) => a + b) /
                    regionResult.two.length <
                  0.25
                    ? faceColorURL.two.green
                    : regionResult.two.reduce((a, b) => a + b) /
                        regionResult.two.length <
                      0.5
                    ? faceColorURL.two.yellow
                    : regionResult.two.reduce((a, b) => a + b) /
                        regionResult.two.length <
                      0.75
                    ? faceColorURL.two.orange
                    : faceColorURL.two.red,
              }}
              style={styles.faceImage}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
        )}
        {region > 3 && (
          <View style={styles.faceColorImageContainer3}>
            <Image
              source={{
                uri:
                  regionResult.three.reduce((a, b) => a + b) /
                    regionResult.three.length <
                  0.25
                    ? faceColorURL.three.green
                    : regionResult.three.reduce((a, b) => a + b) /
                        regionResult.three.length <
                      0.5
                    ? faceColorURL.three.yellow
                    : regionResult.three.reduce((a, b) => a + b) /
                        regionResult.three.length <
                      0.75
                    ? faceColorURL.three.orange
                    : faceColorURL.three.red,
              }}
              style={styles.faceImage}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
        )}
        {region > 4 && (
          <View style={styles.faceColorImageContainer4}>
            <Image
              source={{
                uri:
                  regionResult.four.reduce((a, b) => a + b) /
                    regionResult.four.length <
                  0.25
                    ? faceColorURL.four.green
                    : regionResult.four.reduce((a, b) => a + b) /
                        regionResult.four.length <
                      0.5
                    ? faceColorURL.four.yellow
                    : regionResult.four.reduce((a, b) => a + b) /
                        regionResult.four.length <
                      0.75
                    ? faceColorURL.four.orange
                    : faceColorURL.four.red,
              }}
              style={styles.faceImage}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
        )}
        {region > 5 && (
          <View style={styles.faceColorImageContainer5}>
            <Image
              source={{
                uri:
                  regionResult.five.reduce((a, b) => a + b) /
                    regionResult.five.length <
                  0.25
                    ? faceColorURL.five.green
                    : regionResult.five.reduce((a, b) => a + b) /
                        regionResult.five.length <
                      0.5
                    ? faceColorURL.five.yellow
                    : regionResult.five.reduce((a, b) => a + b) /
                        regionResult.five.length <
                      0.75
                    ? faceColorURL.five.orange
                    : faceColorURL.five.red,
              }}
              style={styles.faceImage}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
        )}
        {stop.current && (
          <View style={styles.faceColorImageContainer6}>
            <Image
              source={{
                uri:
                  regionResult.six.reduce((a, b) => a + b) /
                    regionResult.six.length <
                  0.25
                    ? faceColorURL.six.green
                    : regionResult.six.reduce((a, b) => a + b) /
                        regionResult.six.length <
                      0.5
                    ? faceColorURL.six.yellow
                    : regionResult.six.reduce((a, b) => a + b) /
                        regionResult.six.length <
                      0.75
                    ? faceColorURL.six.orange
                    : faceColorURL.six.red,
              }}
              style={styles.faceImage}
              PlaceholderContent={<ActivityIndicator />}
              placeholderStyle={{opacity: 0}}
            />
          </View>
        )}
        <View style={styles.faceImageContainer}>
          <Image
            source={{
              uri:
                region === 1
                  ? faceStateURL.one
                  : region === 2
                  ? faceStateURL.two
                  : region === 3
                  ? faceStateURL.three
                  : region === 4
                  ? faceStateURL.four
                  : region === 5
                  ? faceStateURL.five
                  : faceStateURL.six,
            }}
            style={styles.faceImage}
            PlaceholderContent={<ActivityIndicator />}
            placeholderStyle={{opacity: 0}}
          />
        </View>
      </View>
      <Text
        style={
          region === 1
            ? [styles.faceText, {top: '45%', fontWeight: 'bold'}]
            : [styles.faceText, {top: '45%'}]
        }>
        {region === 1
          ? '正在检测'
          : region < 1
          ? '区域一'
          : regionResult.one.reduce((a, b) => a + b) / regionResult.one.length <
            0.25
          ? '无残留'
          : regionResult.one.reduce((a, b) => a + b) / regionResult.one.length <
            0.5
          ? '轻度残留'
          : regionResult.one.reduce((a, b) => a + b) / regionResult.one.length <
            0.75
          ? '中度残留'
          : '重度残留'}
      </Text>
      <Text
        style={
          region === 2
            ? [styles.faceText, {top: '63%', left: '22%', fontWeight: 'bold'}]
            : [styles.faceText, {top: '63%', left: '22%'}]
        }>
        {region === 2
          ? '正在检测'
          : region < 2
          ? '区域二'
          : regionResult.two.reduce((a, b) => a + b) / regionResult.two.length <
            0.25
          ? '无残留'
          : regionResult.two.reduce((a, b) => a + b) / regionResult.two.length <
            0.5
          ? '轻度残留'
          : regionResult.two.reduce((a, b) => a + b) / regionResult.two.length <
            0.75
          ? '中度残留'
          : '重度残留'}
      </Text>
      <Text
        style={
          region === 3
            ? [styles.faceText, {top: '63%', right: '22%', fontWeight: 'bold'}]
            : [styles.faceText, {top: '63%', right: '22%'}]
        }>
        {region === 3
          ? '正在检测'
          : region < 3
          ? '区域三'
          : regionResult.three.reduce((a, b) => a + b) /
              regionResult.three.length <
            0.25
          ? '无残留'
          : regionResult.three.reduce((a, b) => a + b) /
              regionResult.three.length <
            0.5
          ? '轻度残留'
          : regionResult.three.reduce((a, b) => a + b) /
              regionResult.three.length <
            0.75
          ? '中度残留'
          : '重度残留'}
      </Text>
      <Text
        style={
          region === 4
            ? [styles.faceText, {top: '75%', left: '28%', fontWeight: 'bold'}]
            : [styles.faceText, {top: '75%', left: '28%'}]
        }>
        {region === 4
          ? '正在检测'
          : region < 4
          ? '区域四'
          : regionResult.four.reduce((a, b) => a + b) /
              regionResult.four.length <
            0.25
          ? '无残留'
          : regionResult.four.reduce((a, b) => a + b) /
              regionResult.four.length <
            0.5
          ? '轻度残留'
          : regionResult.four.reduce((a, b) => a + b) /
              regionResult.four.length <
            0.75
          ? '中度残留'
          : '重度残留'}
      </Text>
      <Text
        style={
          region === 5
            ? [styles.faceText, {top: '75%', right: '28%', fontWeight: 'bold'}]
            : [styles.faceText, {top: '75%', right: '28%'}]
        }>
        {region === 5
          ? '正在检测'
          : region < 5
          ? '区域五'
          : regionResult.five.reduce((a, b) => a + b) /
              regionResult.five.length <
            0.25
          ? '无残留'
          : regionResult.five.reduce((a, b) => a + b) /
              regionResult.five.length <
            0.5
          ? '轻度残留'
          : regionResult.five.reduce((a, b) => a + b) /
              regionResult.five.length <
            0.75
          ? '中度残留'
          : '重度残留'}
      </Text>
      <Text
        style={
          region === 6 && !stop.current
            ? [styles.faceText, {top: '85%', fontWeight: 'bold'}]
            : [styles.faceText, {top: '85%'}]
        }>
        {region === 6 && !stop.current
          ? '正在检测'
          : region < 6
          ? '区域六'
          : regionResult.six.reduce((a, b) => a + b) / regionResult.six.length <
            0.25
          ? '无残留'
          : regionResult.six.reduce((a, b) => a + b) / regionResult.six.length <
            0.5
          ? '轻度残留'
          : regionResult.six.reduce((a, b) => a + b) / regionResult.six.length <
            0.75
          ? '中度残留'
          : '重度残留'}
      </Text>
    </View>
  );
};

export default Face;
