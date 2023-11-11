import React, { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SvgXml } from "react-native-svg";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native'

// Victory imports
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryLabel, VictoryPie, VictoryContainer } from "victory-native";

import Arrow from '../resources/icons/arrow.svg'

export default Chart = ({ navigation }) => {

    LogBox.ignoreAllLogs()

    const [id_user_return, setId_user_return] = useState(null);

    const [dataDB, setDataDB] = useState(null);
    const [dataRecieved, setDataRecieved] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [dataReversed, setDataReversed] = useState(null);

    const [dataToRegistry, setDataToRegistry] = useState(null);

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
                        `http://${EXPO_IP_HOST}:${EXPO_PORT}/api/ChartDataCategories/${id_user_return}/oneMonth`, {
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
                        const organizedData = result.combinedRows.rows.filter((registry) => registry.total_amount > 0).map((registry, index) => {
                                const correspondingCategory = result.combinedRows.rowsCategory.find((category) => category.id_category === registry.id_category)
                                // .filter((registry) => registry.total_amount >= 0)
                                
                                return {
                                    x: index + 1,
                                    y: registry.percentage_usage,
                                    amount: registry.total_amount,
                                    amountFormatted: addDots(parseFloat(registry.total_amount).toFixed(2)),
                                    hexColor: correspondingCategory.hexColor,
                                    id_category: correspondingCategory.id_category,
                                    image: correspondingCategory.svg,
                                    nameCategory: correspondingCategory.nameCategory,
                                    styles_icon: correspondingCategory.styles_icon,
                                }
                            })
                        setDataDB(organizedData)

                        const organizedDataToChart = result.combinedRows.rows.map((registry, index) => {
                            const correspondingCategory = result.combinedRows.rowsCategory.find((category) => category.id_category === registry.id_category)

                            return {
                                amount: registry.total_amount,
                                amountFormatted: addDots(parseFloat(registry.total_amount).toFixed(2)),
                                hexColor: correspondingCategory.hexColor,
                                id_category: correspondingCategory.id_category,
                                image: correspondingCategory.svg,
                                nameCategory: correspondingCategory.nameCategory
                            }
                        })

                        setDataToRegistry(organizedDataToChart)
                    }
                }
            } catch (error) {
                console.log("Error in ChartData", error)
            }
        }

        chartData()
    }, [id_user_return])

    useEffect(() => {
        if (dataDB && dataToRegistry) {
            let percentages = []
            let amount = []
            percentages.push(dataToRegistry.map(registry => registry.percentage_usage))
            amount.push(dataToRegistry.map(registry => `$${parseInt(registry.amountFormatted)}k`))

            const dataReversedCopy = dataToRegistry.slice().reverse()
            setDataReversed(dataReversedCopy)
            // console.log(dataDB[2].y)

            setDataRecieved(true)
            // console.log("dataDB", dataDB)
        }
    }, [dataDB, dataToRegistry])


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

    const infoCategory = (id_category) => {
        navigation.navigate('CategoryHistory', {
            id_category
        })
    }

    return (
        <ScrollView style={styles.container} vertical={true} horizontal={false} showsHorizontalScrollIndicator={false}>
            <View style={[styles.container, { marginTop: 30 }]}>
            <StatusBar hidden={false} translucent={true} style="light" backgroundColor='#2f2f2f'/>
                <View style={styles.containerChart}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            Gráfico por categorías
                        </Text>
                    </View>
                    <View style={styles.chart}>
                        <TouchableOpacity
                        activeOpacity={1}
                        onPress={handleChartPress}
                        >
                        {dataRecieved && (
                            <View>
                            <VictoryPie
                                data={dataDB}
                                style={{
                                    data: { 
                                        fill: ({ datum }) => datum.hexColor,
                                        cornerRadius: ({ datum }) => datum.usage_rank
                                    },
                                    labels: {
                                        fill: "#f5f5fa"
                                    }
                                }}
                                innerRadius={66}
                                labelRadius={170}
                                labels={({ datum }) => `%${datum.y}`}
                                labelComponent={<VictoryLabel />}
                                events={[
                                    {
                                        target: "data",
                                        eventHandlers: {
                                            onClick: () => {
                                                return [{
                                                    target: "data",
                                                    mutation: ({style}) => {
                                                        return style.fill === "#F00"
                                                        ?
                                                            null
                                                        :
                                                            {
                                                                style: {
                                                                    fill: "#0f0c0c"
                                                                }
                                                            }
                                                    }
                                                }]
                                            },
                                            onPressIn: () => {
                                                return [
                                                    {
                                                        target: "labels",
                                                        mutation: (props) => {
                                                            handleItemClick(props.datum.id_category)
                                                        },
                                                    },
                                                ];
                                            },
                                        },
                                    },
                                ]}
                            />
                            {
                                selectedItem
                                &&
                                dataDB.map((item) => {
                                    if (item.id_category === selectedItem) {
                                        return (
                                            <View
                                                key={item.id_category}
                                                style={[ styles.circle, {backgroundColor: item.hexColor}]}
                                            >
                                                <SvgXml xml={item.image} width="50px" height="50px" />
                                                <Text style={styles.textCategory}>{item.nameCategory}</Text>
                                            </View>
                                        );
                                    }
                                })
                            }
                            </View>
                        )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerRegistry}>
                    <View style={styles.titleRegistryView}>
                        <Text style={styles.titleRegistry}>
                            Registros
                        </Text>
                    </View>
                    <ScrollView vertical={true} horizontal={false} showsHorizontalScrollIndicator={false}>
                        <View style={styles.data}>
                            <FlatList
                                data={dataReversed}
                                showsVerticalScrollIndicator={false}
                                style={styles.list}
                                renderItem={({item}) => (
                                    <View style={styles.containerItems}>
                                        <View style={[styles.item]}>
                                            <View style={styles.cat}>
                                                <View style={[styles.catView, {alignItems: "flex-start", justifyContent: "center"}]}>
                                                    <Text style={styles.textAmount}>
                                                        Balance:
                                                        {
                                                            item.amount > 0
                                                            ?
                                                                <Text style={{color: "#23E41D"}}> Positivo</Text>
                                                            :
                                                                item.amount < 0
                                                                ?
                                                                <Text style={{color: "#EA2818"}}> Negativo</Text>
                                                                :
                                                                <Text style={{color: "#A2A2A2"}}> Neutro</Text>
                                                        }
                                                    </Text>
                                                    <Text style={styles.textAmount}>
                                                        Total:
                                                        {
                                                            item.amount > 0
                                                            ?
                                                                <>
                                                                    <Text style={{color: "#23E41D"}}> +</Text>
                                                                    ${item.amountFormatted}
                                                                </>
                                                            :
                                                                item.amount < 0
                                                                ?
                                                                    <>
                                                                        <Text style={{color: "#EA2818"}}> -</Text>
                                                                        ${(item.amountFormatted).split("-").join("")}
                                                                    </>
                                                                :
                                                                    <>
                                                                        <Text> </Text>
                                                                        ${(item.amountFormatted).split("-").join("")}
                                                                    </>
                                                        }
                                                    </Text>
                                                </View>
                                                <View style={styles.iconView}>
                                                    <View style={[styles.icon, {backgroundColor: item.hexColor}]}>
                                                        <SvgXml xml={item.image} width={"30px"} height={"30px"} />
                                                    </View>
                                                    <Text style={styles.textCategory}>
                                                        {item.nameCategory}
                                                    </Text>
                                                </View>
                                                <View style={styles.catBottom}>
                                                    <View style={styles.iconViewArrow}>
                                                        <TouchableOpacity onPress={() => infoCategory(item.id_category)}>
                                                            <View style={styles.iconArrow}>
                                                                <Arrow width={"35px"} height={"35px"} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:'100%',
        backgroundColor: "#1b1b1b"
    },
    circle: {
        width: 136,
        height: 136,
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
        color: '#f5f5fa',
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconArrow: {
        width: 60,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: "#F5F5FA"
    },
    textCategory: {
        color: "#F5F5FA",
        marginTop: 5
    },
    containerChart: {
        backgroundColor: "#1b1b1b"
    },
    chart: {
        width: "100%",
        // borderWidth: 2,
        // borderColor: "#F00",
        justifyContent: "top"
    },
    containerRegistry: {
        backgroundColor: "#171111"
    },
    data: {
        width: "95%",
        // borderWidth: 2,
        // borderColor: "#F39",
        alignSelf: "center",
        marginBottom: 10
    },
    list:{
        width:'100%'
    },
    item:{
        // backgroundColor: "#1F1B18",
        padding:10,
        borderBottomWidth: 2,
        borderColor: "#F5F5FA",
        borderRadius: 3
    },
    textAmount: {
        color: "#F5F5FA",
        fontSize: 20,
        paddingVertical: 3
    },
    catView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    cat: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center'
    },
    titleView: {
        width: "100%",
        alignContent: "flex-start",
        marginLeft: 20,
        marginVertical: 10
    },
    title: {
        color: "#F5F5FA",
        fontSize: 30
    },
    titleRegistryView: {
        width: "100%",
        alignContent: "flex-start",
        marginLeft: 20,
        marginVertical: 10
    },
    titleRegistry: {
        color: "#F5F5FA",
        fontSize: 25
    },
    iconView: {
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    iconViewArrow: {
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        // borderWidth: 2,
        // borderColor: "#F5F5FA",
        width: 60
    },
    catBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})