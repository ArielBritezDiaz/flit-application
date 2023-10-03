import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from "react-native";

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
    const priceFormatted = route.params.price.replaceAll(".", "")
    const price = parseInt(priceFormatted)

    const [valueNote, setValueNote] = useState('')
    
    //Hide the bottom tabs navigation//
    useEffect(()=>{
        navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}})
        return ()=>{
            navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}})
        }
    }, [])
    
    return(
        <View style={styles.container}>
            <StatusBar hidden={false} />
            <View style={styles.miniContainer}>
                <View style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.health]} >
                            <Health width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Health</Text>
                    </View>

                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.home]} >
                            <Home width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Home</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.family]} >
                            <Family width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Family</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.education]} >
                            <Education width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Education</Text>
                    </View>
                    
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.food]} >
                            <Food width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Food</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.shopping]} >
                            <Shopping width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Shopping</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.transport]} >
                            <Transport width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Transport</Text>
                    </View>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.gym]} >
                            <Gym width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Gym</Text>
                    </View>
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.gift]} >
                            <Gift width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Gift</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.leisure]} >
                            <Leisure width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Laisure</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.services]} >
                            <Services width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Services</Text>
                    </View>
                    
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.travel]} >
                            <Travel width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Travel</Text>
                    </View>
                </View>
                <View  style={styles.section}>
                    <View style={styles.miniSection}>
                        <TouchableOpacity style={[styles.category, styles.create]} >
                            <Create width={50} height={50} />
                        </TouchableOpacity>
                        <Text style={styles.textIcon}>Create</Text>
                    </View>
                </View>

                <View style={styles.notes}>
                    <TextInput
                        style={styles.notes}
                        name="notes"
                        maxLength={50}
                        autoCorrect={true}
                        defaultValue=""
                        cursorColor={'#D39F00'}
                        keyboardType="default"
                        multiline={true}
                        placeholder="Notes"
                        placeholderTextColor={"#8B8F8E"}
                    >
                    </TextInput>
                </View>
            
                <View style={styles.continue}>
                    {/* <TouchableOpacity onPress={()=>navigation.navigate("SelectCategories", {
                        price: amount
                    })}> </TouchableOpacity> */}
                        <Text style={styles.continueBtn} name="continue">
                            Continue
                        </Text>
                </View>

            {/*
                <Text>{ price }</Text>
                <Text>{ typeof(price) }</Text>
            */}
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
        flex: 1
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
        backfaceVisibility: "visible"
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
    miniSection: {
        display: "flex",
        alignItems: "center"
    },
    textIcon: {
        color: "#f5f5fa"
    },
    notes: {
        color: "#f5f5fa",
        justifyContent: "center",
        alignItems: "center"
    },
    continue:{
        justifyContent:'center',
        alignItems:'center'
    },
    continueBtn:{
        fontSize:25,
        fontWeight:'bold',
        backgroundColor:'#d39f00',
        color:'#2f2f2f',
        borderRadius:12,
        paddingHorizontal: 50,
    }
})