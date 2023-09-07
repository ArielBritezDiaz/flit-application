import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Icons librarie
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Imported screens
import Home from "./Screens/Home";
import Settings from "./Screens/Settings";
import Activity from "./Screens/Activity";

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
            component={Home}
            options={{
                tabBarBadge: '2',
                tabBarBadgeStyle:{
                    backgroundColor: '#FFF',
                    color: '#D39F00'
                },
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