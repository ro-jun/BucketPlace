import React, {useState} from 'react';
import {View, Text, TextInput, Image, Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity``;
const Btn2 = styled.TouchableOpacity``;
const Btn3 = styled.TouchableOpacity``;

function SignInScreen({navigation: { navigate }}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.success) { // 서버가 성공 응답을 보냈다면
                navigate("Root", {screen:"Tabs"});
            } else {
<<<<<<< HEAD
                Alert.alert("Error", "이메일 또는 비밀번호가 틀렸습니다.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            Alert.alert("Error", "무언가 잘못됐어요");
=======
                Alert.alert("Error", "Invalid email or password!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            Alert.alert("Error", "Something went wrong!");
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
        } 
    };

    return (
        <SafeAreaView style = {{paddingHorizontal: 20, flex:1, backgroundColor:COLORS.white}} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: 'row', marginTop: 40}}>
                    <Text style = {{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>Bucket</Text>
                    <Text style = {{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>Place</Text>
                </View>
                <View style={{marginTop: 70}}>
                    <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
                        안녕하세요
                    </Text>
                    <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
                        로그인을 진행해주세요
                    </Text>
                </View>     
                <View style={{marginTop: 20}}>
<<<<<<< HEAD
                    <View style={STYLES.inputContainer}>
=======
                    <View style={STYLES.inputcontainer}>
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
                        <Icon
                            name="mail-outline"
                            size={20}
                            color={COLORS.light}
                            styles={STYLES.inputIcon}
                        />
                        <TextInput 
                                placeholder="Email" 
                                style={STYLES.input}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
<<<<<<< HEAD
                        <View style={STYLES.inputContainer}>
=======
                        <View style={STYLES.inputcontainer}>
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
                            <Icon
                                name="lock-outline"
                                size={20}
                                color={COLORS.light}
                                styles={STYLES.inputIcon}
                            />
                            <TextInput 
                                placeholder="password" 
                                style={STYLES.input}
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <View style = {STYLES.btnPrimary}>
                            <Btn2 onPress={handleLogin}>
                                <Text style = {{color:COLORS.white, fontWeight:"bold", fontSize: 18}}>로그인</Text>
                            </Btn2>
                        </View>
                        <View style = {{marginVertical: 20, flexDirection:"row", justifyContent: "center", alignItems:"center"}}>
                            <View style = {STYLES.line}></View>
                            <Text style = {{fontWeight: "bold", marginHorizontal: 5}}>OR</Text>
                            <View style = {STYLES.line}></View>
                        </View>
                            <Btn3 onPress={() => navigate('kakaologin')}>
                            <View style={STYLES.kakaologinbtn}>
                                <Image style={STYLES.btnImage} source={require('../../assets/kakao_login.png')}/>
                            </View>
                            </Btn3>
                    </View>
                    <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            marginTop: 40,
                            marginBottom: 20,
                        }}>
                        <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
                            Don`t have an account ?
                        </Text>
                        <Btn onPress={() => navigate('SignUp', {screen:"SignUp"})}>
                            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>Sign up</Text>
                        </Btn>
                    </View>
                </ScrollView>
        </SafeAreaView>
    );
};

export default SignInScreen;