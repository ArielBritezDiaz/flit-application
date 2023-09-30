import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text , ScrollView} from 'react-native';

export default Gain = ({navigation}) => {
    //Amount//
    const [amount, setAmount] = useState ('')

    //PredefinedAmounts//
    const [selectedAmount, setSelectedAmount] = useState('')

    //Funtcion to handle the predefined amounts//
    const handleAmount = val =>{
        setSelectedAmount(val)
    }

    //Function when the user types amount//
    const typingAmount = amount => {
        const value = amount.replace('$', '')
        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')//Thousand point//
        setAmount(formattedValue)
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
        <View style={styles.containerTxt}>
            <Text style={styles.txt}>
                Ingrese el monto
            </Text>
        </View>
        <View style={styles.price}>
            <Text style={styles.symbol}>
                $
            </Text>
                <TextInput style={styles.amount}
                onChangeText={typingAmount}
                keyboardType = "numeric"
                value={amount}
                multiline={true}
                placeholder='0,00'
                placeholderTextColor={'#D39F00'}
                cursorColor={'#D39F00'}
                >
                </TextInput>
        </View>
        <View style={styles.default}>
        <ScrollView horizontal={true}>
            {/* Predefined amounts buttons */}
            <TouchableOpacity value={selectedAmount}
            onPress={() => handleAmount(1000)}>
                <Text style={styles.option}>
                    1.000
                </Text>
            </TouchableOpacity>
            <TouchableOpacity value={selectedAmount}
            onPress={() => handleAmount(5000)}>
                <Text style={styles.option}>
                    5.000
                </Text>
            </TouchableOpacity>
            <TouchableOpacity value={selectedAmount}
            onPress={() => handleAmount(10000)}>
                <Text style={styles.option}>
                    10.000
                </Text>
            </TouchableOpacity>
            <TouchableOpacity value={selectedAmount}
            onPress={() => handleAmount(15000)}>
                <Text style={styles.option}>
                    15.000
                </Text>
            </TouchableOpacity>
            <TouchableOpacity value={selectedAmount}
            onPress={() => handleAmount(20000)}
            style>
                <Text style={styles.option}>
                    20.000
                </Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
        <View style={styles.continue}>
            <TouchableOpacity>
                <Text style={styles.continueBtn}>
                    continuar
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
        height:'50%',
        position:'relative',
        top:50,
        flexDirection:'row'
    },
    amount:{
        fontSize: 70,
        color: '#D39F00',
    },
    symbol:{
        fontSize: 70,
        color: '#D39F00',
    },
    containerTxt:{
        padding: 10
    },
    txt:{
        fontSize: 20,
        color:'#D39F00',
    },
    default:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height:200
    },
    option:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:30,
        borderWidth:5,
        borderRadius:12,
        borderColor:'#D39F00',
        paddingHorizontal:20,
        marginHorizontal:10,
        color:'#d39f00',
        fontWeight:'bold'
    },
    continue:{
        height:100,
        justifyContent:'center',
        alignItems:'center'
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