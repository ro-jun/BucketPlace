import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ route, navigation }) => {
    const { name: initialName, accountName: initialAccountName } = route.params;
    const [imageUrl, setImageUrl] = useState('');
    const [editedName, setEditedName] = useState(initialName);
    const [editedAccountName, setEditedAccountName] = useState(initialAccountName);

    const getMediaLibraryPermissionsAsync = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            ToastAndroid.show("Permission error!", ToastAndroid.SHORT);
            return false;
        }
    };

    const uploadImage = async () => {
        const permissionGranted = await getMediaLibraryPermissionsAsync();
        if (!permissionGranted) {
            return null;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
                aspect: [1, 1],
            });

            if (!result.canceled) {
                setImageUrl(result.assets[0].uri);
            }
        } catch (error) {
            ToastAndroid.show("Image picker error!", ToastAndroid.SHORT);
        }
    };

    const saveChanges = () => {
      navigation.navigate('Tabs', {
          screen: '마이페이지',
          params: {
              editedName: editedName,
              editedAccountName: editedAccountName
          }
      });
  };
  

    const InputWithLabel = ({ label, placeholder, value, onChangeText }) => (
      <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <TextInput
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              style={styles.input}
          />
      </View>
    );
    
    const styles = {
        container: {
            backgroundColor: 'white',
        },
        innerContainer: {
            padding: 10,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30
        },
        headerIcon: {
            fontSize: 35
        },
        headerText: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 30
        },
        saveIcon: {
            fontSize: 35, 
            color: '#3493D9'
        },
        imageSection: {
            padding: 20,
            alignItems: 'center',
        },
        profileImage: {
            width: 80,
            height: 80,
            borderRadius: 100
        },
        imageChangeText: {
            color: '#3493D9',
            marginTop: 10
        },
        formSection: {
            paddingHorizontal: 18
        },
        inputContainer: {
            paddingVertical: 10
        },
        inputLabel: {
            opacity: 0.5
        },
        input: {
            fontSize: 16,
            borderBottomWidth: 1,
            borderColor: '#CDCDCD'
        },
        otherSections: {
            marginTop: 20,
        },
        sectionText: {
            marginTop: 10,
            marginLeft: 13,
            fontSize: 15,
            padding: 5,
            color: '#3493D9',
            borderColor: '#EFEFEF',
        }
    };

    return (
      <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
              <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="close-outline" style={styles.headerIcon} />
                  </TouchableOpacity>
                  <Text style={styles.headerText}>Edit Profile</Text>
                  <TouchableOpacity onPress={saveChanges}>
                      <Ionicons name="checkmark" style={styles.saveIcon} />
                  </TouchableOpacity>
              </View>
  
              <View style={styles.imageSection}>
                  {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.profileImage} /> : null}
                  <TouchableOpacity onPress={uploadImage}>
                      <Text style={styles.imageChangeText}>프로필 사진 변경</Text>
                  </TouchableOpacity>
              </View>
  
              <View style={styles.formSection}>
                  <InputWithLabel 
                      label="이름"
                      placeholder="Name"
                      value={editedName}
                      onChangeText={setEditedName}
                  />
                  <InputWithLabel 
                      label="사용자이름"
                      placeholder="Username"
                      value={editedAccountName}
                      onChangeText={setEditedAccountName}
                  />
                  <InputWithLabel 
                      label="Website"
                      placeholder="Website"
                  />
              </View>
  
              <View style={styles.otherSections}>
                  <Text style={styles.sectionText}>다른계정으로 변경</Text>
                  <Text style={styles.sectionText}>개인정보설정</Text>
              </View>
          </View>
      </ScrollView>
  );
}

export default EditProfile;
