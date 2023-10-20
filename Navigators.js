import React from "react";

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
import Settings from "./src/Screens/Settings";
import Market from "./src/Screens/Market";

//Stack screens
import Gain from "./src/Screens/Gain";
import Expense from "./src/Screens/Expense";
import SelectCategories from "./src/Screens/SelectCategories";
import ConfirmationScreen from "./src/Screens/ConfirmationScreen";

const loadFonts = async () => {
    await Font.loadAsync({
      MaterialCommunityIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    });
};

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
                    headerTitle: "Ingrese el monto de ganancia"
                }}
            />
            <Stack.Screen
                name="Expense"
                component={Expense}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Ingrese el monto de pérdida"
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
                initialRouteName: 'Home',//The initial screen of the application
                tabBarActiveTintColor: '#f5f5fa', 
                tabBarInactiveTintColor: '#0f0c0c',
                headerShown: false,//Hide the top tab
                tabBarStyle:{ 
                    backgroundColor: '#D39F00',
                },
            }}
        >
            <Tab.Screen name="Inicio"
                component={Stacks}
                options={{
                    tabBarIcon:()=>(
                    <MaterialCommunityIcons name="home" color={'#000'} size={35}/>//Home icon
                )
                }}
            />
            <Tab.Screen name="Mercado"
                component={Market}
                options={{
                    tabBarIcon:()=>(
                        <MaterialCommunityIcons name="finance" size={35} color="black" />//Market icon
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