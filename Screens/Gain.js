import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, StatusBar } from 'react-native';

export default Gain = ({navigation}) => {
    //Amount//
    const [amount, setAmount] = useState ('')

    //PredefinedAmounts//
    const [selectedAmount, setSelectedAmount] = useState('')

    //Function when the user types amount//
    const typingAmount = (amount) => {
        const value = amount.replace('$', amount)
        const comaDecimal = value.replace(/[^0-9,]/g, '')//Coma decimal//
        const decimalCount = comaDecimal.split(',').length - 1//Decimal input counter//
        if (decimalCount <= 1){
            setAmount(comaDecimal)
        }
    }

    //Hide the bottom tabs navigation//
    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])

    return(
        <View style={styles.container}>
            <StatusBar translucent={true} />
            <View style={styles.price}>
                <Text style={styles.symbol}>
                    $
                </Text>
                <TextInput
                    style={styles.amount}
                    onChangeText={typingAmount}
                    keyboardType = "numeric"
                    value={amount}
                    multiline={true}
                    numberOfLines={2}
                    placeholder='0,00'
                    maxLength={12}
                    placeholderTextColor={'#D39F00'}
                    cursorColor={'#D39F00'}
                >
                </TextInput>
            </View>
            <View style={styles.default}>
            <ScrollView horizontal={true}>
                {/* Predefined amounts buttons */}
                <TouchableOpacity value={selectedAmount}
                onPress={() => typingAmount('1000')}>
                    <Text style={styles.option}>
                        1.000
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity value={selectedAmount}
                onPress={() => typingAmount('5000')}>
                    <Text style={styles.option}>
                        5.000
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity value={selectedAmount}
                onPress={() => typingAmount('10000')}>
                    <Text style={styles.option}>
                        10.000
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity value={selectedAmount}
                onPress={() => typingAmount('15000')}>
                    <Text style={styles.option}>
                        15.000
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity value={selectedAmount}
                onPress={() => typingAmount('20000')}
                style>
                    <Text style={styles.option}>
                        20.000
                    </Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.continue}>
                <TouchableOpacity onPress={()=>navigation.navigate("SelectCategories", {
                    price: amount
                })}>
                    <Text style={styles.continueBtn} name="continue">
                        Continuar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container:{
        display: 'flex',
        backgroundColor: '#2f2f2f',
        height:'100%'
    },
    price:{
        justifyContent:'center',
        alignItems:'center',
        top: 50,
        height:'50%',
        position:'relative',
        flexDirection:'row',
        paddingHorizontal: 20
    },
    amount:{
        fontSize: 80,
        color: '#D39F00',
    },
    symbol:{
        fontSize: 80,
        color: '#D39F00',
    },
    default:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:200,
        position:'relative',
        top:40
    },
    option:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:30,
        borderWidth:5,
        borderRadius:12,
        borderColor:'#D39F00',
        paddingHorizontal:20,
        marginHorizontal:20,
        color:'#d39f00',
        fontWeight:'bold'
    },
    continue:{
        height:100,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        top:30
    },
    continueBtn:{
        fontSize:25,
        fontWeight:'bold',
        backgroundColor:'#d39f00',
        color:'#2f2f2f',
        borderRadius:12,
        textAlign:'center',
        textAlignVertical:'center',
        paddingHorizontal:90,
        elevation:30
    }
})