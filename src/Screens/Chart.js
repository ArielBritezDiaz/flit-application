import { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { SvgXml } from "react-native-svg";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'

export default Chart = ({ navigation }) => {
    const [dataChart, setDataChart] = useState([]);

    const isFocused = useIsFocused();

    const [enteredAmountValues, setEnteredAmountValues] = useState([]);

    const screenWidth = Dimensions.get("window").width;

    const [id_user_return, setId_user_return] = useState(null);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: enteredAmountValues, //Datos de la db
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Ganancias"] // optional
    };

    useEffect(() => {
        const saveData = async () => {
            try {
                const id_user_save = await AsyncStorage.getItem("id_user_save")
                const parse_id_user_save = JSON.parse(id_user_save)
                setId_user_return(parse_id_user_save)
            } catch (error) {
                console.error("error in saveData", error)
            }
        };
        saveData()
    }, [])

    useEffect(() => {
        const chartData = async () => {
            try {
                if (id_user_return) {
                    console.log("id_user_return", id_user_return);
                    const response = await fetch(
                        `http://${EXPO_IP_HOST}:${EXPO_PORT}/api/ChartData/${id_user_return}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )

                    if (!response.ok) {
                        console.log("Error en get de /api/ChartData", response);
                        return;
                    }

                    const result = await response.json()
                    console.log("result", result)
                    
                    if (result.rows && result.rows.length > 0) {
                        const enteredAmounts = result.rows.map((row) => Number(row.entered_amount));
                        setEnteredAmountValues(enteredAmounts);
                        console.log("enteredAmountValues", enteredAmountValues);
                    }

                    console.log("result date", moment(result.rows[0].date).format('YYYY/MM/DD HH:mm'))
                    
                    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                    const year = moment(result.rows[0].date).format('YYYY')
                    const monthPosition = moment(result.rows[0].date).format('MM')
                    const monthName = monthsArray[parseInt(monthPosition) - 1]; 
                    const day = moment(result.rows[0].date).format('DD')
                    const monthDay = `${monthPosition}, ${day}`
                    const amount = result.rows[0].entered_amount

                    console.log("year:", year)
                    console.log("monthPosition:", monthPosition)
                    console.log("monthName:", monthName);
                    console.log("day:", day)
                    console.log("monthDay:", monthDay)
                    console.log("amount:", amount)
                    
                    setDataChart(result.rows)
                    const dataResult = {
                        labels: []
                    }
                }
            } catch (error) {
                console.log("Error in ChartData", error)
            }
        };

        chartData()
    }, [id_user_return])

    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])
    // console.log("dataChart", dataChart)

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
            <View style={{height: 40, width: "90%"}}>
                {dataChart.map((item, index) => (
                    <Text key={index} style={{fontSize: 30, color: "#f5f5fa"}}>
                        {item.index}
                    </Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#2f2f2f',
        paddingVertical:10,
        height:'100%',
        marginTop: 20
    },
})