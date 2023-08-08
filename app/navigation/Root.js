import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from "./Tab";
import Stack from "./Stack";
import SignUp from "../src/views/screens/SignUpScreen";
<<<<<<< HEAD
=======
import PostScreen from '../src/Posts/post';
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
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
<<<<<<< HEAD

=======
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
</Nav.Navigator>
);

export default Root;