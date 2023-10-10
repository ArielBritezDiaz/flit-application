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
import Market from "./Screens/Market";

//Stack screens
import Gain from "./Screens/Gain";
import SelectCategories from "./Screens/SelectCategories";
import ConfirmationScreen from "./Screens/ConfirmationScreen";
import CreateCategory from "./Screens/CreateCategory";

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
                name="CreateCategory"
                component={CreateCategory}
                options={{
                    headerBackTitleVisible:false,
                    headerTintColor:'#D39F00',
                    headerTitle: "Cree su categoria"
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
    return(
        <NavigationContainer>
        <TabNavigation/>
        </NavigationContainer>
    )
}