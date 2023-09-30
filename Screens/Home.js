import React from "react";
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";

//Icons libraries
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
export default Home = () =>{
    const [price, setPrice] = useState (0);
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <View style={styles.balance}>
                <View style={styles.balanceTotal}>
                    <Text style={styles.totalTxt}>
                        Balance total
                    </Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.totalContent}>
                        ${price}
                    </Text>
                    <Ionicons name="eye" size={40} color="#000" style={styles.eye}/>
                </View>
                <View style={styles.icons}>
                    <View style={styles.gain}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Gain")}>
                        <MaterialCommunityIcons name="cash-plus" size={40} color="white" />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.expense}>
                        <MaterialCommunityIcons name="cash-minus" size={40} color="white" />
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
        color:'#fff',
        fontWeight:'bold',
        paddingRight: 10
    },
    icons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    gain:{
        paddingHorizontal:10,
    },
    expense:{
        paddingHorizontal:10
    }
})