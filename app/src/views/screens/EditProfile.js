import React from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditProfile = ({ route, navigation }) => {
  const { name, accountName, profileImage } = route.params;
  const ToastMessage = () => {
    ToastAndroid.show('가입 성공!', ToastAndroid.SHORT);
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
          <Image source={profileImage} style={{ width: 80, height: 80, borderRadius: 100 }} />
          <Text style={{ color: '#3493D9', marginTop: 10 }}>Change profile photo</Text>
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
    marginVertical: 10,
    padding: 10,
    color: '#3493D9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
};

export default EditProfile;
