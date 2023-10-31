import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, Alert } from "react-native";

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

export default SelectCategories = ( { route, navigation } ) => {
    const newValue = route.params.price;
    const amount = route.params.amo;
    const gain_expense = route.params.gain_expense;
    const id_user = route.params.id_user;
    console.log("id_user from SelectCategories.js", id_user)
    
    const [modalVisible, setModalVisible] = useState(false);

    const [valueNote, setValueNote] = useState('')

    const [imageValue, setImageValue] = useState('')
    const [taskCompleted, setTaskCompleted] = useState(0)
    const [iconNumberPosition, setIconNumber] = useState(0)
    const [hexColor, setHexColor] = useState('')
    const [nameCategory, setNameCategory] = useState('')
    const [c, setC] = useState(0);
    
    const nameCategories = ["Salud", "Hogar", "Familia", "Educación", "Comida", "Compras", "Transporte", "Gimansio", "Regalos", "Ocio", "Servicios", "Viajes"]

    const categorySelected = ["healthSelected", "homeSelected", "familySelected", "educationSelected", "foodSelected", "shoppingSelected", "transportSelected", "gymSelected", "giftSelected", "leisureSelected", "servicesSelected", "travelSelected"]
    const categoryBase = ["health", "home", "family", "education", "food", "shopping", "transport", "gym", "gift", "leisure", "services", "travel"]
    
    const handleImageSelected = (img, hexColor, nameCategory, iconNumberPosition) =>{
        setImageValue(img)
        setIconNumber(iconNumberPosition)
        setHexColor(hexColor)
        setNameCategory(nameCategory)

        setC(c + 1);
        if((c % 2) == 0) {
            setTaskCompleted(1)
            return iconNumberPosition
        }
    }

    const getTouchableOpacityStyle = (iconNumber) => {
        for(let i = iconNumber; i <= 12; i++) {
            if(taskCompleted === 1 && iconNumberPosition === i) {
                return iconNumber === i ? [styles.category, styles[categorySelected[i - 1]]] : [styles.category, styles[categoryBase[iconNumber - 1]]];
            }
            return [styles.category, styles[categoryBase[iconNumber - 1]]];
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar hidden={false} style="light" />
            <View style={styles.miniContainer}>
                <View style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(1)} 
                        onPress={() => handleImageSelected(<Health/>, styles.health, nameCategories[0], 1)}>
                            <Health width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[0]}</Text>
                    </View>

                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(2)}
                        onPress={() => handleImageSelected(<Home/>, styles.home, nameCategories[1], 2)}>
                            <Home width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[1]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(3)}
                        onPress={() => handleImageSelected(<Family/>, styles.family, nameCategories[2], 3)}>
                            <Family width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[2]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(4)} 
                        onPress={() => handleImageSelected(<Education/>, styles.education, nameCategories[3], 4)}>
                            <Education width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[3]}</Text>
                    </View>
                    
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(5)} 
                        onPress={() => handleImageSelected(<Food/>, styles.food, nameCategories[4], 5)}>
                            <Food width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[4]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(6)} 
                        onPress={() => handleImageSelected(<Shopping/>, styles.shopping, nameCategories[5], 6)}>
                            <Shopping width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[5]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(7)} 
                        onPress={() => handleImageSelected(<Transport/>, styles.transport, nameCategories[6], 7)}>
                            <Transport width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[6]}</Text>
                    </View>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(8)} 
                        onPress={() => handleImageSelected(<Gym/>, styles.gym, nameCategories[7], 8)}>
                            <Gym width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[7]}</Text>
                    </View>
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(9)} 
                        onPress={() => handleImageSelected(<Gift/>, styles.gift, nameCategories[8], 9)}>
                            <Gift width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[8]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(10)} 
                        onPress={() => handleImageSelected(<Leisure/>, styles.leisure, nameCategories[9], 10)}>
                            <Leisure width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[9]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(11)} 
                        onPress={() => handleImageSelected(<Services/>, styles.services, nameCategories[10], 11)}>
                            <Services width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[10]}</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle(12)}
                        onPress={() => handleImageSelected(<Travel/>, styles.travel, nameCategories[11], 12)}>
                            <Travel width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{nameCategories[11]}</Text>
                    </View>
                </View>

                <View style={styles.notes}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() =>{
                            setModalVisible(!modalVisible)
                        }}
                    >
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
                                onChangeText={txt => {
                                    setValueNote(txt)
                                }}
                                selectionColor={"#D39F00"}
                            >
                            </TextInput>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
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
                            Nota
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.continue}>
                    <TouchableOpacity onPress={()=>navigation.navigate("ConfirmationScreen", {
                        id_user,
                        amount,
                        note: valueNote,
                        price: newValue,
                        image: imageValue,
                        hexColor,
                        nameCategory,
                        gain_expense,
                        iconNumberPosition
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
    healthSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#C10B0B"
    },
    home: {
        backgroundColor: "#23BC12"
    },
    homeSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#23BC12"
    },
    family: {
        backgroundColor: "#083ea7"
    },
    familySelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#083ea7"
    },
    education: {
        backgroundColor: "#621BBA"
    },
    educationSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#621BBA"
    },
    food: {
        backgroundColor: "#C76204"
    },
    foodSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#C76204"
    },
    shopping: {
        backgroundColor: "#A504B3"
    },
    shoppingSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#A504B3"
    },
    transport: {
        backgroundColor: "#C7B204"
    },
    transportSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#C7B204"
    },
    gym: {
        backgroundColor: "#2C3335"
    },
    gymSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#2C3335"
    },
    gift: {
        backgroundColor: "#C7046D"
    },
    giftSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#C7046D"
    },
    leisure: {
        backgroundColor: "#36A507"
    },
    leisureSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#36A507"
    },
    services: {
        backgroundColor: "#0780A4"
    },
    servicesSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#0780A4"
    },
    travel: {
        backgroundColor: "#D9D50A"
    },
    travelSelected: {
        borderWidth: 2,
        borderColor: "#f5f5fa",
        backgroundColor: "#D9D50A"
    },
    create: {
        borderWidth: 2,
        borderColor:'#fff',
        backgroundColor: "#15B087"
    },
    miniSectionCreate: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor:'#fff',
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
        fontSize:25,
        color:'#f5f5fa',
        borderBottomWidth:2,
        borderColor:'#d39f00',
        width:250,
        paddingVertical:10
    },
    notestxt:{
        color:'#2f2f2f',
        paddingVertical:5,
        paddingHorizontal:30,
        backgroundColor:'#d39f00',
        elevation:30,
        fontSize:16,
        fontWeight:'bold',
        borderRadius:10
    },
    centeredView: {
        flex: 1,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        backgroundColor:'rgba(0, 0, 0, 0.6)'
    },
    modalView: {
        height:310,
        width:'90%',
        backgroundColor: '#2f2f2f',
        borderRadius: 10,
        padding: 100,
        alignItems: 'center',
        shadowColor: '#0f0c0c',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 100,
        elevation: 10,
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
        fontSize:16,
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
        paddingVertical: 3,
        elevation:30,
    }
})