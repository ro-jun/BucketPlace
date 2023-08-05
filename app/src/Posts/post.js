import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Post = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePostSubmit = () => {
    if (newPost) {
      setPosts([...posts, newPost]);
      setNewPost("");
      setModalVisible(false);
    }
  };

  const handleDeletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>내 게시글</Text>
      <Button title="게시글 작성" onPress={() => setModalVisible(true)} />

      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <View style={styles.postContainer}>
            <Text style={styles.post}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeletePost(index)}>
              <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>게시글 작성</Text>
          <TextInput
            style={styles.modalInput}
            value={newPost}
            onChangeText={(text) => setNewPost(text)}
            placeholder="게시글 작성"
          />
          <Button title="작성 완료" onPress={handlePostSubmit} />
          <Button title="닫기" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  post: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  modalHeading: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});


export default Post;
