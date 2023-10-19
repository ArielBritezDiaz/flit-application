import { useNavigationState } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';

export default ConfirmationScreen = ( { route, navigation } ) => {
    //Variables
    const valueNote = route.params.note;
    const imageValue = route.params.image;
    const amount = route.params.amo;
    const hexColor = route.params.hexColor.backgroundColor
    const nameCategory = route.params.nameCategory
    // console.log(`valueNote typeof: ${typeof(valueNote)} \n Contenido de valueNote: ${valueNote}`)

    //Server variables
    const navigationState = useNavigationState(state => state)
    console.log(navigationState.routes[navigationState.index].name)

    //Functions
    function NoteEmpty({valueNote}) {
        if(valueNote === "") {
            return null
        }
        return <Text style={styles.note}>{valueNote}</Text>
    }

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" />
            <Text style={styles.price}>
                ${amount}
            </Text>
            
            <NoteEmpty valueNote={valueNote}></NoteEmpty>
            
            <Text style={[styles.icon, {backgroundColor: hexColor}]}>
                {imageValue}
            </Text>
            <Text style={[styles.textIcon]}>
                {nameCategory}
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
        elevation:30
    },
    touchable:{
        position:'relative',
        top:100
    }
})