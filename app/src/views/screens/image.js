import React from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, TouchableOpacity, Text } from "react-native"; // 필요한 컴포넌트들 import
import { Ionicons } from "@expo/vector-icons";

const ImageComponent = ({ url, onChangePhoto }) => {
  // photo 입력받는 button을 눌렀을 때 실행되는 함수
  const _handlePhotoBtnPress = async () => {
    // image library 접근에 대한 허가 필요 없음
    // ImagePicker를 이용해 Image형식의 파일을 가져온다
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

     // assets 배열에서 선택한 사진의 uri 가져오기
     if (!result.canceled && result.assets.length > 0) {
        onChangePhoto(result.assets[0].uri);
      }
    };

  return (
    <View>
      <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
      <TouchableOpacity onPress={_handlePhotoBtnPress}>
      <Ionicons name="add" size={30} color="black"/>
      </TouchableOpacity>
    </View>
  );
};

export default ImageComponent;
