import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image} from 'react-native';
import { useState } from 'react';

export default Login = () =>{
    const [user,setUser] = useState("");
    const [password, setPassword] = useState("");

    return(
        <View style={styles.container}>
             <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            {/* Logo */}
            <Image source={require('../assets/logo.png')} style={styles.img}></Image>
            {/* Username input */}
            <TextInput
            style={styles.input}
            placeholder="Usuario"
            name="user"
            minLength= {8}
            keyboardType="default"
            cursorColor={'#D39F00'}
            placeholderTextColor={"#D39F00"}
            onChangeText={txt => {
                setUser(txt)
            }}
            ></TextInput>
            {/* Password input */}
            <TextInput
            style={styles.input}
            name="password"
            placeholder="Contraseña"
            minLength= {8}
            keyboardType="default"
            cursorColor={'#D39F00'}
            placeholderTextColor={"#D39F00"}
            onChangeText={txt => {
                setPassword(txt)
            }}
            ></TextInput>
            <TouchableOpacity>
                <Text style={styles.btn}>
                    Iniciar sesion
                </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.signUp}>
                    Registrarse
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        height:'100%',
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
    },
    img:{
        width:200,
        height: 200,
        marginVertical: 70
    },
    input:{
        marginVertical: 20,
        width:"70%",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#D39F00',
        paddingVertical:10,
        paddingHorizontal: 20,
        fontSize:18,
        color:"#D39F00",
        fontWeight:'bold',
        elevation:30
    },
    btn:{
        marginVertical:30,
        color:'#2f2f2f',
        backgroundColor:'#D39F00',
        borderRadius: 12,
        fontSize:18,
        paddingHorizontal: 50,
        paddingVertical:10,
        elevation:30,
        fontWeight:'bold'
    },
    signUp:{
        color:'#d39f00',
        fontSize:15,
        marginTop: 10
    }
})