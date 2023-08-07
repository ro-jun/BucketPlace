import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Body = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');

  const addPost = () => {
    if (newPostText.trim() !== '') {
      setPosts(prevPosts => [
        {
          id: Date.now(),
          text: newPostText.trim(),
        },
        ...prevPosts,
      ]);
      setNewPostText('');
    }
  };

  const deletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.post}>
        <Text style={styles.postText}>{item.text}</Text>
        <TouchableOpacity onPress={() => deletePost(item.id)}>
          <MaterialCommunityIcons style={styles.deleteIcon} size={20} name='delete' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='글을 적어주세요'
          autoCorrect={false}
          value={newPostText}
          onChangeText={setNewPostText}
        />
        <TouchableOpacity onPress={addPost}>
          <MaterialCommunityIcons style={styles.addIcon} size={30} name='plus-circle' />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
    },
    todo: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        height: 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    todoCheckbox: {
        marginRight: 5,
    },
    todoText: {
        flexDirection: 'row',
    },
    todoDelBtn: {
        color: '#777'
    }
});

export default Body;