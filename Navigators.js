import React from "react";
import { useState } from "react";

//Navigators
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from 'react';
import * as Font from 'expo-font';

//Icons librarie
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Bottom screens
import Home from "./src/Screens/Home";
import Market from "./src/Screens/Market";
import History from "./src/Screens/History";

//Stack screens
import Gain from "./src/Screens/Gain";
import Expense from "./src/Screens/Expense";
import SelectCategories from "./src/Screens/SelectCategories";
import ConfirmationScreen from "./src/Screens/ConfirmationScreen";
import Profile from "./src/Screens/Profile";
import Register from "./src/Screens/Register";
import LogIn from './src/Screens/LogIn';

const loadFonts = async () => {
    await Font.loadAsync({
      MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    });
};

const Stack = createNativeStackNavigator();

const Stacks = () =>{
    return(
        <Stack.Navigator
            screenOptions={{
                initialRouteName: 'LogIn',
                headerStyle:{
                    backgroundColor:'#2F2F2F',
                }
            }}>

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{
                    headerShown:false,
                }}
            />

            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Perfil"
                }}
            />

            <Stack.Screen
                name="Gain"
                component={Gain}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Ingrese el monto"
                }}
            />

            <Stack.Screen
                name="Expense"
                component={Expense}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Ingrese el monto"
                }}
            />

            <Stack.Screen
                name="SelectCategories"
                component={SelectCategories}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Seleccione una categoria"
                }}
            />

            <Stack.Screen
                name="ConfirmationScreen"
                component={ConfirmationScreen}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Confirme su seleccion"
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
                initialRouteName: 'Register',
                tabBarActiveTintColor: '#f5f5fa', 
                tabBarInactiveTintColor: '#0f0c0c',
                headerShown: false,
                tabBarStyle:{ 
                    backgroundColor: '#D39F00',
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={Stacks}
                options={{
                    tabBarIcon:()=>(
                        <MaterialCommunityIcons name="home" color={'#0f0c0c'} size={35} />
                    )
                }}
            />

            <Tab.Screen
                name="Mercado"
                component={Market}
                options={{
                    tabBarIcon:()=>(
                        <MaterialCommunityIcons name="finance" size={35} color="#0f0c0c" />
                    )
                }}
            />

            <Tab.Screen
                name="Historial"
                component={History}
                options={{
                    tabBarIcon:()=>(
                        <MaterialCommunityIcons name="history" size={35} color="#0f0c0c" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default Navigations = () =>{
    useEffect(() => {
        loadFonts();
      }, []);
    return(
        <NavigationContainer>
            <TabNavigation/>
        </NavigationContainer>
    )
}