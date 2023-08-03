import React, { useState } from 'react';
import {View, Text, StyleSheet } from "react-native";
import Body from '../../post/Body';

const Write = () => {
    const [posts, setPosts] = useState([]);
  
    const addPosts = (post) => {
      const newPosts = {
        id: Date.now(),
        text: post,
        completed: false,
      };
      setPosts((prevState) => [newPosts, ...prevState]);
    };
  
    console.log(posts);
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Post</Text>
        <Body />
      </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 30,
        backgroundColor: "#EEE",
      },
    title: {
        fontWeight: "800",
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20,
    }
})

export default Write;
