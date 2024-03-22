import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable, Alert, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { myColors } from '../Utils/MyColors'
import { StatusBar } from 'expo-status-bar'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'

const LoginData = {
    email: '',
    password: ''

}

const Login = () => {
    const nav = useNavigation()
    const [isVisible, setisVisible] = useState(true);
    const [isCheck, setisCheck] = useState(false);
    const [userLogin, setuserLogin] = useState(LoginData);
    const [userLoginError, setuserLoginError] = useState({});

    const handleChangeUser = (e, input) => {
        setuserLogin((prestate) => ({ ...prestate.LoginData, [input]: e }))
    }

    const handleError = (error, input) => {
        console.log(`handleError 0  ${error}   type  ${input}`)
        setuserLoginError((prestate) => ({ ...prestate.userLoginError, [input]: error }))
        console.log(`handleError  ${userLoginError.email}   type  ${userLoginError.error}`)
    };


    const onLoginClick = () => {
        //e.preventDefault()
        Keyboard.dismiss();
        nav.navigate("Home")
        handleError("input email", "email");
        console.log(`Data fill ${userLogin.email} `)
        // console.log(`Data fill Error ${userLoginError.email} &&  ${userLoginError.password}`)


        // if(userLogin.email == null)    {
        //     handleError('Please input email', 'email');    
        //     return
        // } else{

        // }

        // Alert.alert(
        //     'Alert Title', 'My Alert Msg', [
        //     {
        //         text: `text  ${userLogin.email}`,
        //         onPress: () => console.log('Ask me later pressed'),
        //     },
        //     {
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel',
        //     },
        //     { text: 'OK', onPress: () => console.log('OK Pressed') },
        // ]
        // );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: myColors.secondary }}>
            <StatusBar />
            <ScrollView style={{ flex: 1, paddingTop: 30 }}>
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }}
                    source={require('../assets/unnamed.png')} />
                <Image style={{ alignSelf: 'center', width: 100, height: 100 }}
                    source={require('../assets/unnamed.png')} />
                <View style={{ paddingHorizontal: 20, paddingTop: 50 }} >
                    <Text style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }} >Login</Text>
                    <Text style={{ color: myColors.third, fontSize: 24, fontWeight: "500" }} >Login</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'grey', marginTop: 10 }} >Enter your credentials to continue</Text>


                    {/* Email  */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }} >Email</Text>
                    <TextInput keyboardType='email-address'
                        onChangeText={(e) => handleChangeUser(e, "email")}
                        onBlur={() => handleError(null, "email")}
                        type='text'
                        name='email'
                        //errortext={userLoginError.email}
                        isError={true}
                        errorText="Error"
                        style={{ borderColor: "#E3E3E3", borderBottomWidth: 2, fontSize: 16, marginTop: 15 }} />

                    {/* Password  */}
                    <Text style={{ fontSize: 16, fontWeight: '500', color: 'grey', marginTop: 40 }} >Password</Text>
                    <View style={{ borderColor: "#E3E3E3", borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput maxLength={6} keyboardType='ascii-capable' secureTextEntry={isVisible}
                            onChangeText={(e) => handleChangeUser(e, "password")}
                            style={{ fontSize: 16, marginTop: 15, flex: 0.8 }} />
                        <Ionicons onPress={() => setisVisible(!isVisible)} name={isVisible === true ? 'eye-off-outline' : 'eye-outline'} size={24} color='black' />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 5, alignContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons onPress={() => setisCheck(!isCheck)} name={isCheck === true ? 'check-box-outline-blank' : 'check-box'} size={20} color='black' />
                        <Text numberOfLines={2} style={{
                            fontSize: 14, fontWeight: '400', color: 'black', marginTop: 20, letterSpacing: 0.7,
                            lineHeight: 25, width: "95%",
                        }}>
                            By continuing you agree to our terms of services and privacy policy
                        </Text>

                    </View>
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

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                        <Text>Forgot Password ?</Text>
                        <Text>Sign Up</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
    );
}

export default Login