import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from "@expo/vector-icons";

import Footprints from "./screens/Footprints";
import Maps from "./screens/Maps";
import Setting from "./screens/Setting";
import Sharing from "./screens/Sharing";

//하단 탭 네비게이터 생성
const BottomTab = createBottomTabNavigator();

function App() {
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
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen 
            name = "Footprints" 
            component={Footprints}
            options={{
              tabBarIcon: () => (
                <FontAwesome name="home" size={24} color={"black"}/>
              ),
            }}
             />
          <BottomTab.Screen 
            name = "Maps" 
            component={Maps} />
          <BottomTab.Screen 
            name = "Sharing" 
            component={Sharing} />
          <BottomTab.Screen 
            name = "Setting" 
            component={Setting} /> 
        </BottomTab.Navigator>
      </NavigationContainer>
      <StatusBar style ="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;