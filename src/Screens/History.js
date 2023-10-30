import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity } from 'react-native';
import { SvgXml } from "react-native-svg";

import Up from '../resources/icons/up.svg'
import Down from '../resources/icons/down.svg'

export default History = ({route}) => {
    const [dataList, setDataList] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDateVisible, setModalDateVisible] = useState(false);

    const [selectedNote, setSelectedNote] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [dataCategory, setDataCategory] = useState([]);

    const [iconUpDown, setIconUpDown] = useState(null);

    const getDataHistoryDB = async () => {
        try {
            const response = await fetch("http://192.168.1.50:3000/api/History", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
    
            if (result && result.combinedRows && result.combinedRows.rows && result.combinedRows.rowsCategory) {
                const organizedData = result.combinedRows.rows.map((dato) => {
                    const correspondingCategory = result.combinedRows.rowsCategory.find(
                        (category) => category.id_category === dato.id_category
                    );

                    return {
                        id_moneyregistry: dato.id_moneyregistry,
                        entered_amount: dato.entered_amount,
                        gain_expense: dato.gain_expense,
                        note: dato.note,
                        date: dato.date,
                        hexColor: correspondingCategory.hexColor,
                        id_category: correspondingCategory.id_category,
                        image: correspondingCategory.svg,
                        nameCategory: correspondingCategory.nameCategory,
                        styles_icon: correspondingCategory.styles_icon
                    };
                });
                setDataList(organizedData.reverse());
            }
    
            if (result && result.rowsCategory) {
                setDataCategory(result.rowsCategory)
            }
        } catch (error) {
            console.error("Error desde la API:", error);
        }
    };
    
    useFocusEffect(() => {
        getDataHistoryDB()
    })

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
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
                        <View style={[styles.icon, { backgroundColor: item.hexColor }]}>
                            <SvgXml xml={item.image} width="35px" height="35px" />
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
                                                `${selectedDate
                                                .replaceAll('-', '/')
                                                .replaceAll('T', ' ')
                                                .slice(0, -8)}`
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

const styles = StyleSheet.create ({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#2f2f2f',
        paddingVertical:10,
        height:'100%',
        marginTop: 20
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
        alignItems: 'center',
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
    }
})