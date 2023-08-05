import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text, TextInput, Modal, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Post from "./PostItem";

const App = () => {
  const [posts, setPosts] = useState([
    // 기존 게시글 데이터
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleLike = (postId) => {
    // 좋아요 기능 구현
  };

  const handleComment = (postId) => {
    // 댓글 기능 구현
  };

  const handleShare = (postId) => {
    // 공유 기능 구현
  };

  const handleAddPost = () => {
    if (newPost) {
      const newPostData = {
        id: String(posts.length + 1),
        imageUrl: selectedImage ? selectedImage.assets[0].uri : "https://example.com/new_image.jpg",
        username: "user",
        caption: newPost,
      };
      setPosts([...posts, newPostData]);
      setNewPost("");
      setSelectedImage(null);
      setModalVisible(false);
    }
  };

  const handleDeletePost = () => {
    if (selectedPostId) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPostId));
      setSelectedPostId(null);
    }
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post
            imageUrl={item.imageUrl}
            username={item.username}
            caption={item.caption}
            onPressLike={() => handleLike(item.id)}
            onPressComment={() => handleComment(item.id)}
            onPressShare={() => handleShare(item.id)}
            onMenuPress={() => setSelectedPostId(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>새로운 게시글 작성</Text>
          <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage.assets[0].uri }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="add" size={30} color="black" />
            )}
          </TouchableOpacity>
          <TextInput
            style={styles.modalInput}
            value={newPost}
            onChangeText={(text) => setNewPost(text)}
            placeholder="게시글 작성"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleAddPost}>
            <Text style={styles.modalButtonText}>작성 완료</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {selectedPostId && (
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handleDeletePost} style={styles.menuItem}>
            <Ionicons name="trash-outline" size={24} color="black" />
            <Text style={styles.menuText}>게시글 삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedPostId(null)} style={styles.menuItem}>
            <Ionicons name="close" size={24} color="black" />
            <Text style={styles.menuText}>닫기</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
  imagePicker: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  menuContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default App;
