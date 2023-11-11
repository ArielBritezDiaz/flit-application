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
            amount.push(dataDB.map(registry => `$${parseInt(registry.amount)}k`))
            // console.log(dates)
            // setDates(dates[0])
            setDates(dates)
            setDataRecieved(true)
        }
    }, [dataDB]);

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
                                            fill: "#2f2f2f"
                                        }}
                                        style={{
                                            fill: "#D39F00",
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
        backgroundColor: "#1F1B18",
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10
    }
})