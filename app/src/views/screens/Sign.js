import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Root from "../../../../navigation/Root";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const Nav = createNativeStackNavigator();

const Sign = () => (
<Nav.Navigator screenOptions={{
    headerShown: false,
}}>
    <Nav.Screen name="SignIn" component={SignInScreen}/>
    <Nav.Screen name="SignUp" component={SignUpScreen}/>
    <Nav.Screen name="Root" component={Root}/>
</Nav.Navigator>
);

export default Sign;