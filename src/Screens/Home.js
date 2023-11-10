import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, VirtualizedList } from 'react-native';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Icons libraries
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//SVG Icons
import AutralianSymbol from '../resources/icons/norfolk-island-australian-dolar-svgrepo-com.svg';
import ConfigurationSymbol from '../resources/icons/data-explorationenvironment-configuration-svgrepo-com.svg';
import ExitSymbol from '../resources/icons/exit.svg';
import ChartSymbol from '../resources/icons/chart.svg';
import HistorySymbol from '../resources/icons/history2.svg';

import ChartBar from './ChartBar'

import { EXPO_IP_HOST, EXPO_PORT } from '@env';

export default Home = ({route}) => {
    const [result, setResult] = useState(null);

    const [nameUser, setNameUser] = useState("Flit")
    const [amountValue, setAmountValue] = useState(null);

    const [showAmount, setShowAmount] = useState(true);

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [isBalanceNegative, setIsBalanceNegative] = useState(false);

    const navigation = useNavigation();

    const addDots = (nStr) => {
        nStr += ''
        x = nStr.split('.')
        x1 = x[0]
        x2 = x.length > 1 ? '.' + x[1] : ''
        let rgx = /(\d+)(\d{3})/

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2')
        }
        return x1 + x2
    }

    const updatePrice = pr =>{
        setAmountValue(pr)
    }

    if(isNaN(amountValue)) {
        setAmountValue(0)
    }

    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    
    const getDataDB = async () => {
        try {
            const id_user = await AsyncStorage.getItem('id_user_save');
            console.log("id_user in Home.js", id_user);
            const response = await fetch(`http://${EXPO_IP_HOST}:${EXPO_PORT}/api/Home/${id_user}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                console.log("Error en get de /api/Home", response)
                setAmountValue(0)
                return
            }
    
            const result = await response.json()
            console.log("result at Home.js", result)
            
            if (result && result.rowsTotalAmount.length > 0 && result.rowsTotalAmount[0]["total_amount"]) {
                // setAmountValue(result.rowsTotalAmount[0]["total_amount"]);
                console.log("parseFloat(result.rowsTotalAmount[0]['total_amount'])", parseFloat(result.rowsTotalAmount[0]["total_amount"]))
                if(parseFloat(result.rowsTotalAmount[0]["total_amount"]) < 0) {
                    setIsBalanceNegative(true)
                    setAmountValue(parseFloat(result.rowsTotalAmount[0]["total_amount"]))
                } else {
                    setIsBalanceNegative(false)
                    setAmountValue(parseFloat(result.rowsTotalAmount[0]["total_amount"]))
                }
            } else {
                setAmountValue(0);
            }
    
            if (result && result.rowsNameUser.length > 0 && result.rowsNameUser[0]["user"]) {
                setNameUser(result.rowsNameUser[0]["user"])
                // console.log("nameUser from Home.js", nameUser);
            } else {
                setNameUser('Flit');
            }
            
            setIsDataLoaded(true);
    
        } catch (error) {
            console.error("Error en /api/Home", error);
        }
    };

    const exitAccount = () => {
        getDataDB()
        setNameUser('Flit')
        setAmountValue(0)
        navigation.navigate('Register', { reset: true })
    }
 
    const historySelected = () => {
        navigation.navigate('History')
    }

    const getDate = () => {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",  "Octubre", "Noviembre", "Diciembre" ]
        const date = new Date()
        const thisMonth = monthNames[date.getMonth()]
        // console.log(thisMonth)
        return thisMonth
    }
    
    useFocusEffect(() => {
        getDataDB()
    })

    useEffect(() => {
        if (isDataLoaded) {
            if (result && result.rowsNameUser && result.rowsNameUser.length > 0 && result.rowsNameUser[0]["user"]) {
                if (nameUser === "Flit") {
                    setNameUser(result.rowsNameUser[0]["user"]);
                }
            } else {
                if (nameUser === "Flit") {
                    setNameUser('Flit');
                }
            }
        }
    }, [isDataLoaded, result, nameUser]);

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <View style={styles.profileSection}>
                <View style={styles.svgProfileSection}>
                    <AutralianSymbol height={"100%"} width={35} style={styles.svgSymbol} />
                </View>
                <View style={styles.informationProfileSection}>
                    <Text style={styles.nameProfileSection}>
                        {`${nameUser}`}
                    </Text>
                </View>
                <View style={styles.exitView}>
                    <TouchableOpacity onPress={exitAccount} style={styles.exit}>
                        <ExitSymbol height={"100%"} width={35} style={styles.svgSymbol} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.balance}>
                <View style={styles.balanceTotal}>
                    <Text style={styles.totalTxt}>
                        Balance total
                    </Text>
                </View>
                <View style={styles.viewAmount}>
                    <View style={styles.historySymbolContainer}>
                        <HistorySymbol width={"35px"} height={"35px"} onPress={historySelected} style={[styles.svgSymbol, { alignSelf: "center" }]} />
                    </View>
                    <View style={styles.total}>
                        <Text style={styles.totalContent}>
                        {
                            showAmount === true
                            ?
                            isBalanceNegative === true
                                ?
                                `$0`
                                :
                                `$${addDots(parseFloat(amountValue).toFixed(2))}`
                            :
                            <Entypo name="dots-three-horizontal" size={40} color="#f5f5fa" />
                        }
                        </Text>
                        <TouchableOpacity onPress={() => setShowAmount(!showAmount)} >
                        <Entypo
                            name={showAmount ? 'eye' : 'eye-with-line'}
                            size={40}
                            color="#D39F00"
                        />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.debtView}>
                    {
                        isBalanceNegative === true
                        ?
                            <Text style={styles.debt}>
                                Deuda de:
                                <Text style={{color: "#EA2818"}}>
                                    {` ${addDots(parseFloat(amountValue).toFixed(2))}`}
                                </Text>
                            </Text>
                        :
                            null
                    }
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
            <View style={{backgroundColor: "#1F1B18", width: "90%", marginTop: 15}}>
                <View style={[styles.chart, { width: "100%", height: "25%" }]}>
                    <Text style={{color: "#0f0c0c", fontSize: 20, alignSelf: "center", fontWeight: "bold", textTransform: "uppercase"}}>
                        Gráfico de {getDate()}
                    </Text>
                </View>
                    <ChartBar />
                    {/*
                        <TouchableOpacity onPress={() => navigation.navigate("ChartBar")}>
                            <ChartSymbol height={"50%"} width={35} style={styles.svgSymbol} />
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => navigation.navigate("ChartPastel")}>
                            <Chart height={"50%"} width={35} style={styles.svgSymbol} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("ChartInterpolation")}>
                            <ChartSymbol height={"50%"} width={35} style={styles.svgSymbol} />
                        </TouchableOpacity>
                    */}
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
        marginTop: 50,
        backgroundColor: "#D39F00",
        flexDirection: "row",
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    svgProfileSection: {
        height: "100%"
    },
    svgSymbol: {
        marginHorizontal: 10
    },
    exitView: {
        height: "100%",
        width: "17%",
        justifyContent: "center"
    },
    exit: {
        borderRadius: 5,
        height: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    informationProfileSection: {
        height: "100%",
        width: "65%",
        justifyContent: "center"
    },
    nameProfileSection: {
        fontSize: 20,
        color: "#0f0c0c",
        marginBottom: 5,
        fontWeight: "bold"
    },
    balance:{
        marginTop: 15,
        width:'90%',
        height: 250,
        backgroundColor:'#1F1B18',
        borderRadius: 5,
        alignItems: 'center',
        // borderWidth: 1.5,
        // borderColor: "#f5f5fa"
    },
    balanceTotal:{
        width:'100%',
        height: '20%',
        backgroundColor: '#D39F00',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    totalTxt:{
        color: '#0f0c0c',
        fontWeight: "bold",
        fontSize: 20,
        textTransform: 'uppercase'
    },
    total:{
        width:'70%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop: 5,
        paddingHorizontal: 10,
        // borderWidth: 1.5,
        // borderColor: "#f5f5fa"
        //
    },
    historySymbolContainer: {
        marginLeft: 5,
        marginRight: 10
    },
    totalContent:{
        fontSize: 40,
        color:'#f5f5fa',
        fontWeight:'bold',
        paddingRight: 10,
    },
    debtView: {
        width: "20%"
    },
    debt: {
        color: "#F5F5FA",
        fontSize: 18,
        textAlign: "center",
        paddingBottom: 10,
        marginBottom: 10
    },
    icons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10
    },
    gain:{
        paddingHorizontal:20,
    },
    expense:{
        paddingHorizontal:20
    },
    viewAmount: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        marginTop: 5
    },
    chart: {
        width:'100%',
        height: "10%",
        backgroundColor: '#D39F00',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    }
})