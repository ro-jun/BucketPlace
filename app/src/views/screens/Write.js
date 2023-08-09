import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(item.id)}>
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.postHeader}>
        <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.avatar} />
        <Text style={styles.author}>{item.author}</Text>
      </View>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
      )}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={18} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleCommentForm(item.id)}>
          <Icon name="comment" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      {item.showCommentForm && (
        <View style={styles.commentFormContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 작성하세요."
            multiline
            value={item.comment}
            onChangeText={text => updateComment(item.id, text)}
          />
          <TouchableOpacity style={styles.commentButton} onPress={() => addComment(item.id)}>
            <Text style={styles.commentButtonText}>작성</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.comments && item.comments.length > 0 && (
        <View style={styles.commentList}>
          {item.comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>{comment}</Text>
          ))}
        </View>
      )}
    </View>
  );

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  const toggleCommentForm = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, showCommentForm: !post.showCommentForm, comment: '' };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const updateComment = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comment };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const addComment = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId && post.comment.trim() !== '') {
        return { ...post, comments: [...post.comments, post.comment], comment: '', showCommentForm: false };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const renderPlusButton = () => (
    <TouchableOpacity style={styles.plusButton} onPress={() => setShowPostForm(true)}>
      <Icon name="plus" size={24} color="white" />
    </TouchableOpacity>
  );

  const renderPostForm = () => (
    <View style={styles.postFormContainer}>
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>사진을 선택해주세요.</Text>
      </TouchableOpacity>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.selectedImage} />}
      {showPostForm && (
        <>
          <TextInput
            style={[styles.input, styles.contentInput]}
            placeholder="게시글 내용"
            multiline
            value={postContent}
            onChangeText={text => setPostContent(text)}
          />
          <TouchableOpacity style={styles.postButton} onPress={addNewPost}>
            <Text style={styles.postButtonText}>게시</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const addNewPost = () => {
    const newPost = {
      id: posts.length + 1,
      imageUrl: imageUrl || 'https://example.com/default-image.jpg',
      author: 'user1',
      content: postContent,
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostContent('');
    setImageUrl(null);
    setShowPostForm(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={item => item.id.toString()}
      />
      {showPostForm ? renderPostForm() : renderPlusButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  postContent: {
    padding: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postFormContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePickerButton: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  imagePickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  commentFormContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  commentButton: {
    padding: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  commentButtonText: {
    color: 'white',
  },
  commentList: {
    marginTop: 10,
  },
  commentText: {
    marginBottom: 5,
  },
});

export default FeedScreen;
