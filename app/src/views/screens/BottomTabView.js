import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { Ionicons } from '@expo/vector-icons'
const BottomTabView = () => {

    const Tab = createMaterialTopTabNavigator();

    let squares = [];
    let numberOfSquare = 4;

    for (let index = 0; index < numberOfSquare; index++){
        squares.push(
            <View key={index}>
                <View style={{
                    wdith:130,height:150,marginVertical:0.5,
                    backgroundColor:"black", opacity:0.1,
                }}></View>
            </View>
        )
    }

    const Posts = () => {
        return(
            <ScrollView
            showVerticalScrollIndicator={false}
            style={{
                width:'100%',
                height:'100%'
            }}>
                <View style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor:'white',
                    flexWrap:'wrap',
                    flexDirection:'row',
                    paddingVertical:5,
                    justifyContent:'space-between'
                }}>
                    {squares}
                </View>
            </ScrollView>
        )
    }
    const Video = () => {
        return(
            <ScrollView
            showVerticalScrollIndicator={false}
            style={{
                width:'100%',
                height:'100%'
            }}>
                <View style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor:'white',
                    flexWrap:'wrap',
                    flexDirection:'row',
                    paddingVertical:5,
                    justifyContent:'space-between'
                }}>
                    {squares}
                </View>
            </ScrollView>
        )
    }
    const Tags = () => {
        return(
            <ScrollView
            showVerticalScrollIndicator={false}
            style={{
                width:'100%',
                height:'100%'
            }}>
                <View style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor:'white',
                    flexWrap:'wrap',
                    flexDirection:'row',
                    paddingVertical:5,
                    justifyContent:'space-between'
                }}>
                    {squares}
                </View>
            </ScrollView>
        )
    }
    
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle:{
            backgroundColor:'black',
            height:1.5
        },
        tabBarIcon: ({focused, colour}) => {
            let iconName;
            if(route.name === "Posts"){
                iconName = focused ? "ios-apps-sharp" : "ios-apps-sharp"
                colour = focused ? "black" : "gray"
<<<<<<< HEAD
            }else if(route.name === "Video"){
                iconName = focused ? "ios-play-circle" : "ios-play-circle-outline"
                colour = focused ? "black" : "gray"
            }else if(route.name === "Tags"){
=======
            }else  if(route.name === "Video"){
                iconName = focused ? "ios-play-circle" : "ios-play-circle-outline"
                colour = focused ? "black" : "gray"
            }else  if(route.name === "Tags"){
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
                iconName = focused ? "ios-person" : "ios-person-outline"
                colour = focused ? "black" : "gray"
            }


            return <Ionicons name ={iconName} color={colour} size={22}/>;
        },
    })}>
        <Tab.Screen name="Posts" component={Posts}/>
<<<<<<< HEAD
        <Tab.Screen name="Video" component={Video}/>
=======
        <Tab.Screen name="Viedo" component={Video}/>
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
        <Tab.Screen name="Tags" component={Tags}/>
    </Tab.Navigator>
  )
}

export default BottomTabView