import React, { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { SvgXml } from "react-native-svg";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Victory imports
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryLabel, VictoryPie } from "victory-native";

export default Chart = ({ navigation }) => {
    const [id_user_return, setId_user_return] = useState(null);

    const [dataDB, setDataDB] = useState(null);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [percentage, setPercentage] = useState(null);
    const [amount, setAmount] = useState(null);
    
    const [selectedItem, setSelectedItem] = useState(null);

    const [dataCategory, setDataCategory] = useState(null);

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
                        `http://${EXPO_IP_HOST}:${EXPO_PORT}/api/ChartDataCategories/${id_user_return}/oneMonth`,
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

                    if (result && result.combinedRows && result.combinedRows.rows && result.combinedRows.rowsCategory) {
                        const organizedData = result.combinedRows.rows.map((registry, index) => {
                            // console.log(registry)
                            const correspondingCategory = result.combinedRows.rowsCategory.find(
                                (category) => category.id_category === registry.id_category
                            )

                            return {
                                x: index + 1,
                                y: registry.percentage_usage,
                                amount: parseFloat(registry.total_amount) / 1000,
                                hexColor: correspondingCategory.hexColor,
                                id_category: correspondingCategory.id_category,
                                image: correspondingCategory.svg,
                                nameCategory: correspondingCategory.nameCategory,
                                styles_icon: correspondingCategory.styles_icon
                            }
                        })
                        setDataDB(organizedData)
                        
                        // let all = []
                        // await result.rows.map((registry, index) => {
                        //     const returnValues = {
                        //         x: index + 1,
                        //         y: registry.percentage_usage,
                        //         amount: parseFloat(registry.total_amount) / 1000,
                        //         id_category: registry.id_category
                        //     }
                        //     all.push(returnValues)
                        //     return all
                        // })

                        // setDataDB(all)
                    }
                }

                if (result && result.rowsCategory) {
                    setDataCategory(result.rowsCategory)
                }
            } catch (error) {
                console.log("Error in ChartData", error)
            }
        };

        chartData()
    }, [id_user_return])

    useEffect(() => {
        if (dataDB) {
            console.log("dataDB", dataDB)
            let percentages = []
            let amount = []
            percentages.push(dataDB.map(registry => registry.percentage_usage))
            amount.push(dataDB.map(registry => `$${parseInt(registry.amount)}k`))
            
            setPercentage(percentages[0])
            setAmount(amount[0])
            setDataRecieved(true)
        }
    }, [dataDB]);


    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    const handleItemClick = (id_category) => {
        setSelectedItem(id_category)
    }

    const handleChartPress = () => {
        setSelectedItem(null);
    };

    return (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={handleChartPress}
        >
          {dataRecieved && (
            <View>
              <VictoryPie
                data={dataDB}
                style={{ data: {fill: ({datum}) => datum.hexColor}, labels: { fill: "white" } }}
                innerRadius={90}
                labelRadius={110}
                labels={({ datum }) => `%${datum.y}`}
                labelComponent={<VictoryLabel />}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPressIn: () => {
                        return [
                          {
                            target: "labels",
                            mutation: (props) => {
                              handleItemClick(props.datum.id_category);
                            },
                          },
                        ];
                      },
                    },
                  },
                ]}
              />
              {selectedItem &&
                dataDB.map((item) => {
                  if (item.id_category === selectedItem) {
                    return (
                      <View
                        key={item.id_category}
                        style={[
                          styles.circle,
                          { backgroundColor: item.hexColor },
                        ]}
                      >
                        <SvgXml xml={item.image} width="50px" height="50px" />
                        <Text style={styles.textCategory}>{item.nameCategory}</Text>
                      </View>
                    );
                  }
                })}
            </View>
          )}
        </TouchableOpacity>
      );
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
    circle: {
        width: 130,
        height: 130,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '46%',
        left: '46%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 1
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    textCategory: {
        color: "#F5F5FA"
    }
})