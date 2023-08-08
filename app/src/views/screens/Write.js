import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import _Feather from "react-native-vector-icons/Feather"
import _AntDesign from "react-native-vector-icons/AntDesign"
import { Ionicons } from '@expo/vector-icons';
import _Entypo from "react-native-vector-icons/Entypo"


const Write = () => {

const postInfo = [
    {
        postTitle: 'EunSeop',
        postPersonImage: require('./images/userProfile2.jpg'),
        postImage: require('./images/post1.jpg'),
        likes: 765,
        isLiked: false
    }
]
  
    return (
        <View>
            {
                postInfo.map((data,index) => {
                    const [like, setLike] = useState(data.isLiked)
                    return (
                        <View key={index} style={{
                            paddingBottom: 10,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.1
                        }}>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent: 'space-between',
                                padding: 15,
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image 
                                    source={data.postPersonImage} 
                                    style={{width:40, height:40, borderRadius:100}}/> 
                                    <View style={{paddingLeft: 5}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                                            {data.postTitle}
                                        </Text>
                                    </View>
                                </View>
                                <_Feather name="more-vertical" style={{fontSize:20}}/>
                            </View>
                            <View style={{
                                position:"relative",
                                justifyContent:"center",
                                alignItems:"center",
                            }}>
                                <Image source={data.postImage} style={{width:"100%", height:400}}/>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                                paddingHorizontal: 12,
                                paddingVertical: 15,
                            }}>
                                <View style={{flexDirection: 'row',alignItems:'center'}}>
                                    <TouchableOpacity onPress={()=> setLike(!like)}>
                                        <_AntDesign name={like ? 'heart' : 'hearto'} 
                                        style={{
                                            paddingRight: 10, 
                                            fontSize: 20, 
                                            color: like ? 'red' : 'black'}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Ionicons 
                                            name="ios-chatbubble-outline" 
                                            style={{fontSize:20, paddingRight: 10}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <_Feather
                                            name="navigation" 
                                            style={{fontSize:20}}/>
                                    </TouchableOpacity>
                                </View>
                                <_Feather name="bookmark" style={{fontSize: 20}}/>
                            </View>
                            <View style={{paddingHorizontal: 15}}>
                                <Text>
                                    좋아요{like ? "" : ''} {' '}
                                    {like ? data.likes + 1 : data.likes}개
                                </Text>
                                <Text style={{
                                    fontWeight: '700', 
                                    fontSize: 14, 
                                    paddingVertical: 2,}}>
                                        귀여운 내 강아지
                                </Text>
                                <Text style={{opacity:0.4, paddingVertical: 2}}>
                                    View all comments
                                </Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                                        <Image source={data.postPersonImage} 
                                        style={{
                                            width: 25, 
                                            height: 25, 
                                            borderRadius:100, 
                                            backgroundColor:'orange', 
                                            marginRight: 10}} />
                                            <TextInput 
                                                placeholder="댓글 추가하기" 
                                                style={{opacity: 0.5}}/>
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <_AntDesign
                                            name="hearto" 
                                            style={{fontSize: 15, color:"black"}}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                     )
                })
            }
        </View>
    )

}

export default Write;