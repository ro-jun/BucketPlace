import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostItem = ({ imageUrl, username, caption, onPressLike, onPressComment, onPressShare, onMenuPress }) => {
  const [setCommentVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [imageExpanded, setImageExpanded] = useState(false);
  const [comments, setComments] = useState([]); // 댓글 배열 추가

  const handlePostComment = () => {
    if (commentText) {
      const newComment = {
        id: String(comments.length + 1),
        username: "user", // 사용자 이름 (임시값)
        text: commentText,
      };
  
      // 기존 댓글 배열에 새로운 댓글 추가 후 상태 업데이트
      setComments([...comments, newComment]);
  
      // 댓글 작성 및 저장이 완료되면 댓글창 닫기
      setCommentText("");
    }
  };

  const handleDeleteComment = (commentId) => {
    // 댓글 삭제 기능 구현
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  const renderComments = () => {
    return (
      <View style={styles.commentsContainer}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentText}>
              {comment.username}: {comment.text}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteComment(comment.id)}>
              <Text style={styles.deleteButton}>삭제</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  const handleImageExpand = () => {
    // 이미지 확대/축소 기능 구현
    setImageExpanded(!imageExpanded);
  };

  // 댓글창 열기
  const openComment = () => {
    setCommentVisible(true);
  };

  return (
    <View style={styles.postContainer}>
      {/* 이미지 및 캡션 */}
      <View style={styles.imageCaptionContainer}>
        {/* 이미지 표시 */}
        <TouchableOpacity onPress={handleImageExpand}>
          <Image source={{ uri: imageUrl }} style={[styles.image, imageExpanded && styles.expandedImage]} />
        </TouchableOpacity>

        {/* 캡션 표시 */}
        <View style={styles.captionContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>
      </View>

      {/* 메뉴 버튼 */}
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>

      {/* 하단 버튼 */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onPressLike} style={styles.button}>
          <Ionicons name="heart-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openComment} style={styles.button}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressShare} style={styles.button}>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* 댓글창 */}
      <View style={styles.commentContainer}>
        {renderComments()}

          {/* 댓글 입력 창 */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="댓글을 게시해주세요"
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity onPress={handlePostComment} style={styles.commentButton}>
            <Text style={styles.commentButtonText}>게시</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "column",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  imageCaptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  expandedImage: {
    width: 200,
    height: 200,
  },
  captionContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginRight: 10,
  },
  commentContainer: {
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  commentButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  commentButtonText: {
    color: "white",
  },
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  deleteButton: {
    color: "red",
    marginLeft: "auto",
  },
});

export default PostItem;
