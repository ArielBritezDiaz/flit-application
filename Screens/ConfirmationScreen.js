import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';

export default ConfirmationScreen = ( { route, navigation } ) =>{
    const valueNote = route.params.note;
    const imageValue = route.params.image;
    const amount = route.params.amo;

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" />
            <Text style={styles.price}>
                ${amount}
            </Text>
            <Text style={styles.note}>
                {valueNote}
            </Text>
            <Text style={styles.icon}>
                {imageValue}
            </Text>
            <View style={styles.btn}>
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}
                style={styles.touchable}>
                <Text style={styles.btntxt}>Confirmar</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        display:'flex',
        justifyContent:'center',
        height:'100%',
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
        flexDirection:'column'
    },
    price:{
        fontSize:80,
        color:'#d39f00',
        fontWeight:'bold'
    },
    note:{
        fontSize:30,
        color:'#d39f00',
        marginVertical:20,
        textAlign:'center'
    },
    icon:{
        elevation:30,
        backgroundColor:'#d39f00',
        padding:10,
        borderRadius:50
    },
    btntxt:{
        fontSize:25,
        fontWeight:'bold',
        backgroundColor:'#d39f00',
        color:'#2f2f2f',
        borderRadius:12,
        textAlign:'center',
        textAlignVertical:'center',
        paddingHorizontal:90,
        elevation:30
    },
    touchable:{
        position:'relative',
        top:100
    }
})