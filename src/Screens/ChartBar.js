import { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity, Dimensions, LogBox } from 'react-native';
import { SvgXml } from "react-native-svg";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Victory imports
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryLabel, VictoryVoronoiContainer } from "victory-native";

import { FlitTheme } from '../components/FlitTheme';

import moment from 'moment';

export default Chart = ({ navigation }) => {
    
    LogBox.ignoreAllLogs()
    
    const [id_user_return, setId_user_return] = useState(null);

    const [dataDB, setDataDB] = useState(null);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [dates, setDates] = useState(null);
    const [amount, setAmount] = useState(null);

    const data = [
        {quarter: 1, earnings: 1000},
        {quarter: 2, earnings: 3000},
        {quarter: 3, earnings: 5000},
        {quarter: 4, earnings: 7000}
    ]

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
                        `http://${EXPO_IP_HOST}:${EXPO_PORT}/api/ChartDataUser/${id_user_return}/oneMonth`,
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
                    // console.log("result", result)
                    
                    let all = []
                    await result.rows.map((registry, index) => {
                        const returnValues = {
                            counter: index + 1,
                            day: registry.rounded_day,
                            amount: parseFloat(registry.total_amount) / 1000
                        }
                        all.push(returnValues)
                        return all
                    })

                    setDataDB(all)
                }
            } catch (error) {
                console.log("Error in ChartData", error)
            }
        };

        chartData()
    }, [id_user_return])

    useEffect(() => {
        if (dataDB) {
            
            let dates = ["05", "10", "15", "20", "25", "30"]
            let amount = []
            // dates.push(dataDB.map(registry => registry.day))
            amount.push(dataDB.map(registry => `$${parseInt(registry.amount)}k`))
            // console.log(dates)
            // setDates(dates[0])
            setDates(dates)
            setAmount(amount[0])
            setDataRecieved(true)
        }
    }, [dataDB]);


    // useEffect(()=>{
    //     navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
    //     return ()=>{
    //         navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
    //     }
    // }, [])
    
    function makeLine(length) {
        let line = "";
        for (let i = 1; i <= length; i++) {
          for (let j = 1; j <= i; j++) {
            line += "*";
      
          }
      
        }
        return line + "\n";
      }

    return (
        <View style={styles.container}>
            <View style={styles.chartView}>
                {
                    dataRecieved === true
                    ?
                        <VictoryChart
                            width={390}
                            height={340}
                            theme={FlitTheme}
                            domainPadding={15}
                            style={{
                                background: FlitTheme.backgroundStyle
                            }}
                            // animate={
                            //     {
                            //         duration: 700,
                            //         onLoad: {
                            //             duration: 700
                            //         }
                            //     }
                            // }
                            // style={{
                            //     background: {
                            //         fill: "#1b1b1b"
                            //     },
                            // }}
                        >
                            <VictoryAxis
                                tickValues={dates}
                            />
                            <VictoryAxis
                                dependentAxis
                                tickFormat={(amount) => `$${amount}k`}
                            />
                            <VictoryBar
                                data={dataDB}
                                x="day"
                                y="amount"
                                labels={({ datum }) => `$${datum.amount}k`}
                                labelComponent={
                                    <VictoryTooltip
                                        centerOffset={{x: 0}}
                                        constrainToVisibleArea
                                        cornerRadius={5}
                                        flyoutHeight={40}
                                        flyoutWidth={75}
                                        flyoutStyle={{
                                            fillOpacity: 0.9,
                                            stroke: "#f5f5fa",
                                            // 040881
                                            strokeWidth: 1,
                                            fill: "#0f0c0c"
                                        }}
                                        style={{
                                            fill: "#D0D032",
                                            fontSize: 15
                                        }}
                                        pointerLength={10}
                                    />
                                }
                                // style={{
                                //     data: {
                                //         fill: "#F0F054"
                                //     }
                                // }}
                                animate={{
                                    duration: 2000,
                                    onLoad: {
                                        duration: 1000
                                    }
                                }}
                                // barRatio={.4}
                                // barWidth={({ index }) => index * 2 + 10}
                                cornerRadius={{ top: 5, bottom: 5}}
                            />
                        </VictoryChart>
                    :
                        null
                }
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2f2f2f'
    },
    chartView: {
        backgroundColor: "#1F1B18"
    }
})










    // import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'
    // const [dataChart, setDataChart] = useState([]);

    // const isFocused = useIsFocused();

    // const [enteredAmountValues, setEnteredAmountValues] = useState([]);

    // const screenWidth = Dimensions.get("window").width;

        // const chartConfig = {
    //     backgroundGradientFrom: "#1E2923",
    //     backgroundGradientFromOpacity: 0,
    //     backgroundGradientTo: "#08130D",
    //     backgroundGradientToOpacity: 0.5,
    //     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //     strokeWidth: 2, // optional, default 3
    //     barPercentage: 0.5,
    //     useShadowColorFromDataset: false // optional
    // };

    // const data = {
    //     labels: ["January", "February", "March", "April", "May", "June"],
    //     datasets: [
    //       {
    //         data: enteredAmountValues, //Datos de la db
    //         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    //         strokeWidth: 2 // optional
    //       }
    //     ],
    //     legend: ["Ganancias"] // optional
    // };

    // if (result.rows && result.rows.length > 0) {
                    //     const enteredAmounts = result.rows.map((row) => Number(row.entered_amount));
                    //     setEnteredAmountValues(enteredAmounts);
                    //     console.log("enteredAmountValues", enteredAmountValues);
                    // }

                    // console.log("result date", moment(result.rows[0].date).format('YYYY/MM/DD HH:mm'))
                    
                    // const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                    // const year = moment(result.rows[0].date).format('YYYY')
                    // const monthPosition = moment(result.rows[0].date).format('MM')
                    // const monthName = monthsArray[parseInt(monthPosition) - 1]; 
                    // const day = moment(result.rows[0].date).format('DD')
                    // const monthDay = `${monthPosition}, ${day}`
                    // const amount = result.rows[0].entered_amount

                    // console.log("year:", year)
                    // console.log("monthPosition:", monthPosition)
                    // console.log("monthName:", monthName);
                    // console.log("day:", day)
                    // console.log("monthDay:", monthDay)
                    // console.log("amount:", amount)
                    
                    // setDataChart(result.rows)
                    // const dataResult = {
                    //     labels: []
                    // }

                     {/* <LineChart
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
            </View>  */}

            // console.log("amount month 11", result.rows.map(registry => registry.entered_amount))
                    // console.log("dates", result.rows.map(registry => moment(registry.date).format('YYYY/MM/DD')))
                    
                    // console.log(result.rows.map(registry => console.log(registry.entered_amount)))
                    // quarter: index + 1,
                     // const monthPosition = moment(result.rows[0].date).format('MM')
                        // const monthName = monthsArray[parseInt(monthPosition) - 1]; 
                        // const day = moment(registry.date).format('DD')
                        // const monthDay = `${monthPosition}, ${day}`

                        // console.log(`$${parseInt(registry.entered_amount)}`)
                        // dataDB.map(registry => console.log(registry.day));
            // console.log(dataDB[0].day)
            // console.log(dates[0])
            // console.log(amount[0])