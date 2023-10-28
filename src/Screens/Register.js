import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

export default Register = () =>{
    const [user,setUser] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const newUserDB = async () => {
        try {
            const data = {
                user,
                email,
                password
            }

            const response = await fetch("http://192.168.16.247:3000/api/newUser", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const result = await response.json();
            console.log("result", result)
            navigation.navigate(result.navigation, {
                name: result.user,
                email: result.email,
                password: result.password
            })
            
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
                onChangeText={txt => {
                    setUser(txt)
                }}
            ></TextInput>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                name="email"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                onChangeText={txt => {
                    setEmail(txt)
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
            <TouchableOpacity onPress={() => newUserDB()}>
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
    btnLogin: {
        marginTop: 20,
        color: "#D39F00",
        fontWeight: "bold",
        borderBottomWidth: 1.5,
        borderColor: "#D39F00"
    }
})