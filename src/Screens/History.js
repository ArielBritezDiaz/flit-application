import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings} from 'react-native';
import { SvgXml } from "react-native-svg";

export default History = ({route}) =>{
    const [dataList, setDataList] = useState([]);
        

    const [dataCategory, setDataCategory] = useState([])
    

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
                const organizedData = result.combinedRows.rows.map((dato, index) => {
                    return {
                        id_moneyregistry: dato.id_moneyregistry,
                        entered_amount: dato.entered_amount,
                        gain_expense: dato.gain_expense,
                        note: dato.note,
                        date: dato.date,
                        hexColor: result.combinedRows.rowsCategory[index].hexColor,
                        id_category: result.combinedRows.rowsCategory[index].id_category,
                        image: result.combinedRows.rowsCategory[index].svg,
                        nameCategory: result.combinedRows.rowsCategory[index].nameCategory,
                        styles_icon: result.combinedRows.rowsCategory[index].styles_icon
                    };
                });
                setDataList(organizedData);
                // console.log("result.combinedRows", result.combinedRows.rows)
                // console.log(result.rowsCategory[0].hexColor)
                // console.log("organizedData", organizedData)
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
            <View style={[styles.item, { backgroundColor: "f2f2f2" }]}>
                <Text style={styles.cat}>
                    {`${item.id_moneyregistry}`}
                </Text>
                
                <View style={[styles.icon, { backgroundColor: item.hexColor }]}>
                    <SvgXml xml={item.image} width="40px" height="40px" />
                </View>
                

                <Text style={styles.cat}>
                    {`$${Number(item.entered_amount)}`}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.amount}>
                        {`${item.gain_expense.charAt(0).toUpperCase() + item.gain_expense.slice(1)}`}
                    </Text>
                    <Text style={styles.note}>
                        {`${item.note}` !== '' ? item.note : '-'}
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
    cat:{
        textTransform:'uppercase',
        fontSize:20,
        color:'#f5f5fa',
        paddingBottom:5,
        borderBottomWidth:2,
        borderColor:'#f5f5fa',
        textAlign:'center'
    },
    details:{
        paddingVertical:10,
        flexDirection:'row',
    },
    amount:{
        fontSize:20,
        color:'#f5f5fa',
        paddingHorizontal:10,
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
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
})