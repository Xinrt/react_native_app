/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PermissionsAndroid, Platform} from 'react-native';

import Index from './Pages/Index';

import WiFi from './Pages/WiFi';

import Start from './Pages/Start';

import Face from './Pages/Face';

import Transition from './Pages/Transition';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  useEffect(() => {
    async function getPermission() {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ); // TODO: 如果用户拒绝该肿么办qwq
    }
    if (Platform.OS === 'android') {
      // Only work in android
      getPermission();
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="WiFi" component={WiFi} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Transition" component={Transition} />
        <Stack.Screen name="Face" component={Face} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
