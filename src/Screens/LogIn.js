import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView } from 'react-native';
import { EXPO_IP_HOST, EXPO_PORT } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage';

// import saveIdUser from "../components/saveIdUser";

export default LogIn = ({navigation}) => {

    const [emailUser, setEmailUser] = useState("")
    const [password, setPassword] = useState("");

    const [isCompleteEmailInput, setIsCompleteEmailInput] = useState(null);
    const [isCompletePasswordInput, setIsCompletePasswordInput] = useState(null);
    const [isPasswordValidInput, setIsPasswordValidInput] = useState(null);

    const [id_user_save, setIdUserSave] = useState(null);

    const validationEmail = useMemo(
        () => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        []
    );
    
    const handleLogIn = async () => {
        try {
            if(validationEmail.test(emailUser) && (emailUser.length >= 5 && emailUser.length <= 100)) {
                if(password.length >= 8) {
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
                        setIsPasswordValidInput(false)
                        throw new Error("Response !ok in handleLogIn")
                    }
        
                    const result = await response.json()
                    console.log("resultLogIn", result)
        
                    if (result.data[0].isValidToken === 1) {
                        setIdUserSave(result.data[0].id_user);
                        AsyncStorage.removeItem('id_user_save');
                        AsyncStorage.setItem('id_user_save', JSON.stringify(result.data[0].id_user));
                        navigation.navigate('TabNavigationScreen', {
                            id_user: result.data[0].id_user
                        });
                    }
                } else {
                    setIsCompletePasswordInput(false)
                }
            } else {
                setIsCompleteEmailInput(false)
            }
        } catch(error) {
            console.log("Error in handleLogIn", error)
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem('id_user_save', JSON.stringify(id_user_save));
            } catch (error) {
                console.error("Error al guardar los datos:", error);
            }
        };
        saveData();
    }, [id_user_save]);

    useEffect(() => {
        if (isCompletePasswordInput === false) {
          setIsPasswordValidInput(true);
        }
      }, [isCompletePasswordInput]);

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <Image source={require('../assets/logo.png')} style={styles.img}></Image>
            <View style={styles.viewInputs}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    name="email"
                    keyboardType="email-address"
                    cursorColor={'#D39F00'}
                    placeholderTextColor={"#D39F00"}
                    onChangeText={txt => {
                        setEmailUser(txt);
                        setIsCompleteEmailInput(true)
                        setIsCompletePasswordInput(true)
                    }}
                />

                {
                    isCompleteEmailInput === false
                    ?
                        <Text>Ingrese un correo electrónico válido</Text>
                    :
                        null
                }
            </View>

            <View style={styles.viewInputs}>
                <TextInput
                    style={styles.input}
                    name="password"
                    placeholder="Contraseña"
                    keyboardType="default"
                    cursorColor={'#D39F00'}
                    placeholderTextColor={"#D39F00"}
                    onChangeText={txt => {
                        setPassword(txt);
                        setIsCompleteEmailInput(true)
                        setIsCompletePasswordInput(true)
                        setIsPasswordValidInput(true)
                    }}
                    secureTextEntry={true}
                />

                {
                    isCompletePasswordInput === false
                    ?
                        <Text>
                            Ingrese una contraseña válida (Min. 8 caracteres)
                        </Text>
                    :
                        null
                }

                {
                    isPasswordValidInput === false
                    ?
                        <Text>Contraseña incorrecta</Text>
                    :
                        null
                }
            </View>
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
    viewInputs: {
        marginVertical: 23,
        paddingVertical:10,
        paddingHorizontal: 20,
    },
    input:{
        backgroundColor: "#1F1B18",
        width:"70%",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#D39F00',
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