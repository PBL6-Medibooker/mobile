import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack, PostAnswerItem } from "../components";

import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { it, tr, vi } from "date-fns/locale";
import { useAuth } from "../AuthProvider";
import Post_API from "../API/Post_API";
import Ionicons from "@expo/vector-icons/Ionicons";

const QADetail = ({ navigation, route }) => {
  const { QA } = route.params || {};

  const { account, isLoggedIn } = useAuth();

  const [post, setPost] = useState(QA);
  const [myAnswer, setMyAnswer] = useState(null);

  const handleAddAnswer = async () => {
    try {
      const res = await Post_API.add_Comment(post._id, account.email, myAnswer);
      // console.log(res);
      if (typeof res === "object") {
        setPost(res);
        setMyAnswer(null);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleDeleteAnswer = (id) => {
    console.log(id);
    const cmt = post.post_comments.filter((item) => item._id !== id);
    setPost({ ...post, post_comments: cmt });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={100}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBack navigation={navigation} backgroundColor={true} />

          <View style={styles.question}>
            <Text style={styles.title}>{post.post_title}</Text>
            <View style={styles.userInfo}>
              <AntDesign
                name="message1"
                size={18}
                color={COLORS.PersianGreen}
              />
              <Text style={styles.userName}>{post.user_id.email}</Text>
            </View>
            <View style={styles.specialty}>
              <Text style={{ fontSize: 12 }}>
                #{post.speciality_id?.name?.replace(/\s/g, "")}
              </Text>
            </View>
            <Text style={styles.content}>{post.post_content}</Text>
            <Text style={styles.createdDate}>
              Đăng lúc:{" "}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: vi,
              })}
            </Text>
          </View>

          {post.post_comments?.length > 0 &&
            post.post_comments.map((item) => (
              <PostAnswerItem
                item={item}
                myAccountEmail={account?.email}
                key={item._id}
                answerKey={item._id}
                post_id={post._id}
                navigation={navigation}
                onDeleted={handleDeleteAnswer}
              />
            ))}

          <View style={{ height: 70 }} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            paddingVertical: 6,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            // borderWidth: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: 15,
            alignItems: "center",
            elevation: 3,
          }}>
          <TextInput
            style={{
              borderWidth: 1.5,
              flex: 1,
              borderRadius: 999,
              borderColor: COLORS.silver,
              // fontSize: 12,
              paddingHorizontal: 15,
              paddingVertical: 5,
              height: 38
            }}
            placeholder="Nhập câu trả lời ..."
            value={myAnswer}
            onChangeText={(value) => setMyAnswer(value)}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              if (isLoggedIn && account?.email) handleAddAnswer();
              else {
                Alert.alert(
                  "Thông báo",
                  "Bạn cần đăng nhập để tiếp tục thao tác!",
                  [
                    {
                      text: "Để sau",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => navigation.navigate("Login"),
                    },
                  ]
                );
              }
            }}>
            <Ionicons
              name="send"
              size={30}
              color={COLORS.PersianGreen}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default QADetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  question: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.Light20PersianGreen,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.PersianGreen,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 3,
    alignItems: "center",
  },
  userName: {
    color: COLORS.PersianGreen,
    marginStart: 5,
  },
  content: {
    textAlign: "justify",
  },
  specialty: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: COLORS.Concrete,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  answer: {
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingTop: 15,
    width: "100%",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 999,
    borderColor: COLORS.Light20PersianGreen,
    borderWidth: 1,
    marginEnd: 10,
  },
  doctorInfo: {
    flexDirection: "row",
    marginBottom: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderColor: COLORS.PersianGreen
  },
  createdDate: {
    fontSize: 12,
    textAlign: "right",
    paddingTop: 5,
    marginTop: 5,
    color: COLORS.gray,
  },
  commentContainer: {
    backgroundColor: COLORS.silver,
    padding: 8,
    borderRadius: 10,
    position: "relative",
  },
  usernameComment: {
    fontWeight: "bold",
  },
  editIcon: {
    position: "absolute",
    bottom: -18,
    right: 0,
  },
  contentComment: {},
  inputAnswer: {
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    borderColor: COLORS.silver,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputAnswer: {
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    borderColor: COLORS.silver,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
});
