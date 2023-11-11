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
import { AntDesign } from '@expo/vector-icons';

//Bottom screens
import Home from "./src/Screens/Home";
import Market from "./src/Screens/Market";
import History from "./src/Screens/History";

//Stack screens
import Gain from "./src/Screens/Gain";
import Expense from "./src/Screens/Expense";
import SelectCategories from "./src/Screens/SelectCategories";
import ConfirmationScreen from "./src/Screens/ConfirmationScreen";
import ChartBar from './src/Screens/ChartBar';
import ChartInterpolation from './src/Screens/ChartInterpolation';
import ChartPastel from './src/Screens/ChartPastel';
import CategoryHistory from './src/Screens/CategoryHistory';
import Register from "./src/Screens/Register";
import LogIn from './src/Screens/LogIn';

const loadFonts = async () => {
    await Font.loadAsync({
      MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    });
};

const StackRegisterLogIn = createNativeStackNavigator();

const StackRegisterLogIns = () => {
    return (
        <StackRegisterLogIn.Navigator>
            <StackRegisterLogIn.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
            <StackRegisterLogIn.Screen
                name="LogIn"
                component={LogIn}
                options={{
                    headerShown: false,
                }}
            />
            <StackRegisterLogIn.Screen
                name="TabNavigationScreen"
                component={TabNavigation}
                options={{
                    headerShown: false,
                }}
            />
        </StackRegisterLogIn.Navigator>
    )
}

const Navigations = () => {
    return (
        <NavigationContainer>
            <StackRegisterLogIns />
        </NavigationContainer>
    );
};

export default Navigations;

const Stack = createNativeStackNavigator();

const Stacks = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor:'#2F2F2F',
                },
                headerShown: true,
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
                name="Profile"
                component={Profile}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Perfil"
                }}
            />

            <Stack.Screen
                name="History"
                component={History}
                options={{
                    headerBackTitleVisible: false,
                    headerTintColor: "#D39F00",
                    headerTitle: "Historial"
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

            <Stack.Screen
                name="ChartBar"
                component={ChartBar}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Gráfico de Barras - Estadísticas"
                }}
            />

            <Stack.Screen
                name="ChartPastel"
                component={ChartPastel}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Gráfico de Categorías - Estadísticas"
                }}
            />

            <Stack.Screen
                name="CategoryHistory"
                component={CategoryHistory}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Datos por Categoría - Estadísticas"
                }}
            />

            <Stack.Screen
                name="ChartInterpolation"
                component={ChartInterpolation}
                options={{
                    headerBackTitleVisible: false,
                    headerTintColor: "#D39F00",
                    headerTitle: "Gráfico de Interpolación - Estadísticas"
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
                initialRouteName: 'Inicio',
                tabBarActiveTintColor: '#f5f5fa',
                tabBarInactiveTintColor: '#0f0c0c',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#D39F00'
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
                name="Cateogrías"
                component={ChartPastel}
                options={{
                    tabBarIcon:()=>(
                        <AntDesign name="piechart" size={30} color="#0f0c0c" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}