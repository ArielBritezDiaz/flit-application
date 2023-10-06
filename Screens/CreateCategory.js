import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default CreateCategory = ({route, navigation}) => {
    //Category name//
    const [name, setName] = useState('')

    //Category image//
    const [img, setImg] = useState('')

    //Request permission to the gallery//
    const galleryPermission = async() =>{
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if(permission.granted == false){
    alert('La aplicacion necesita acceso a su galeria')
    return
    }

    //Image chosen by the user//
    const imageChosen = await ImagePicker.launchImageLibraryAsync()

    //If the user doesn't choose any image//
    if(imageChosen.canceled == true){
        return
    }

    //Set the image selected//
    setImg({localuri:imageChosen.uri})

    }

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
            onChangeText={val => setName(val)}
            style={styles.input}>
            </TextInput>
            <TouchableOpacity
            onPress={galleryPermission}
            style={styles.button}>
                <Text
                style={styles.btntxt}>
                    Eliga una imagen
                </Text>
            </TouchableOpacity>
            <Image
            source={{uri:img.localuri}}
            style={styles.img}/>
            <Text style={styles.name}>
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
        fontWeight:'bold',
        textAlign:'center',
        fontSize:20
    },
    input:{
        color: "#f5f5fa",
        fontWeight:'500',
        marginVertical:10,
        borderBottomWidth:2,
        borderColor:'#D39F00',
        paddingVertical:5,
        elevation:30,
        width:'70%',
        fontSize:15
    },
    button:{
        marginVertical:30,
        backgroundColor:'#d39f00',
        paddingVertical:10,
        paddingHorizontal:40,
        borderTopRightRadius:100,
        borderTopLeftRadius:100,
        borderBottomRightRadius:100,
        borderBottomLeftRadius:100,
    },
    btntxt:{
        fontSize:20,
        color:'#f5f5fa',
        fontWeight:'bold'
    },
    name:{
        fontSize:20,
        color:"#f5f5fa",
        fontWeight:'bold',
        marginVertical:10
    },
    img:{
        height: 200,
        width: 200,
        borderRadius:100,
        marginVertical:30,
        borderColor:'#d39f00'
    }
})