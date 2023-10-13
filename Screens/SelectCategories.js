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
// import Create from '../resources/icons/create.svg';

export default SelectCategories = ( { route, navigation } ) => {
    const newValue = route.params.price;
    const amount = route.params.amo;
    
    //Modal state//
    const [modalVisible, setModalVisible] = useState(false);

    //Category created//
    const name = route.params.category;
    const { img } = route.params;
    const countCategory = route.params.countCategory;

    //Value text input//
    const [valueNote, setValueNote] = useState('')

    //Handle image selected//
    const [imageValue, setImageValue] = useState('')
    const [taskCompleted, setTaskCompleted] = useState(0)
    const [iconNumbera, setIconNumber] = useState(0)
    const [hexColor, setHexColor] = useState('')
    const [nameCategory, setNameCategory] = useState('')
    const [c, setC] = useState(0);

    const nameCategories = ["Salud", "Hogar", "Familia", "Educación", "Comida", "Compras", "Transporte", "Gimansio", "Regalos", "Ocio", "Servicios", "Viajes"]

    const handleImageSelected = (img, hexColor, nameCategory, iconNumberProp) =>{
        setImageValue(img)
        setIconNumber(iconNumberProp)
        setHexColor(hexColor)
        setNameCategory(nameCategory)
        console.log(nameCategory)

        setC(c + 1);
        // console.log(`c: ${c}`)
        if((c % 2) == 0) {
            setTaskCompleted(1)
            return iconNumberProp
        }
    }

    const getTouchableOpacityStyle = (iconNumber) => {
        // console.log(`iconNumbera: ${iconNumbera}`)
        switch(iconNumber) {
            case 1:
                if(taskCompleted === 1 && iconNumbera === 1) {
                    // console.log(`iconNumber de case 1: ${iconNumber}`)
                    return iconNumber === 1 ? [styles.category, styles.healthSelected] : [styles.category, styles.health]
                }
                return [styles.category, styles.health]
            case 2:
                if(taskCompleted === 1 && iconNumbera === 2) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 2 ? [styles.category, styles.homeSelected] : [styles.category, styles.home]
                }
                return [styles.category, styles.home]
            case 3:
                if(taskCompleted === 1 && iconNumbera === 3) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 3 ? [styles.category, styles.familySelected] : [styles.category, styles.family]
                }
                return [styles.category, styles.family]
            case 4:
                if(taskCompleted === 1 && iconNumbera === 4) {
                    // console.log(`iconNumber de case 1: ${iconNumber}`)
                    return iconNumber === 4 ? [styles.category, styles.educationSelected] : [styles.category, styles.education]
                }
                return [styles.category, styles.education]
            case 5:
                if(taskCompleted === 1 && iconNumbera === 5) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 5 ? [styles.category, styles.foodSelected] : [styles.category, styles.food]
                }
                return [styles.category, styles.food]
            case 6:
                if(taskCompleted === 1 && iconNumbera === 6) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 6 ? [styles.category, styles.shoppingSelected] : [styles.category, styles.shopping]
                }
                return [styles.category, styles.shopping]
            case 7:
                if(taskCompleted === 1 && iconNumbera === 7) {
                    // console.log(`iconNumber de case 1: ${iconNumber}`)
                    return iconNumber === 7 ? [styles.category, styles.transportSelected] : [styles.category, styles.transport]
                }
                return [styles.category, styles.transport]
            case 8:
                if(taskCompleted === 1 && iconNumbera === 8) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 8 ? [styles.category, styles.gymSelected] : [styles.category, styles.gym]
                }
                return [styles.category, styles.gym]
            case 9:
                if(taskCompleted === 1 && iconNumbera === 9) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 9 ? [styles.category, styles.giftSelected] : [styles.category, styles.gift]
                }
                return [styles.category, styles.gift]
            case 10:
                if(taskCompleted === 1 && iconNumbera === 10) {
                    // console.log(`iconNumber de case 1: ${iconNumber}`)
                    return iconNumber === 10 ? [styles.category, styles.leisureSelected] : [styles.category, styles.leisure]
                }
                return [styles.category, styles.leisure]
            case 11:
                if(taskCompleted === 1 && iconNumbera === 11) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 11 ? [styles.category, styles.servicesSelected] : [styles.category, styles.services]
                }
                return [styles.category, styles.services]
            case 12:
                if(taskCompleted === 1 && iconNumbera === 12) {
                    // console.log(`iconNumber: ${iconNumber}`)
                    return iconNumber === 12 ? [styles.category, styles.travelSelected] : [styles.category, styles.travel]
                }
                return [styles.category, styles.travel]
        }
        
    }

    const countCategoryCreate = (countCategory) => {

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

                {/* <View style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={getTouchableOpacityStyle()}
                        onPress={() => handleImageSelected(img)}>
                            <Image
                            source={{uri:img}}
                            style={{ width: 70, height: 70, borderRadius: 50 }}/>
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>{name}</Text>
                    </View>
                    <View style={getTouchableOpacityStyle()}>
                        <TouchableOpacity style={[styles.category, styles.create]}
                        onPress={() => navigation.navigate("CreateCategory")}>
                            <Create width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Crear</Text>
                    </View>
                </View> */}
                <View style={styles.notes}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() =>{
                            Alert.alert('Nota guardada')
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
                                    // console.log(`nota: ${txt}`)
                                }}
                                selectionColor={"#D39F00"}
                            >
                            </TextInput>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    Alert.alert('Nota guardada');
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
                            Notas
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.continue}>
                    <TouchableOpacity onPress={()=>navigation.navigate("ConfirmationScreen", {
                        amo: amount,
                        note: valueNote,
                        price: newValue,
                        image: imageValue,
                        nameCategory,
                        hexColor
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
        borderRadius: 10,
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