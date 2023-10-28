import { useNavigationState } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';

export default ConfirmationScreen = ( { route, navigation } ) => {
    const amount = route.params.amount;
    const note = route.params.note;
    const totalAmount = route.params.price;
    const image = route.params.image;
    const hexColor = route.params.hexColor.backgroundColor
    const nameCategory = route.params.nameCategory
    const gain_expense = route.params.gain_expense
    const iconNumberPosition = route.params.iconNumberPosition

    const amountFormatted = Number(parseFloat(amount / 1).toFixed(4))

    console.log(`Data to BackEnd:
        amountFormatted: ${amountFormatted}
        note: ${note}
        totalAmount: ${totalAmount}
        Icon values = {
            iconNumberPosition: ${iconNumberPosition}
            image: ${JSON.stringify(image)}
            hexColor: ${hexColor}
            styles.icon: ${JSON.stringify(styles.icon)}
            nameCategory: ${nameCategory}
        }
    `)

    const navigationState = useNavigationState(state => state)
    console.log(`Actual URL: /${navigationState.routes[navigationState.index].name}`)

    function NoteEmpty({note}) {
        if(note === "") {
            return null
        }
        return <Text style={styles.note}>{note}</Text>
    }

    const sendData = () => {
        const imageValues = {
            iconNumberPosition,
            image,
            hexColor,
            styles_icon: styles.icon,
            nameCategory
        }
        
        const data = {
            amountFormatted,
            note,
            totalAmount,
            image,
            hexColor,
            nameCategory,
            gain_expense,
            imageValues
        }

        fetch("http://192.168.16.247:3000/api/ConfirmationScreen", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if(response.ok) {
                navigation.navigate("HomeScreen")
            } else {
                throw new Error("Solicitud no exitosa")
            }
        }).catch(error => {
            console.error("Error en la solicitud:", error);
        })
    }

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" />
            <Text style={styles.price}>
                ${amount}
            </Text>
            
            <NoteEmpty note={note}></NoteEmpty>
            
            <Text style={[styles.icon, {backgroundColor: hexColor}]}>
                {image}
            </Text>
            <Text style={[styles.textIcon]}>
                {nameCategory}
            </Text>
            <View style={styles.btn}>
            <TouchableOpacity onPress={sendData}
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
        padding:10,
        borderRadius:50
    },
    textIcon: {
        marginTop:10,
        color: "#f5f5fa"
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
        elevation:30,
        paddingVertical: 3
    },
    touchable:{
        position:'relative',
        top:100
    }
})