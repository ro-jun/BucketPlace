import React, { useState } from "react";
import Image from "./image";
import { View, Text, StyleSheet } from "react-native"; // 필요한 컴포넌트들 import
import { Ionicons } from "@expo/vector-icons";
// ...
 
const Mypage = () => {
  const [photo,  setPhoto] = useState(undefined);
  return (
    <View>
        <Text style={styles.text}>내 프로필</Text>
        <Image url={photo} onChangePhoto={setPhoto}/>
    </View>
  ); 
};

const styles = StyleSheet.create({
    text: {
        fontSize:25,
    }
})
 
export default Mypage;

