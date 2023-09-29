import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default Gain = ({navigation}) => {
    const [amount, setAmount] = useState ('0');

    // const typingAmount = (text) => {
    //     // Remove any non-numeric characters from the input
    //     const value = text.replace(/[^0-9]/g, '');
    
    //     // Format the numeric value with a "$" symbol
    //     setAmount(`$${value}`);
    // };

    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])
return(
    <View style={styles.container}>
            <TextInput style={styles.amount}
            onChangeText={typingAmount}
            keyboardType = "numeric"
            value={amount}
            >
            </TextInput>
    </View>
);
}

const styles = StyleSheet.create ({
    container:{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
        height:'100%'
    },
    amount:{
        fontSize: 50,
        color: '#D39F00'
    }
})