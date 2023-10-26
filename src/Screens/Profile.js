import React from "react";
import { StyleSheet, View, Text, StatusBar, Image} from 'react-native';
import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default Profile = ({ route, navigation }) =>{
    const user = route.params.userName;
    const password = route.params.password;

    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <FontAwesome name="user" size={40} color="#D39F00" style={styles.user} />
            <Text style={styles.txt}>
                Usuario: {user}
            </Text>
            <Text style={styles.txt}>
                Contraseña: {password}
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
    user:{
        marginVertical: 20
    },
    txt:{
        fontSize:30,
        color:'#f5f5fa'
    }
})