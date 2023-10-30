import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { API_KEY, API_URL, EXPO_IP_HOST, EXPO_PORT } from "@env";
import hat from 'hat';

export default Register = () =>{
    const [user,setUser] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [tokenFocus, setTokenFocus] = useState(false);

    const navigation = useNavigation();

    const newUserDB = async (email) => {
        try {
            const validationEmail = async (email) => {
                try {
                    const token = hat()

                    const data = {
                        user,
                        email,
                        password,
                        token
                    }

                    // const response = await fetch(apiUrl + "?api_key=" + apiKey + "&email=" + email, {
                    //     method: "GET"
                    // })
                    // const dataValidation = await response.json()
                    // console.log("dataValidation", dataValidation)
                    
                    // if (dataValidation && dataValidation.is_valid_format.value === true && dataValidation.is_smtp_valid.value === true) {
                        const response = await fetch(`http://${EXPO_IP_HOST}:${EXPO_PORT}/api/newUser`, {
                            method: "POST",
                            headers: {
                                'Content-Type': "application/json"
                            },
                            body: JSON.stringify(data)
                        });

                        if (!response.ok) {
                            throw new Error("La respuesta de la red no fue satisfactoria");
                        }
                        
                        const result = await response.json();

                        navigation.navigate(result.navigation, {
                            user: result.user,
                            email: result.email,
                            password: result.password
                        });
                    // } else {
                    //     throw new Error("Error en dataValidation")
                    // }
                } catch(error) {
                    console.log(error)
                }
            }
            validationEmail(email)
            
        } catch (error) {
            console.error("Error in newUserDB (/api/newUser)", error.message);
        }
    }

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
                placeholder="Usuario"
                name="user"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={user => {
                    setUser(user)
                }}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                name="email"
                keyboardType="email-address"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={email => {
                    setEmail(email)
                }}
            ></TextInput>
            <TextInput
                style={styles.input}
                name="password"
                placeholder="Contraseña"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={password => {
                    setPassword(password)
                }}
                secureTextEntry={true}
            ></TextInput>

            <TextInput
                style={styles.token}
                name="token"
                placeholder={tokenFocus ? "" : "Token de verificación"}
                keyboardType="ascii-capable"
                cursorColor={"#D39F00"}
                placeholderTextColor={"#f5f5fa"}
                textAlign="center"
                textAlignVertical="center"
                onFocus={() => setTokenFocus(true)}
                onBlur={() => setTokenFocus(false)}
            >
            </TextInput>

            <TouchableOpacity onPress={() => {
                newUserDB(email)
            }}>
                <Text style={styles.btnRegister}>
                    Registrarse
                </Text>
            </TouchableOpacity>
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
        marginVertical: 17,
        width:"70%",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#D39F00',
        paddingVertical:10,
        paddingHorizontal: 20,
        fontSize:18,
        color:"#f5f5fa"
    },
    token: {
        backgroundColor: "#212121",
        width: "60%",
        borderWidth: 3,
        borderColor: '#D39F00',
        paddingVertical:5,
        fontSize:15,
        color:"#f5f5fa",
        marginTop: 15
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
    btnLogin: {
        marginTop: 20,
        color: "#D39F00",
        fontWeight: "bold",
        borderBottomWidth: 1.5,
        borderColor: "#D39F00"
    }
})