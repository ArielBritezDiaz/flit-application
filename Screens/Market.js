import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//API data component//
import CoinItem from '../components/CoinItem';

export default Market = () => {

    //Coins arrray//
    const [coin, setCoin] = useState([])

    //Searching//
    const [search, setSearch] = useState('')

    //API data function//
    const loadData = async () =>{
        const resp = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=ars&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en");
        const data = await resp.json()
        setCoin(data)
    }

    useEffect(()=>{
        loadData()
    }, [])
return(
    <View style={styles.container}>
        <StatusBar hidden={false} translucent={true} style="light" backgroundColor='#2f2f2f'/>
        <View style={styles.header}>
            <TextInput
            maxLength={30}
            placeholder='Buscar cryptomoneda'
            placeholderTextColor={'#8B8F8E'}
            selectionColor={"#D39F00"}
            cursorColor={'#D39F00'}
            autoCorrect={true}
            multiline={false}
            keyboardType="default"
            onChangeText={txt => setSearch(txt)}
            style={styles.searcher}/>
        </View>
        <FlatList
        style={styles.list}
        data={
            coin.filter((coin) => coin.name.toLowerCase().includes(search) ||//Filter by full name
            coin.symbol.toLowerCase().includes(search))//Filter by abbreviated name
        }
        renderItem={ ({item}) => {
            return <CoinItem coin={item}/>
        }}
        showsVerticalScrollIndicator={false}
        />
    </View>
)
}

const styles = StyleSheet.create ({
    container:{
        height:'100%',
        backgroundColor: '#2f2f2f', 
        alignItems:'center',
        flex:1
    },
    list:{
        width:'90%'
    },
    searcher:{
        marginTop:20,
        textAlign:'center',
        textAlignVertical:'center',
        color:'#f5f5fa',
        borderBottomWidth:2,
        borderColor:'#d39f00',
        width:'50%',
        paddingVertical:10
    },
    header:{
        width:'90%',
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:10
    }
})