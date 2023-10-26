import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings} from 'react-native';
import { SvgXml } from "react-native-svg";

import Up from '../resources/icons/up.svg'
import Down from '../resources/icons/down.svg'

export default History = ({route}) =>{
    const [dataList, setDataList] = useState([]);
        

    const [dataCategory, setDataCategory] = useState([])

    const [iconUpDown, setIconUpDown] = useState(null)

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
                    
                    // if(dato.gain_expense === "gain") {
                    //     setIconUpDown(Up)
                    // } else if(dato.gain_expense === "expense") {
                    //     setIconUpDown(Down)
                    // }

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
                // console.log("result.combinedRows", result.combinedRows.rows)
                // console.log(result.rowsCategory[0].hexColor)
                // console.log("organizedData", organizedData)
            }
    
            if (result && result.rowsCategory) {
                setDataCategory(result.rowsCategory)
                // console.log("dataCategory", dataCategory)
            }
        } catch (error) {
            console.error("Error desde la API:", error);
        }
    };
    
    useFocusEffect(() => {
        getDataHistoryDB()
        // console.log("dataList", dataList)
        // console.log("dataCategory", dataCategory)
    })

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            renderItem={({ item }) => (
                <View style={[styles.item, { backgroundColor: "#0f0c0c" }]}>
                    <View style={styles.cat}>
                        <View style={[styles.catView, {alignItems: "center"}]}>
                            <Text style={styles.catText}>
                                {`$${Number(item.entered_amount)}`}
                            </Text>
                            {(() => {
                                if (item.gain_expense === "gain") {
                                    return <Up width={25} height={25} />;
                                } else if (item.gain_expense === "expense") {
                                    return <Down width={25} height={25} />;
                                }
                            })()}
                        </View>
                        <View style={[styles.icon, { backgroundColor: item.hexColor }]}>
                            <SvgXml xml={item.image} width="35px" height="35px" />
                        </View>
                    </View>
            
                    <View style={styles.catBottom}>
                        <View style={styles.details}>
                            <Text style={styles.note}>
                                Ver nota
                            </Text>
                            <Text style={styles.note}>
                                {`${item.note}` !== '' ? item.note : '-'}
                            </Text>
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
        fontSize:15,
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
        alignItems: 'center'
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
        flexDirection:'row',
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
    }
})