import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Btn = styled.TouchableOpacity``;

const ImageComponent = ({ url, onChangePhoto }) => {
  const [userBio, setUserBio] = useState('');
  const navigation = useNavigation();

  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      onChangePhoto(result.assets[0].uri);
    }
  };

  const handleNavigateToPost = () => {
    navigation.navigate('post', {screen:'post'}); // 'PostScreen'으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {url ? (
          <Image source={{ uri: url }} style={styles.image} />
        ) : (
          <TouchableOpacity onPress={_handlePhotoBtnPress} style={styles.imagePlaceholder}>
            <Ionicons name="add" size={30} color="black" />
            <Text style={styles.placeholderText}>사진 추가</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.input}
        value={userBio}
        onChangeText={setUserBio}
        placeholder="한줄 소개"
      />

      <TouchableOpacity style={styles.button} onPress={handleNavigateToPost}>
        <Text style={styles.buttonText}>내 게시글</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default ImageComponent;
