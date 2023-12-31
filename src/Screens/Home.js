import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useState,useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

//Icons libraries
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

export default Home = ({ route }) =>{
    const [amountValue, setAmountValue] = useState (0);

    //Show amount icons//
    const [showAmount, setShowAmount] = useState(true);

    //Login data//
    const user = route.params?.name || "";
    const password = route.params?.password || "";

    //Navigation to profile screen//
    const navigation = useNavigation();

    //Update balance//
    const updatePrice = pr =>{
        setAmountValue(pr)
    }

    //Show hidden navigation tab//
    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <View >
                    <TouchableOpacity style={styles.profile} 
                    onPress={()=>navigation.navigate("Profile", {
                        userName : user,
                        password : password
                    })}
                    >
                        <FontAwesome name="user" size={25} color="#D39F00" style={styles.user} />
                        <Text style={styles.textProfile}>{user}</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.balance}>
                <View style={styles.balanceTotal}>
                    <Text style={styles.totalTxt}>
                        Balance total
                    </Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.totalContent}>
                        {showAmount 
                            ? `$${amountValue}` 
                            : <Entypo name="dots-three-horizontal" size={40} color="white" />
                        }
                    </Text>
                    <TouchableOpacity onPress={() => setShowAmount(!showAmount)} >
                        <Entypo
                            name={showAmount 
                            ? 'eye' 
                            : 'eye-with-line'}
                            size={40}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.icons}>
                    <View style={styles.gain}>
                    <TouchableOpacity onPress={() =>{
                    navigation.navigate("Gain", {amountValue, updatePrice});
                }}
                    >
                        <MaterialCommunityIcons name="cash-plus" size={40} color="#f5f5fa" />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.expense}>
                        <TouchableOpacity onPress={() => navigation.navigate("Expense", {amountValue, updatePrice})}>
                            <MaterialCommunityIcons name="cash-minus" size={40} color="#f5f5fa" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        height:'100%',
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
    },
    profile:{
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 5,
        flexDirection: "row",
        borderRadius: 100,
        backgroundColor: "#67645D",
        elevation: 30,
    },
    textProfile:{
        color: "#f5f5fa",
        textAlignVertical:'center',
        fontSize:15,
        fontWeight:'bold'
    },
    user:{
        paddingRight:10,
        paddingLeft:5
    },
    balance:{
        marginTop: 50,
        width:'90%',
        height:'25%',
        backgroundColor:'#2F2F2F',
        borderRadius: 5,
        alignItems: 'center',
        elevation: 4
    },
    balanceTotal:{
        width:'100%',
        height: '20%',
        backgroundColor: '#D39F00',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    totalTxt:{
        color: '#2F2F2F',
        fontWeight: "bold",
        fontSize: 20,
        textTransform: 'uppercase'
    },
    total:{
        width:'100%',
        height:'40%',
        marginTop: 10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    totalContent:{
        fontSize: 40,
        color:'#f5f5fa',
        fontWeight:'bold',
        paddingRight: 10
    },
    icons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    gain:{
        paddingHorizontal:20,
    },
    expense:{
        paddingHorizontal:20
    }
})