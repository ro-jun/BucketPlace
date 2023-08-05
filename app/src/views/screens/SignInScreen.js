import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';
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
                    <View style={STYLES.inputcontainer}>
                        <Icon
                            name="mail-outline"
                            size={20}
                            color={COLORS.light}
                            styles={STYLES.inputIcon}
                        />
                        <TextInput placeholder="Email" style={STYLES.input}/>
                    </View>
                        <View style={STYLES.inputcontainer}>
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
                            />
                        </View>
                        <View style = {STYLES.btnPrimary}>
                            <Btn2 onPress={() => navigate("Root", {screen:"Tabs"})}>
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