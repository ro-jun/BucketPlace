import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import { ProfileBody, ProfileButtons } from './ProfileBody';
import _Entypo from "react-native-vector-icons/Entypo";
import BottomTabView from './BottomTabView';

const Mypage = () => {
  let circuls = [];
  let numberofcircels = 10

  for (let index = 0; index< numberofcircels; index ++){
    circuls.push(
      <View key = {index}>
        {
          index === 0 ? (
            <View style={{
              width:60, height:60,
              borderRadius:100, borderWidth:1, opacity:0.7, marginHorizontal:5,
              justifyContent:'center',
              alignItems:'center',
            }}>
              <_Entypo name="plus" style={{fontSize: 40, color: 'black'}}/>
            </View>
          ) : (
            <View style={{
              width:60, height:60, borderRadius:100, backgroundColor:"black",
              opacity:0.1, marginHorizontal: 5,
            }}>
            </View>
          )
        }
      </View>
    )
  }


<<<<<<< HEAD

=======
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
  return (
    <View style={{width:"100%", height: '100%', backgroundColor: 'white'}}>
      <View style={{width:'100%', padding:10}}>
        <ProfileBody
        name="EunSeop"
        accountName="EunSeop"
<<<<<<< HEAD
        profileImage={require("../../images/userProfile2.jpg")}
        posts="0"
=======
        profileImage={require("./images/userProfile2.jpg")}
        followers="??"
        following="??"
        posts="458"
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
        />
        <ProfileButtons 
          id={0} 
          name="ProfileBody.name" 
          accountName="ProfileBody.accountName"
<<<<<<< HEAD
          profileImage={require("../../images/userProfile2.jpg")}
          />
      </View>
=======
          profileImage={require("./images/userProfile2.jpg")}
          />
      </View>
      <View>
      </View>
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
      <BottomTabView/>
    </View>
  );
  };

export default Mypage;