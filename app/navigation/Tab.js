import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, useColorScheme } from 'react-native';
import Home from '../src/views/screens/Home';
import Footprints from '../src/views/screens/Footprints';
import Write from '../src/views/screens/Write';
import Mypage from '../src/views/screens/Mypage';
import BLACK_COLOR from '../src/consts/color';
import YELLOW_COLOR from '../src/consts/color';
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => { 
 const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {
        backgroundColor: isDark ? BLACK_COLOR : "white",
    },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? "#d2dae2" : "#808e9b",
        headerStyle:{
            backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
            color: isDark ? 'white' : BLACK_COLOR,
        },
        tabBarLabelStyle:{
            marginTop: -5,
            fontSize: 12,
            fontWeight:"600",
        }
    }}>
        <Tab.Screen 
            name="홈" 
            component={Home} 
            options={{
                headerTitleAlign: 'center',
                tabBarIcon : ({focused, color, size}) => {
                    return <Ionicons name="home" size={24} color="black"/>
                }
            }}/>
        <Tab.Screen 
            name="발자취" 
            component={Footprints} 
            options={{
                headerTitleAlign: 'center', 
                tabBarIcon : ({focuesd, color, size}) => {
                    return <Ionicons name="paw" size={24} color="black" />
                } 
            }} />
        <Tab.Screen 
            name="게시글" 
            component={Write} 
            options={{
                headerTitleAlign: 'center', 
                tabBarIcon : ({focuesd, color, size}) => {
                return <Ionicons name="reader" size={30} color="black" />
            }
            }}/>
        <Tab.Screen 
            name="마이페이지" 
            component={Mypage}
            options={{
                headerTitleAlign: 'center', 
                tabBarIcon : ({focuesd, color, size}) => {
                    return <Ionicons name="person" size={24} color="black" />
             } 
             }} />
    </Tab.Navigator>
    );
}
export default Tabs;