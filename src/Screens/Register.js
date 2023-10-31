import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, Image, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import hat from 'hat';

export default Register = () =>{
    const [user,setUser] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    //Block fields
    const [userBlock, setUserBlock] = useState("");
    const [emailBlock, setEmailBlock] = useState("");
    const [passwordBlock, setPasswordBlock] = useState("");

    const [data, setData] = useState({ user: "", email: "", password: "", token: "" });

    const [editableFields, setEditableFields] = useState(true);

    const [tokenInput, setTokenInput] = useState("")

    const [tokenFocus, setTokenFocus] = useState(false);

    const [dataComplete, setDataComplete] = useState(false);

    const navigation = useNavigation();

    const [resultSendDataComplete, setResultSendDataComplete] = useState([])

    const logInOnPress = () => {
        navigation.navigate("LogIn")
    }

    const sendDataComplete = async (user, email, password) => {
        try {
            const validationEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            const isEmailValid = (email) => {
                return validationEmail.test(email);
              };

            const isValid = isEmailValid(email);
            console.log("isValid", isValid);

            const temporalToken = hat();

            console.log(user, email, password)

            if(user.length >= 4 && isValid === true && password.length >= 8) {

                const newData = {
                    user,
                    email,
                    password,
                    token: temporalToken
                };

                setData(newData);
                setEditableFields(false);
                
                console.log("newData", newData)
                try {
                    const response = await fetch(`http://${EXPO_IP_HOST}:${EXPO_PORT}/api/sendEmail`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newData)
                    });
                
                    if (!response.ok) {
                        throw new Error("La respuesta de la red no fue satisfactoria");
                    }
                
                    const result = await response.json();
                    setDataComplete(true);
                    const hashedPassword = result.hashedPassword
                    setPassword(hashedPassword)
                    console.log("result of sendEmail", result);
                    setResultSendDataComplete(result)
                } catch (error) {
                    console.error("Error in sendData", error.message);
                }
                
            } else{
                console.log("Datos faltantes")
            }
        } catch(error) {
            console.error("error", error)
        }
    }

    const newUserDB = async (user, email, password, token) => {
        try {
            const validationEmail = async (user, email, password, token) => {
                try {
                    console.log("resultSendDataComplete", resultSendDataComplete)
                    console.log("password", password)

                    const validationEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    console.log("data", data)
                    // console.log("tokenInput", tokenInput)
                    // console.log("token", token)

                    if (data.user.length >= 4 && validationEmail.test(data.email) && data.password.length >= 8 && tokenInput === data.token) {
                        const response = await fetch(`http://${EXPO_IP_HOST}:${EXPO_PORT}/api/newUser`, {
                            method: "POST",
                            headers: {
                                'Content-Type': "application/json"
                            },
                            body: JSON.stringify({ resultSendDataComplete })
                        });
    
                        if (!response.ok) {
                            throw new Error("La respuesta de la red no fue satisfactoria");
                        }
    
                        const result = await response.json();
                        console.log("result de newUserDB", result)
    
                        navigation.navigate(result.navigation, {
                            id_user: result.id_user
                        });
                    } else {
                        console.log("Datos faltantes");
                    }
                } catch(error) {
                    console.log(error)
                }
            }
            validationEmail(user, email, password, token)
            
        } catch (error) {
            console.error("Error in newUserDB (/api/newUser)", error.message);
        }
    }

    useEffect(()=>{
        if (navigation && navigation.getParent()) {
            navigation.getParent().setOptions({ tabBarStyle : { display : 'none'}});
            return () => {
                navigation.getParent().setOptions({ tabBarStyle : { display : 'flex', backgroundColor: '#D39F00',}});
            };
        }
    }, [navigation]);

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} style="light" backgroundColor={'#2f2f2f'}/>
            <Image source={require('../assets/logo.png')} style={styles.img}></Image>
            <View>
                <Text style={styles.title}>
                    Registro de <Text style={styles.nameCompany}>Flit</Text>
                </Text>
                
            </View>
            <TextInput
                style={[styles.input, !editableFields && styles.disabledInput]}
                placeholder="Usuario"
                name="user"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                value={userBlock}
                onChangeText={user => {
                    setUser(user)
                    setUserBlock(user)
                }}
                editable={editableFields}
            ></TextInput>
            <TextInput
                style={[styles.input, !editableFields && styles.disabledInput]}
                placeholder="Correo electrónico"
                name="email"
                keyboardType="email-address"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                value={emailBlock}
                onChangeText={email => {
                    setEmail(email)
                    setEmailBlock(email)
                }}
                editable={editableFields}
            ></TextInput>
            <TextInput
                style={[styles.input, !editableFields && styles.disabledInput]}
                name="password"
                placeholder="Contraseña"
                keyboardType="default"
                cursorColor={'#D39F00'}
                placeholderTextColor={"#D39F00"}
                value={passwordBlock}
                onChangeText={password => {
                    setPassword(password)
                    setPasswordBlock(password)
                }}
                secureTextEntry={true}
                editable={editableFields}
            ></TextInput>

            {
                dataComplete === true
                ?
                    <TextInput
                        style={styles.token}
                        name="token"
                        placeholder={tokenFocus ? "" : "Token de verificación"}
                        keyboardType="ascii-capable"
                        cursorColor={"#D39F00"}
                        placeholderTextColor={"rgba(245, 245, 250, .8)"}
                        textAlign="center"
                        textAlignVertical="center"
                        onFocus={() => setTokenFocus(true)}
                        onBlur={() => setTokenFocus(false)}
                        onChangeText={token => {
                            setTokenInput(token);
                        }}
                    >
                    </TextInput>
                :
                    console.log()
            }

            {
                dataComplete === false
                ?
                    <>
                        <TouchableOpacity onPress={() => { sendDataComplete(user, email, password) }}>
                            <Text style={styles.btnRegister}>
                                Enviar
                            </Text>
                        </TouchableOpacity>
                        
                    </>
                :
                <>
                    <TouchableOpacity onPress={() => { newUserDB(user, email, password, token) }}>
                        <Text style={styles.btnRegister}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </>
            }
            <View style={styles.questionAccount}>
                <Text style={styles.alreadyAccount}>
                    ¿Ya tienes cuenta?
                </Text>
                <TouchableOpacity onPress={logInOnPress}>
                    <Text style={styles.logIn}>
                        Iniciar sesión
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container:{
        flexGrow: 1,
        backgroundColor: '#2f2f2f',
        alignItems: 'center',
    },
    img:{
        width:200,
        height: 200,
        marginTop: 50,
        marginBottom: 30
    },
    title: {
        color: "#f5f5fa",
        fontSize: 30,
        marginBottom: 15
    },
    nameCompany: {
        color: "#D39F00",
    },
    input:{
        backgroundColor: "#1F1B18",
        marginVertical: 17,
        width:"70%",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#D39F00',
        paddingVertical:10,
        paddingHorizontal: 20,
        fontSize:18,
        color:"#f5f5fa"
    },
    disabledInput: {
        backgroundColor: '#5C5C5C',
        color: '#9B9B9B'
    },
    token: {
        backgroundColor: "#212121",
        width: "60%",
        borderWidth: 3,
        borderColor: '#D39F00',
        paddingVertical:5,
        fontSize:15,
        color:"#f5f5fa",
        marginTop: 13,
        paddingVertical: 7,
        paddingHorizontal: 10
    },
    btnRegister:{
        marginTop:25,
        color:'#2f2f2f',
        backgroundColor:'#D39F00',
        borderRadius: 12,
        fontSize:18,
        paddingHorizontal: 50,
        paddingVertical:10,
        elevation:30,
        fontWeight:'bold'
    },
    questionAccount: {
        alignItems: "center",
        marginVertical: 20
    },
    alreadyAccount: {
        color: "#f5f5fa",
        fontSize: 15
    },
    logIn: {
        color: "#D39F00",
        fontSize: 15
    }
})