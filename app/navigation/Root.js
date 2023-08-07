import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from "./Tab";
import Stack from "./Stack";
import SignUp from "../src/views/screens/SignUpScreen";
import PostScreen from '../src/Posts/post';
import EditProfile from '../src/views/screens/EditProfile';

const Nav = createNativeStackNavigator();

const Root = () => (
<Nav.Navigator screenOptions={{
    headerShown: false,
}}>
    <Nav.Screen name="Tabs" component={Tabs}/>
    <Nav.Screen name="Stack" component={Stack}/>
    <Nav.Screen name="SignUp" component={SignUp}/>
    <Nav.Screen name="EditProfile" component={EditProfile}/>
</Nav.Navigator>
);

export default Root;