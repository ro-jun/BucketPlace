import React, { useEffect } from 'react';
import { Platform,Text, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import Root from '../navigation/Root';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './views/screens/SignInScreen';
import SignUpScreen from './views/screens/SignUpScreen';
import Sign from './views/screens/Sign';
import { UserProvider } from './User/UserContext';

const Stack = createNativeStackNavigator();
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


//Sign.js 불러오기
return (
  <UserProvider>
      <NavigationContainer>
          <Sign />
      </NavigationContainer>
  </UserProvider>
);
}