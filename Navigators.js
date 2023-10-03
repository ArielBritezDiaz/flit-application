import React from "react";

//Navigators
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Icons librarie
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Bottom screens
import Home from "./Screens/Home";
import Settings from "./Screens/Settings";
import Activity from "./Screens/Activity";

//Stack screens
import Gain from "./Screens/Gain";
import SelectCategories from "./Screens/SelectCategories";
const Stack = createNativeStackNavigator()

const Stacks = () =>{
    return(
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor:'#2F2F2F',
            }
        }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="Gain"
                component={Gain}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: " "
                }}
            />
            <Stack.Screen
                name="SelectCategories"
                component={SelectCategories}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: " "
                }}
            />
        </Stack.Navigator>
    )
}
const Tab = createBottomTabNavigator()

const TabNavigation = () =>{
    return(
        <Tab.Navigator
        screenOptions={{
            initialRouteName: 'Home',//The initial screen of the application
            tabBarActiveTintColor: '#fff', 
            tabBarInactiveTintColor: '#000',
            headerShown: false,//Hide the top tab
            tabBarStyle:{ 
                backgroundColor: '#D39F00',
            },
        }}
        >
            <Tab.Screen name="Home"
            component={Stacks}
            options={{
                tabBarIcon:()=>(
                <MaterialCommunityIcons name="home" color={'#000'} size={35}/>//Home icon
            )
            }}
            />
            <Tab.Screen name="Activity"
            component={Activity}
            options={{
                tabBarIcon:()=>(
                <MaterialCommunityIcons name="format-list-bulleted" color="black" size={35}/>//Activities icon
            )
            }}
            />
            <Tab.Screen name="Settings" 
            component={Settings}
            options={{
                tabBarIcon:()=>(
                <MaterialCommunityIcons name="brightness-5" color={'#000'} size={35}/>//Settings icon
            )
            }}
            />
        </Tab.Navigator>
    );
}

export default Navigations = () =>{
    return(
        <NavigationContainer>
        <TabNavigation/>
        </NavigationContainer>
    )
}