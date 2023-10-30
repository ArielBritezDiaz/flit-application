import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

//Icons libraries
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//SVG Icons
import AutralianSymbol from '../resources/icons/norfolk-island-australian-dolar-svgrepo-com.svg';
import ConfigurationSymbol from '../resources/icons/data-explorationenvironment-configuration-svgrepo-com.svg';

import { EXPO_IP_HOST, EXPO_PORT } from '@env';

export default Home = ({route}) => {
    const [amountValue, setAmountValue] = useState (null);

    const [showAmount, setShowAmount] = useState(true);

    const user = route.params?.user || "";

    const navigation = useNavigation();

    const updatePrice = pr =>{
        setAmountValue(pr)
    }

    if(isNaN(amountValue)) {
        setAmountValue(0)
    }

    const [data, setData] = useState(null)

    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])


    const getDataDB = async () => {
        try {
            const response = await fetch(`http://${EXPO_IP_HOST}:${EXPO_PORT}/api/Home`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                console.log("Error en get de /api/Home", response);
                setAmountValue(0);
                return;
            }
    
            const result = await response.json();
    
            if (result && result.length > 0 && result[0]["total_amount"]) {
                setData(result[0]);
                setAmountValue(result[0]["total_amount"]);
            } else {
                setAmountValue(0);
            }
        } catch (error) {
            console.error("Error en /api/Home", error);
        }
    };
    

    useEffect(() => {
        if (amountValue === null) {
          getDataDB();
        }
      }, []);

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <View style={styles.profileSection}>
                <View style={styles.svgProfileSection}>
                    <AutralianSymbol height={"100%"} width={35} style={styles.svgSymbol} />
                </View>
                <View style={styles.informationProfileSection}>
                    <Text style={styles.nameProfileSection}>
                        {user}
                    </Text>
                </View>
                <View>
                    <ConfigurationSymbol height={"100%"} width={35} style={styles.svgSymbol} />
                </View>
            </View>
            <View style={styles.balance}>
                <View style={styles.balanceTotal}>
                    <Text style={styles.totalTxt}>
                        Balance total
                    </Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.totalContent}>
                        { showAmount ? `$${Number(amountValue)}` : <Entypo name="dots-three-horizontal" size={40} color="#f5f5fa" /> }
                    </Text>
                    <TouchableOpacity onPress={() => setShowAmount(!showAmount)} >
                        <Entypo
                            name={showAmount ? 'eye' : 'eye-with-line'}
                            size={40}
                            color="#D39F00"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.icons}>
                    <View style={styles.gain}>
                        <TouchableOpacity
                            onPress={() =>{
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
    profileSection: {
        height: 45,
        width: "90%",
        marginTop: 30,
        backgroundColor: "#D39F00",
        flexDirection: "row",
        borderTopStartRadius: 5,
        borderTopEndRadius: 5
    },
    svgProfileSection: {
        height: "100%",
        width:"13%",
        marginLeft: 5
    },
    svgSymbol: {
        marginLeft: 4
    },
    informationProfileSection: {
        height: "100%",
        width: "72%",
        justifyContent: "center"
    },
    nameProfileSection: {
        fontSize: 20,
        color: "#0f0c0c",
        marginBottom: 5,
        fontWeight: "bold"
    },
    balance:{
        marginTop: 20,
        width:'90%',
        height:'25%',
        backgroundColor:'#1F1B18',
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
        color: '#0f0c0c',
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