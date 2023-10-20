import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text, StatusBar, Settings} from 'react-native';

export default History = ({route}) =>{
    const [dataList, setDataList] = useState([]);
    const amountValue = route.params.amount;
    const note = route.params.valueNote;
    const category = route.params.nameCategory;
    const hexColor = route.params.hexColor;
    
    useEffect(()=>{
        setDataList([...dataList,{ amount : amountValue, note : note, category : category, hexColor: hexColor}]);
    }, [amountValue, note, category, hexColor])

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <FlatList
            data={dataList}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            renderItem={({ item }) => (
            <View style={[styles.item, { backgroundColor: item.hexColor }]}>
                <Text style={styles.cat}>
                    {`${item.category}`}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.amount}>
                        {`$${item.amount}`}
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