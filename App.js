import React, { useEffect } from 'react';
import { Platform,Text, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import Root from './navigation/Root';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android')
      hideSplashScreen(); // 변경된 부분
  }, []);

  // hideSplashScreen 함수 추가
  async function hideSplashScreen() {
    try {
      await SplashScreen.hideAsync();
    } catch (e) {
      console.warn(e);
    }
  };



  return (
      <NavigationContainer>
        <Root />
      </NavigationContainer>
  );
}