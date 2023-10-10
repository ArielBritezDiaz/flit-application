import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default CoinItem = ({coin}) => {
return (
    <View style={styles.containerItem}>
        <View style={styles.coinData}>
            <Image
            style={styles.image}
            source={{ uri : coin.image }}
            />
            <View style={styles.containerNames}>
                <Text style={styles.name}>
                    {coin.name}
                </Text>
                <Text style={styles.symbol}>
                    {coin.symbol}
                </Text>
            </View>
        </View>
        <View style={styles.containerPrices}>
            <Text style={styles.price}>
                ${coin.current_price}
            </Text>
            <Text
            style={[styles.percentage, coin.price_change_percentage_24h > 0 
            ? styles.priceUp
            : styles.priceDown
            ]}
            >
                {coin.price_change_percentage_24h}
            </Text>
        </View>
    </View>
)
}

const styles = StyleSheet.create ({
    containerItem:{
        paddingTop:15,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    coinData:{
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        color:'#f5f5fa',
        paddingHorizontal:10
    },
    image:{
        width:50,
        height:50,
        borderRadius:50
    },
    price:{
        color:'#f5f5fa',
        fontWeight:'bold',
        textAlign:'right'
    },
    symbol:{
        color:'#8B8F8E',
        textTransform:'uppercase',
        fontWeight:'bold',
        paddingHorizontal:10,
        paddingVertical:5
    },
    percentage:{
        textAlign:'right',
        fontWeight:'bold',
    },
    priceUp:{
        color:'#00b589'
    },
    priceDown:{
        color:'#fc4422'
    }
})