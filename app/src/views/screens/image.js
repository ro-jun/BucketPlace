import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ImageComponent = ({ url, onChangePhoto }) => {
  const [userBio, setUserBio] = useState(''); // 사용자 한줄 소개 상태 추가

  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled && result.assets.length > 0) { // assets 배열을 사용하여 접근
      onChangePhoto(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
      <TouchableOpacity onPress={_handlePhotoBtnPress}>
        <Ionicons name="add" size={30} color="black" />
      </TouchableOpacity>
      {/* 이름과 한줄 소개 입력 */}
      <TextInput
        style={{ fontSize: 20, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }}
        value={userBio}
        onChangeText={setUserBio}
        placeholder="한줄 소개를 입력하세요."
      />
      {/* 게시글 확인 메뉴 */}
      <TouchableOpacity style={{ backgroundColor: '#f2f2f2', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>내 게시글</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageComponent;
