import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal, Alert } from "react-native";

/* Import icons svg */
import Health from '../resources/icons/health.svg';
import Home from '../resources/icons/home.svg';
import Family from '../resources/icons/family.svg';
import Education from '../resources/icons/education.svg';
import Food from '../resources/icons/food.svg';
import Shopping from '../resources/icons/shopping.svg';
import Transport from '../resources/icons/transport.svg';
import Gym from '../resources/icons/gym.svg';
import Gift from '../resources/icons/gift.svg';
import Leisure from '../resources/icons/leisure.svg';
import Services from '../resources/icons/services.svg';
import Travel from '../resources/icons/travel.svg';
import Create from '../resources/icons/create.svg';

export default SelectCategories = ( { route, navigation } ) => {
    const newValue = route.params.price;
    const amount = route.params.amo;
    
    //Modal state//
    const [modalVisible, setModalVisible] = useState(false);

    //Category created//
    const name = route.params.category;
    const { img } = route.params;

    //Value text input//
    const [valueNote, setValueNote] = useState('')

    //Handle image selected//
    const [imageValue, setImageValue] = useState('')

    const handleImageSelected = (img) =>{
        setImageValue(img)
    }

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" />
            <View style={styles.miniContainer}>
                <View style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.health]} 
                        onPress={() => handleImageSelected(<Health/>)}>
                            <Health width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Salud</Text>
                    </View>

                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.home]} 
                        onPress={() => handleImageSelected(<Home/>)}>
                            <Home width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Hogar</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.family]}
                        onPress={() => handleImageSelected(<Family/>)}>
                            <Family width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Familia</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.education]} 
                        onPress={() => handleImageSelected(<Education/>)}>
                            <Education width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Educacion</Text>
                    </View>
                    
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.food]} 
                        onPress={() => handleImageSelected(<Food/>)}>
                            <Food width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Comida</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.shopping]} 
                        onPress={() => handleImageSelected(<Shopping/>)}>
                            <Shopping width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Compras</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.transport]} 
                        onPress={() => handleImageSelected(<Transport/>)}>
                            <Transport width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Transporte</Text>
                    </View>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.gym]} 
                        onPress={() => handleImageSelected(<Gym/>)}>
                            <Gym width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>GYM</Text>
                    </View>
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.gift]} 
                        onPress={() => handleImageSelected(<Gift/>)}>
                            <Gift width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Regalos</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.leisure]} 
                        onPress={() => handleImageSelected(<Leisure/>)}>
                            <Leisure width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Ocio</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.services]} 
                        onPress={() => handleImageSelected(<Services/>)}>
                            <Services width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Servicios</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.travel]}
                        onPress={() => handleImageSelected(<Travel/>)}>
                            <Travel width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Viajes</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.created]}
                        onPress={() => handleImageSelected(img)}>
                            <Image
                            source={{uri:img}}
                            style={{ width: 70, height: 70, borderRadius: 50 }}/>
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{name}</Text>
                    </View>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.create]}
                        onPress={() => navigation.navigate("CreateCategory")}>
                            <Create width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Crear</Text>
                    </View>
                </View>
                <View style={styles.notes}>
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() =>{
                        setModalVisible(!modalVisible)
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                        style={styles.notesInput}
                        name="notes"
                        maxLength={20}
                        autoCorrect={true}
                        cursorColor={'#D39F00'}
                        keyboardType="default"
                        multiline={true}
                        placeholder="Nota"
                        placeholderTextColor={"#8B8F8E"}
                        onChangeText={txt => setValueNote(txt)}
                        selectionColor={"#D39F00"}
                        >
                        </TextInput>
                        <TouchableOpacity onPress={() => {
                        setModalVisible(!modalVisible)}}>
                        <Text style={styles.btnHide}>
                            Guardar
                        </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>
                    <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                        <Text style={styles.notestxt}>
                            Notas
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.continue}>
                    <TouchableOpacity onPress={()=>navigation.navigate("ConfirmationScreen", {
                        note: valueNote,
                        price: newValue,
                        image: imageValue,
                        amo: amount
                    })}> 
                        <Text style={styles.continueBtn} name="continue">
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#2f2f2f'
    },
    miniContainer: {
        display: "flex",
        alignItems: "start",
        justifyContent: "space-around",
        flex: 1,
        elevation:30
    },
    section: {
        display: 'flex',
        backgroundColor: '#2f2f2f',
        flexDirection: "row",
        alignItems: "start",
        justifyContent: "space-evenly"
    },
    category: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#860000",
        width: 70,
        height: 70,
        borderRadius: 50,
        backfaceVisibility: "visible",
    },
    health: {
        backgroundColor: "#C10B0B"
    },
    home: {
        backgroundColor: "#23BC12"
    },
    family: {
        backgroundColor: "#083ea7"
    },
    education: {
        backgroundColor: "#621BBA"
    },
    food: {
        backgroundColor: "#C76204"
    },
    shopping: {
        backgroundColor: "#A504B3"
    },
    transport: {
        backgroundColor: "#C7B204"
    },
    gym: {
        backgroundColor: "#2C3335"
    },
    gift: {
        backgroundColor: "#C7046D"
    },
    leisure: {
        backgroundColor: "#36A507"
    },
    services: {
        backgroundColor: "#0780A4"
    },
    travel: {
        backgroundColor: "#D9D50A"
    },
    create: {
        backgroundColor: "#15B087"
    },
    created:{
        backgroundColor: "#2f2f2e"
    },
    miniSection: {
        display: "flex",
        alignItems: "center"
    },
    textIcon: {
        marginTop:10,
        color: "#f5f5fa"
    },
    notes: {
        justifyContent: "center",
        alignItems: "center",
        color:'#f5f5fa',
        fontSize:20
    },
    notesInput:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:20,
        color:'#f5f5fa',
        borderBottomWidth:2,
        borderColor:'#d39f00',
        width:200,
        paddingVertical:10
    },
    notestxt:{
        color:'#2f2f2f',
        paddingVertical:5,
        paddingHorizontal:30,
        backgroundColor:'#d39f00',
        elevation:30,
        fontSize:15,
        fontWeight:'bold',
        borderRadius:10
    },
    centeredView: {
        flex: 1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        backgroundColor:'rgba(0, 0, 0, 0.7)'
    },
    modalView: {
        height:300,
        width:'90%',
        backgroundColor: '#2f2f2f',
        borderRadius: 20,
        padding: 100,
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 100,
        elevation: 100,
    },
    btnHide:{
        textAlign:'center',
        textAlignVertical:'center',
        color:'#2f2f2f',
        backgroundColor:'#d39f00',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:30,
        marginTop:40,
        fontSize:15,
        fontWeight:'bold'
    },
    continue:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
    continueBtn:{
        fontSize:25,
        fontWeight:'bold',
        backgroundColor:'#d39f00',
        color:'#2f2f2f',
        borderRadius:12,
        paddingHorizontal: 90,
        elevation:30,
    }
})