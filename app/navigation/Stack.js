import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';

const ScreenOne = ({navigation : { navigate }}) => (
    <TouchableOpacity onPress={() => navigate("Two")}>
        <Text>go to two</Text>
    </TouchableOpacity>
);
const ScreenTwo = ({navigation : { navigate }}) => (
    <TouchableOpacity onPress={() => navigate("Three")}>
        <Text>go two Three</Text>
    </TouchableOpacity>
);
const ScreenThree = ({navigation : { navigate }}) => (
    <TouchableOpacity onPress={() => navigate("Tabs", {screen: "홈"})}> 
        <Text>Go back</Text>
    </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => <NativeStack.Navigator
        screenOptions={{
            presentation: "modal",
        }}    
    >
    <NativeStack.Screen 
        name ="One" 
        component={ScreenOne} />
    <NativeStack.Screen 
        name ="Two" 
        component={ScreenTwo} />
    <NativeStack.Screen 
        name ="Three" 
        component={ScreenThree} />
</NativeStack.Navigator>;

export default Stack;