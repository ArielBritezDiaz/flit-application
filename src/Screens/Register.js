import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView} from 'react-native';
import { useState } from 'react';
import { useEffect } from "react";

export default Login = ({navigation}) =>{
    const [user,setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")

    const handleRegister = () => {
        navigation.navigate('HomeScreen', {
            email : email,
            name : user,
            password : password
        });
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
            <TouchableOpacity onPress={handleRegister}>
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