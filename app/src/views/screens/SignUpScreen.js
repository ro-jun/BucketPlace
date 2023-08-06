import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/color';
import STYLES from '../../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity``;

const SignUpScreen = ({ navigation: { navigate } }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    console.log("회원가입 버튼이 눌렸습니다.");
    try {
      const response = await fetch('http://10.0.2.2:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      

      const data = await response.json();

      if (data.message) {
        Alert.alert("Success", data.message);
        navigate('SignIn', { screen: "SignIn" });
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      console.error("Error in handleSignUp:", error);
      Alert.alert("Error", "Something went wrong!");
    } 
  };

  return (
    <SafeAreaView
      style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
          Bucket
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            Place
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            안녕하세요
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            회원가입을 진행해주세요
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={STYLES.inputContainer}>
            <Icon
              name="person-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput 
              placeholder="Name" 
              style={STYLES.input} 
              value={name} 
              onChangeText={(text) => setName(text)} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="mail-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput 
              placeholder="Email" 
              style={STYLES.input} 
              value={email} 
              onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={STYLES.inputContainer}>
            <Icon
              name="lock-outline"
              color={COLORS.light}
              size={20}
              style={STYLES.inputIcon}
            />
            <TextInput 
              placeholder="Password"
              style={STYLES.input}
              secureTextEntry 
              value={password}
              onChangeText={(text) => setPassword(text)} />
          </View>
          <Btn onPress= {handleSignUp} style={[STYLES.btnPrimary]} >
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              회원가입
            </Text>
          </Btn>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={STYLES.line}></View>
            <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
            <View style={STYLES.line}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
            Already have an account ?
          </Text>
          <Btn onPress={() => navigate('SignIn', {screen:"SignIn"})}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              Sign in
            </Text>
          </Btn>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
