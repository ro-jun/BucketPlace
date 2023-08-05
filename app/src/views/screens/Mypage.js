import React, { useState } from "react";
import Image from "./image";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Mypage = () => {
  const [photo, setPhoto] = useState(undefined);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>내 프로필</Text>
      <Image url={photo} onChangePhoto={setPhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
});

export default Mypage;
