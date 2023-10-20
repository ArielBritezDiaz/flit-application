import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings} from 'react-native';

export default History = ({route}) =>{
    const [dataList, setDataList] = useState([]);

    const [data, setData] = useState([])
    const [dataOrganized, setDataOrganized] = useState([])

    const getDataHistoryDB = async () => {
        const response = await fetch("http://192.168.1.50:3000/api/History", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        setData(result)
    }

    useEffect(() => {
        getDataHistoryDB()
    }, [])

    setTimeout(() => {
        setDataOrganized(data.map((dato) => {
            return {
                id_moneyregistry: dato.id_moneyregistry,
                entered_amount: dato.entered_amount,
                gain_expense: dato.gain_expense,
                note: dato.note,
                date: dato.date
            }
        }))
        setDataList(dataOrganized)
    }, 300)
    
    useEffect(() => {
        console.log("Data content", data)
    }, [])
    

    const amountValue = 0;
    const note = 'y';
    const category = 'i';
    const hexColor = '#000';

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
                <Text style={styles.cat}>
                    {`${item.id_moneyregistry}`}
                </Text>
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
    }
})