import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import _Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from "@react-navigation/native"

export const ProfileBody = ({ name, accountName, profileImage, post, followers, following }) => {
  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {accountName}
            </Text>
            <_Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'black',
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <_Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: 'black',
                marginLeft:220
              }}
            />
            </View>
            </TouchableOpacity>
            <TouchableOpacity>
            <View>
            <_Feather name="menu" style={{ fontSize: 25 }} />
          </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            source={profileImage}
            style={{
              resizeMode: 'cover',
              width: 80,
              height: 80,
              borderRadius: 100,
              marginLeft:-60
            }}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
              marginLeft:-60
            }}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        > 
          <Text style={{ 
            fontWeight: 'bold', 
            fontSize: 18, 
            alignItems:'center',
            }}>0</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 1 }}>{post}</Text>
          <Text>게시글</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
        </View>
      </View>
    </View>
  );
};

export const ProfileButtons = ({ id, name, accountName, profileImage }) => {
  const [follow, setFollow] = useState(true); // 기본값 true로 설정
  const navigation = useNavigation();
  return (
    <>
      {id === 0 ? (
        <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-evenly',
            paddingVertical:5,
        }}>
            <TouchableOpacity 
            onPress={()=> 
                navigation.push("EditProfile",{
                    name:name,
                    accountName: accountName,
                    profileImage: profileImage,
                })}
            style={{
                width: '100%',
            }}>
                <View style={{
                    width:'100%',
                    height:35,
                    borderColor:"#DEDEDE",
                    borderWidth: 1,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <Text style={{
                        fontWeight:'bold',
                        fontSize:14,
                        letterSpacing:1, 
                        opacity: 0.8,
                    }}>프로필 편집</Text>
                </View>
            </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{ width: '42%' }}
          >
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : '#3493D9',
                borderWidth: follow ? 1 : 0,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: follow ? 'black' : 'white',
                }}
              >
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '42%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <Text>Message</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <_Feather name="chevron-down" style={{ fontSize: 20, color: 'black' }} />
          </View>
        </View>
      )}
    </>
  );
};
