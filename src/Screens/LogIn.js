import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView } from 'react-native';
import { EXPO_IP_HOST, EXPO_PORT } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage';

// import saveIdUser from "../components/saveIdUser";

export default LogIn = ({navigation}) => {
    const [emailUser, setEmailUser] = useState("")
    const [password, setPassword] = useState("");

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [lengthPasswordValid, setLengthPasswordValid] = useState(true)
    const [userDoesntExist, setUserDoesntExist] = useState(false);
    const [userIsValid, setUserIsValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [logInPressed, setLogInPressed] = useState(false)
    
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);


    const validationEmail = useMemo(
        () => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        []
    );
    
    const handleLogIn = async () => {
        try {
            setLogInPressed(true)
            setAttemptedSubmit(true);
            if(validationEmail.test(emailUser) && (emailUser.length >= 5 && emailUser.length <= 100) || passwordValid === false) {
                setEmailValid(true)
                setPasswordValid(true)
                if(password.length >= 8) {
                    setPasswordValid(true)
                    setLengthPasswordValid(true)
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
                        setUserDoesntExist(true)
                        setPasswordValid(false)
                        throw new Error("Response !ok in handleLogIn")
                    } else {
                        setUserDoesntExist(false)
                    }
        
                    const result = await response.json()
                    console.log("resultLogIn", result)
        
                    if(result.data[0].isValidToken === 1) {
                        setUserIsValid(true)

                        // saveIdUser(result.data[0].id_user)
                        // console.log("saveIdUser", saveIdUser())
    
                        AsyncStorage.setItem('id_user_save',JSON.stringify(result.data[0].id_user));

                        navigation.navigate(result.navigation, {
                            id_user: result.data[0].id_user
                        })
                    } else {
                        setUserIsValid(false)
                    }
                } else {
                    setEmailValid(false);
                    setEmailErrorMessage('Email inválido');
                    setLengthPasswordValid(false);
                }
            } else {
                setLengthPasswordValid(false)
                setEmailValid(false)
            }
        } catch(error) {
            setUserDoesntExist(true)
            console.log("Error in handleLogIn", error)
        }
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
                    setEmailUser(txt);
                    if (!txt || !validationEmail.test(txt)) {
                        setEmailErrorMessage(logInPressed ? 'Correo electrónico inválido' : 'Correo electrónico inválido');
                    } else {
                        setEmailErrorMessage('');
                    }
                }}
            />

            {
                attemptedSubmit && !emailUser
                &&
                <Text>Correo electrónico requerido</Text>
            }
            
            {
                logInPressed && !emailValid && emailUser.length > 0 && !validationEmail.test(emailUser)
                &&
                <Text>Correo electrónico inválido</Text>
            }

            <TextInput
                style={styles.input}
                name="password"
                placeholder="Contraseña"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={txt => {
                    setPassword(txt);
                    if (!txt && !emailUser) {
                        setLengthPasswordValid(false);
                    } else {
                        setLengthPasswordValid(true);
                    }
                }}
                secureTextEntry={true}
            />

            {
                attemptedSubmit && !password
                && 
                <Text>Por favor, rellene el campo de contraseña</Text>
            }

            {
                attemptedSubmit && password && password.length < 8
                &&
                <Text>La contraseña debe tener al menos 8 caracteres</Text>
            }

            {
                passwordValid === false && password
                ?
                <Text>Contraseña incorrecta</Text>
                :
                null
            }
            
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