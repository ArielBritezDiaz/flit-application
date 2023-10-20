import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

//Icons libraries
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default Home = ({route}) => {
    const [amountValue, setAmountValue] = useState (0);

    //Show amount icons//
    const [showAmount, setShowAmount] = useState(true);

    const navigation = useNavigation()

    //Update balance//
    const updatePrice = pr =>{
        setAmountValue(pr)
    }

    if(isNaN(amountValue)) {
        setAmountValue(0)
    }

    //Show hidden navigation tab//
    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    const [data, setData] = useState(0)

    const getDataDB = async () => {
        await fetch("http://192.168.1.50:3000/api/Home", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.ok) {
                return response.json()
            } else {
                console.log("Error en get de /api/Home")
            }
        }).then(result => {
            setData(result[0])
            return result
        }).catch(error => {
            console.error("Error en /api/Home", error)
        })
    }

    useFocusEffect(() => {
        setTimeout(() => {
            getDataDB()
            if(amountValue === 0 && amountValue != data["entered_amount"] || isNaN(amountValue)) {
                setAmountValue(data["entered_amount"])
            }
            return
        }, 200)
    })

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <View >
                <TouchableOpacity style={styles.profile} 
                onPress={()=>navigation.navigate("Profile", {
                    userName : user,
                    password
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
                        { showAmount ? `$${Number(amountValue)}` : <Entypo name="dots-three-horizontal" size={40} color="white" /> }
                    </Text>
                    <TouchableOpacity onPress={() => setShowAmount(!showAmount)} >
                        <Entypo
                            name={showAmount ? 'eye' : 'eye-with-line'}
                            size={40}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.icons}>
                    <View style={styles.gain}>
                    <TouchableOpacity onPress={() => navigation.navigate("Gain", {amountValue, updatePrice})}
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
    balance:{
        marginTop: 100,
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