import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Mypage from "../views/screens/Mypage";
import post from "./post"; // 'PostScreen' 컴포넌트 임포트

const Nav = createNativeStackNavigator();

const App = () => (
    <Nav.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Nav.Screen name="post" component={post}/>
        <Nav.Screen name="MyPage" component={Mypage}/>
    </Nav.Navigator>
    );

export default App;
