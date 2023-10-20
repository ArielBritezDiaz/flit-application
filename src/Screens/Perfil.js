import React from "react";
import { StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

export default Perfil = ({ route, navigation }) =>{

    //Hide the bottom tabs navigation//
    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])
    return(
        <View style={styles.container}>
            <Feather name="user" size={40} color="black" style={styles.icon}/>
            <Text style={styles.txt}>
            Username
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        height:'100%',
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
        justifyContent:'center'
    },
    icon:{
        marginVertical: 30,
        borderRadius:50,
        backgroundColor:'#d39f00',
        padding:10
    },
    txt:{
        fontSize:30,
        color:'#f5f5fa'
    }
})