import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default CreateCategory = ({route, navigation}) => {
    //Category name//
    const [name, setName] = ('')

    return(
        <View style={styles.container}>
            <Text style={styles.txt}>
                ¿Cual va a ser el nombre de su categoría?
            </Text>
            <TextInput
            placeholder='Nombre'
            value={name}
            placeholderTextColor={"#8B8F8E"}
            selectionColor={"#D39F00"}
            keyboardType="default"
            cursorColor={'#D39F00'}
            autoCorrect={true}
            maxLength={30}
            style={styles.input}>
            </TextInput>
            <Text>
                {name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    container:{
        display: 'flex',
        backgroundColor: '#2f2f2f',
        height:'100%',
        alignItems:'center'
    },
    txt:{
        marginVertical:30,
        color:'#f5f5fa',
        fontWeight:'bold'
    },
    input:{
        color: "#f5f5fa",
        fontWeight:'500',
        marginVertical:10,
        borderBottomWidth:2,
        borderColor:'#D39F00',
        paddingVertical:5,
        elevation:30,
        width:'70%'
    }
})