import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProfileBody, ProfileButtons } from './ProfileBody';
import _Entypo from "react-native-vector-icons/Entypo";
import BottomTabView from './BottomTabView';

const Mypage = ({ route }) => {
  let circuls = [];
  let numberofcircels = 10;

  const [name, setName] = React.useState(route.params?.editedName || 'Ro');
  const [accountName, setAccountName] = React.useState(route.params?.editedAccountName || 'Ro');
  const [profileImage, setProfileImage] = React.useState(require("./images/userProfile2.jpg"));

  React.useEffect(() => {
    if (route.params?.editedImageUrl) {
      setProfileImage({ uri: route.params.editedImageUrl });
    }
    if (route.params?.editedName) {
      setName(route.params.editedName);
    }
    if (route.params?.editedAccountName) {
      setAccountName(route.params.editedAccountName);
    }
  }, [route.params]);

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {
          index === 0 ? (
            <View style={{
              width: 60, height: 60,
              borderRadius: 100, borderWidth: 1, opacity: 0.7, marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <_Entypo name="plus" style={{ fontSize: 40, color: 'black' }} />
            </View>
          ) : (
            <View style={{
              width: 60, height: 60, borderRadius: 100, backgroundColor: "black",
              opacity: 0.1, marginHorizontal: 5,
            }}>
            </View>
          )
        }
      </View>
    )
  }

  return (
    <View style={{ width: "100%", height: '100%', backgroundColor: 'white' }}>
      <View style={{ width: '100%', padding: 10 }}>
        <ProfileBody
          name={name}
          accountName={accountName}
          profileImage={profileImage}
          posts="458"
        />
        <ProfileButtons
          id={0}
          name={name}
          accountName={accountName}
          profileImage={profileImage}
        />
      </View>
      <BottomTabView />
    </View>
  );
};

export default Mypage;
