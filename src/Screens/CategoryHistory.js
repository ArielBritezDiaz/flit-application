import { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity } from 'react-native';
import { SvgXml } from "react-native-svg";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

import Up from '../resources/icons/up.svg'
import Down from '../resources/icons/down.svg'

export default CategoryHistory = ({ route, navigation }) => {
    const [id_user_return, setId_user_return] = useState(null);

    const [id_category, setId_Category] = useState(null);
    const categoryRecovery = route.params.id_category;

    const isFocused = useIsFocused();

    const [dataList, setDataList] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDateVisible, setModalDateVisible] = useState(false);

    const [selectedNote, setSelectedNote] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [dataCategory, setDataCategory] = useState([]);

    const [iconUpDown, setIconUpDown] = useState(null);

    const [counterIdRegistry, setCounterIdRegistry] = useState(0);

    const [isDataAvailable, setIsDataAvailable] = useState(false);

    const [maxEnteredAmount, setMaxEnteredAmount] = useState(0);
    const [lowestEnteredAmount, setLowestEnteredAmount] = useState(0);

    const addDots = (nStr) => {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2'); // changed comma to dot here
        }
        return x1 + x2;
    }

    useEffect(() => {
        const saveData = async () => {
            try {
                const id_user_save = await AsyncStorage.getItem('id_user_save')
                const parse_id_user_save = JSON.parse(id_user_save)
                setId_user_return(parse_id_user_save)
            } catch (error) {
                console.error("Error in saveData", error)
            }
        };
        saveData()
    }, [isFocused])

    useEffect(() => {
        setId_Category(categoryRecovery)
        const getCategoryHistory = async () => {
            try {
                if (id_user_return) {
                    // console.log("id_user_return", id_user_return);
                    const response = await fetch(
                        `http://${EXPO_IP_HOST}:${EXPO_PORT}/api/CategoryHistory/${id_user_return}/${id_category}/oneMonth`,
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
                    // console.log(result)

                    if (result && result.combinedRows && result.combinedRows.rows && result.combinedRows.rowsCategory) {
                        let a = 0
                        let b = 0

                        const organizedData = result.combinedRows.rows.map((dato, index) => {
                            const correspondingCategory = result.combinedRows.rowsCategory.find(
                                (category) => category.id_category === dato.id_category
                            )
                            const dateFormatted = moment(dato.date).format('YYYY/MM/DD HH:mm')

                            if (dato.gain_expense === "gain") {
                                const parsedEnteredAmount = parseFloat(dato.entered_amount)
                                if (parsedEnteredAmount > maxEnteredAmount) {
                                    a = parsedEnteredAmount
                                }
                            }
                            if(dato.gain_expense === "expense") {
                                const parsedLowestEnteredAmount = parseFloat(dato.entered_amount);
                                if (parsedLowestEnteredAmount > lowestEnteredAmount) {
                                    b = parsedLowestEnteredAmount
                                }
                            }

                            setMaxEnteredAmount(a)
                            setLowestEnteredAmount(b)

                            return {
                                id_moneyregistry: (counterIdRegistry + index) + 1,
                                entered_amount: dato.entered_amount,
                                gain_expense: dato.gain_expense,
                                note: dato.note,
                                date: dateFormatted,
                                hexColor: correspondingCategory.hexColor,
                                id_category: correspondingCategory.id_category,
                                image: correspondingCategory.svg,
                                nameCategory: correspondingCategory.nameCategory,
                                styles_icon: correspondingCategory.styles_icon,
                                maxEnteredAmount,
                                lowestEnteredAmount
                            }
                        })

                        setDataList(organizedData.reverse())
                        // console.log("dataList[0].maxEnteredAmount", dataList[0].maxEnteredAmount)
                        // console.log("dataList[0].maxEnteredAmount", dataList[0].lowestEnteredAmount)

                        setIsDataAvailable(true)
                    }
                }
            } catch (error) {
                console.log("Error in ChartData", error)
            }
        }

        getCategoryHistory()
        
        // console.log(dataList)
    }, [id_user_return])
    
    return(
        // consejos en el home de la app
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            {
                isDataAvailable === true
                ?
                    <View style={styles.infoCharCategory}>
                        <View style={styles.infoCategorySection}>
                            <View>
                                <Text style={styles.nameCategorySvg}>
                                    {dataList[0].nameCategory}
                                </Text>
                            </View>
                            <View style={{paddingHorizontal: 5}}>
                                <Text style={styles.dataCategory}>
                                    Monto de último registro: ${addDots(parseFloat(dataList[0].entered_amount).toFixed(2))}
                                </Text>
                                <Text style={styles.dataCategory}>
                                    Ingreso más alto: ${addDots(parseFloat(dataList[0].maxEnteredAmount).toFixed(2))}
                                </Text>
                                <Text style={styles.dataCategory}>
                                    Gasto más alto: ${addDots(parseFloat(dataList[0].lowestEnteredAmount).toFixed(2))}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.svgCategorySection}>
                            <View style={[styles.svgViewCategory, { backgroundColor: dataList[0].hexColor }]}>
                                <SvgXml xml={dataList[0].image} width="90px" height="90px" />
                            </View>
                        </View>
                    </View>
                :
                    null
            }
            
            <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            renderItem={({ item }) => (
                <View style={[styles.item]}>
                    <View style={styles.cat}>
                        <View style={[styles.catView, {alignItems: "center"}]}>
                            <Text style={styles.catText}>
                                {`$${Number(item.entered_amount)}`}
                            </Text>
                            <View style={{marginTop: 6}}>
                                {(() => {
                                    if (item.gain_expense === "gain") {
                                        return <Up marginLeft={5} width={25} height={25} />;
                                    } else if (item.gain_expense === "expense") {
                                        return <Down marginLeft={5} width={25} height={25} />;
                                    }
                                })()}
                            </View>
                        </View>
                    </View>
            
                    <View style={styles.catBottom}>
                        <View style={styles.details}>
                            <View style={styles.notes}>
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => setModalVisible(!modalVisible)}
                                >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.notesInput}>
                                            {selectedNote !== '' ? selectedNote : '-'}
                                        </Text>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Text style={styles.btnHide}>
                                                Salir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity onPress={() => {
                                setSelectedNote(item.note);
                                setModalVisible(true);
                            }}>
                                <Text style={styles.notestxt}>
                                    Ver nota
                                </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.notes}>
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalDateVisible}
                                    onRequestClose={() => setModalDateVisible(!modalDateVisible)}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Text style={styles.dateInput}>
                                            {
                                                `${selectedDate}`
                                            }
                                            </Text>
                                            <TouchableOpacity onPress={() => setModalDateVisible(false)}>
                                                <Text style={styles.btnHide}>
                                                    Salir
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            <TouchableOpacity onPress={() => {
                                setSelectedDate(item.date);
                                setModalDateVisible(true);
                            }}>
                                <Text style={styles.notestxt}>
                                    Fecha
                                </Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.number}>
                            {`${item.id_moneyregistry}`}
                        </Text>
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#0f0c0c",
        paddingVertical:10,
        height:'100%'
    },
    infoCharCategory: {
        height: 150,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: "#0f0c0c"
        // borderWidth: 1,
        // borderColor: "#fff",
    },
    list:{
        width:'90%'
    },
    item:{
        backgroundColor: "#1F1B18",
        marginVertical:10,
        padding:10,
        borderRadius:10,
        shadowColor: '#232323',
        shadowOffset: {
        width: 1,
        height: 0,
        },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
    },
    number:{
        textTransform:'uppercase',
        fontSize:20,
        color:'#f5f5fa',
        textAlign:'right',
        marginRight: 15
    },
    cat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#f5f5fa',
        paddingBottom: 10
    },
    catView: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    catBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    catText: {
        fontSize: 25,
        color: '#f5f5fa',
        paddingTop: 5,
        textAlign: 'left'
    },
    details:{
        paddingVertical:10,
        flexDirection:'row'
    },
    amount:{
        fontSize:20,
        color:'#f5f5fa',
        paddingHorizontal: 5,
        borderRightWidth:2,
        borderColor:'#f5f5fa',
        textAlignVertical:'center'
    },
    note:{
        fontSize:15,
        color:'#f5f5fa',
        paddingHorizontal:10,
        textAlignVertical:'center'
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    notes: {
        justifyContent: "center",
        alignItems: "center",
        color:'#f5f5fa',
        fontSize:20
    },
    notesInput:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        color:'#f5f5fa',
        borderBottomWidth:1.5,
        borderColor:'#d39f00',
        width:250,
        paddingVertical:10
    },
    dateInput: {
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        color:'#f5f5fa',
        borderBottomWidth:1.5,
        borderColor:'#d39f00',
        width:250,
        paddingVertical:10
    },
    notestxt:{
        color:'#f5f5fa',
        backgroundColor: "#2C2520",
        paddingVertical:5,
        paddingHorizontal:5,
        fontSize:15,
        borderRadius:5
    },
    centeredView: {
        flex: 1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        backgroundColor:'rgba(0, 0, 0, 0.1)'
    },
    modalView: {
        height:310,
        width:'90%',
        backgroundColor: '#2f2f2f',
        borderRadius: 10,
        padding: 100,
        alignItems: 'center',
        shadowColor: '#0f0c0c',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 100,
        elevation: 10,
    },
    btnHide:{
        textAlign:'center',
        textAlignVertical:'center',
        color:'#0f0c0c',
        backgroundColor:'#d39f00',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:30,
        marginTop:40,
        fontSize:16,
        fontWeight:'bold'
    },
    infoCategorySection: {
        width: "60%"
    },
    svgViewCategory: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 120,
        height: 120,
        padding: 20,
        margin: 10
    },
    svgCategorySection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
        // borderWidth: 2,
        // borderColor: '#f00'
    },
    nameCategorySvg: {
        color: "#F5F5FA",
        fontSize: 40,
        padding: 5
    },
    dataCategory: {
        color: "#F5F5FA"
    }
})