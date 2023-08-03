import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from "./Tab";
import Stack from "./Stack";
import SignUp from "../app/src/views/screens/SignUpScreen";

const Nav = createNativeStackNavigator();

const Root = () => (
<Nav.Navigator screenOptions={{
    headerShown: false,
}}>
    <Nav.Screen name="Tabs" component={Tabs}/>
    <Nav.Screen name="Stack" component={Stack}/>
    <Nav.Screen name="SignUp" component={SignUp}/>
</Nav.Navigator>
);

export default Root;