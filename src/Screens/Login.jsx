import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable, Alert, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'

import CmpInputText from '../Components/CmpInputText';

const LoginData = {
    email: '',
    password: ''
}

const Login = () => {
    const nav = useNavigation()
    const [isVisible, setisVisible] = useState(true);
    const [isCheck, setisCheck] = useState(false);
    const [userLogin, setuserLogin] = useState(LoginData);
    const [userLoginError, setuserLoginError] = useState(LoginData);

    const handleChange = (e, input) => {
        try {
            //console.log(e, input);    
            setuserLogin({ ...userLogin, [input]: e })
            //            console.log(`user input ${userLogin.email}`);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (!reg.test(userLogin.email)) {
                LoginData.email = "Please Enter Email"
                setuserLoginError(LoginData)
                return
            } else if(userLogin.password.length < 8) {
                LoginData.email = undefined
                LoginData.password = "Password should be at least 8 characters long"
                setuserLoginError(LoginData)
                return
            } else {
                LoginData.password = undefined
                LoginData.email = undefined
                setuserLoginError(LoginData)
            }

        } catch (error) {
            console.log(`Error ${error}`);
        }
    }

    const onLoginClick = () => {
        Keyboard.dismiss();
        console.log(`Data fill Value ${userLogin.email} `)
        console.log(`Data fill Error ${userLoginError.email} `)
        nav.navigate("Home")
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
            <StatusBar />
            <ScrollView style={{ flex: 1, paddingTop: 30 }}>
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }}
                    source={require('../assets/unnamed.png')} />

                <View style={{ paddingHorizontal: 20, paddingTop: 50 }} >
                    <Text style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }} >Login</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginVertical: 10 }} >Enter your credentials to continue</Text>

                    <CmpInputText
                        label="Email"
                        name="email"
                        onError={userLoginError.email}
                        handleTextChange={handleChange}
                    />

                    <CmpInputText
                        label="Password"
                        name="password"
                        onError={userLoginError.password}
                        handleTextChange={handleChange}
                        password={true}
                    />


                    <View style={{ flexDirection: 'row', gap: 5, alignContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons onPress={() => setisCheck(!isCheck)} name={isCheck === true ? 'check-box-outline-blank' : 'check-box'} size={20} color='black' />
                        <Text numberOfLines={2} style={{
                            fontSize: 14, fontWeight: '400', color: 'black', marginTop: 20, letterSpacing: 0.7,
                            lineHeight: 25, width: "95%",
                        }}>
                            By continuing you agree to our terms of services and privacy policy
                        </Text>

                    </View>

                    <TouchableOpacity
                        onPress={
                            //console.log("Press")
                            //nav.navigate("Home")
                            onLoginClick
                        }
                        style={{
                            backgroundColor: myColors.primary,
                            marginTop: 30,
                            height: 70,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ fontSize: 19, fontWeight: '500', color: myColors.secondary }} >Login</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                        <Text>Forgot Password ?</Text>
                        <Text>Sign Up</Text>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView >
    );
}

export default Login