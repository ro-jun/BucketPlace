import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // expo-image-picker 사용

const EditProfile = ({ route, navigation }) => {
  const { name, accountName, profileImage } = route.params;
  const [imageUrl, setImageUrl] = useState('');

  const getMediaLibraryPermissionsAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  const ToastMessage = () => {
    ToastAndroid.show('가입 성공!', ToastAndroid.SHORT);
  };
  const uploadImage = async () => {
      const permissionGranted = await getMediaLibraryPermissionsAsync();
      if (!permissionGranted) {
        return null;
      
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    
    if (result.canceled) {
      return null;
    }
    
    console.log(result);
    setImageUrl(result.assets[0].uri);
  };

  

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close-outline" style={{ fontSize: 35 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 30 }}>Edit Profile</Text>
          <TouchableOpacity onPress={() => { ToastMessage(); navigation.goBack(); }}>
            <Ionicons name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Image source={{ uri: imageUrl }} style={{ width: 80, height: 80, borderRadius: 100 }} />
          <TouchableOpacity onPress={uploadImage}>
          <Text style={{ color: '#3493D9', marginTop: 10 }}>프로필 사진 변경</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 18 }}>
          <View>
            <Text style={{ opacity: 0.5 }}>이름</Text>
            <TextInput
              placeholder="Name"
              defaultValue={name}
              style={{ fontSize: 16, borderBottomWidth: 1, borderColor: '#CDCDCD' }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <View>
              <Text style={{ opacity: 0.5 }}>사용자이름</Text>
              <TextInput
                placeholder="Username"
                defaultValue={accountName}
                style={{ fontSize: 16, borderBottomWidth: 1, borderColor: '#CDCDCD' }}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <View>
              <TextInput
                placeholder="Website"
                style={{ fontSize: 16, borderBottomWidth: 1, borderColor: '#CDCDCD' }}
              />
            </View>
          </View>
          <View>
            <TextInput
              placeholder="Bio"
              style={{ fontSize: 16, borderBottomWidth: 1, borderColor: '#CDCDCD' }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionText}>다른계정으로 변경</Text>
          <Text style={styles.sectionText}>개인정보설정</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  sectionText: {
    marginTop: 10,
    marginLeft: 13,
    fontSize: 15,
    padding: 5,
    color: '#3493D9',
    borderColor: '#EFEFEF',
  },
};

export default EditProfile;
