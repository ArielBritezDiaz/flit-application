import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { useEffect } from "react";
import { EXPO_IP_HOST, EXPO_PORT } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage';

import saveIdUser from "../components/saveIdUser";

export default LogIn = ({navigation}) => {
    const [emailUser, setEmailUser] = useState("")
    const [password, setPassword] = useState("");

    const handleLogIn = async () => {
        try {
            const validationEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if(validationEmail.test(emailUser)) {

                const data = {
                    emailUser,
                    password
                }
                
                const response = await fetch(`http://${EXPO_IP_HOST}:${EXPO_PORT}/api/searchUser`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
    
                if(!response.ok) {
                    throw new Error("Response !ok in handleLogIn")
                }
    
                const result = await response.json()
                console.log("resultLogIn", result)
    
                if(result.data[0].isValidToken === 1) {

                    // saveIdUser(result.data[0].id_user)
                    // console.log("saveIdUser", saveIdUser())

                    AsyncStorage.setItem('id_user_save',JSON.stringify(result.data[0].id_user));

                    navigation.navigate(result.navigation, {
                        id_user: result.data[0].id_user
                    })
                } else {
                    return console.log("Usuario inexistente")
                }
            } else {
                console.log("Usuario inexistente 2")
            }

        } catch(error) {
            console.log("Error in handleLogIn", error)
        }

        // navigation.navigate('HomeScreen', {
        //     email : email,
        //     name : user,
        //     password : password
        // });
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <Image source={require('../assets/logo.png')} style={styles.img}></Image>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                name="email"
                keyboardType="email-address"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={txt => {
                    setEmailUser(txt)
                }}
            ></TextInput>
            <TextInput
                style={styles.input}
                name="password"
                placeholder="Contraseña"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={txt => {
                    setPassword(txt)
                }}
                secureTextEntry={true}
            ></TextInput>
            <TouchableOpacity onPress={handleLogIn}>
                <Text style={styles.btnRegister}>
                    Iniciar sesión
                </Text>
            </TouchableOpacity>
            <View style={styles.questionAccount}>
                <Text style={styles.alreadyAccount}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.register}>
                        Registarse
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container:{
        flexGrow: 1,
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
    },
    img:{
        width:200,
        height: 200,
        marginVertical: 70
    },
    input:{
        backgroundColor: "#1F1B18",
        marginVertical: 23,
        width:"70%",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#D39F00',
        paddingVertical:10,
        paddingHorizontal: 20,
        fontSize:18,
        color:"#f5f5fa"
    },
    btnRegister:{
        marginTop:40,
        color:'#2f2f2f',
        backgroundColor:'#D39F00',
        borderRadius: 12,
        fontSize:18,
        paddingHorizontal: 50,
        paddingVertical:10,
        elevation:30,
        fontWeight:'bold'
    },
    questionAccount: {
        alignItems: "center",
        marginVertical: 20
    },
    alreadyAccount: {
        color: "#f5f5fa",
        fontSize: 15
    },
    register: {
        color: "#D39F00",
        fontSize: 15
    }
})