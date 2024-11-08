import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import Account_API from "../API/Account_API";
import { useAuth } from "../AuthProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import Post_API from "../API/Post_API";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const QandAItem = ({ item, navigation }) => {
  const [isViewAnswer, setIsViewAnswer] = useState(false);
  const [isReplied, setIsReplied] = useState(false);
  const [comment, setComment] = useState(null);

  const [doctorsHook, getDoctorsBySpecialtyAndRegion, loading] = useAccount();
  const { accountInfo } = useAuth();
  const [postItem, setPostItem] = useState(item);

  const [replier, setReplier] = useState(null);

  useEffect(() => {
    const getReplierNameById = async () => {
      if (postItem.post_comments && postItem.post_comments.length > 0) {
        const replierRes = await Account_API.get_Account_By_Id(
          postItem.post_comments[0]?.replier
        );
        setReplier(replierRes);
      }
    };
    getReplierNameById();
  }, [postItem]);

  const toggleShowFullText = () => {
    navigation.navigate("QADetail", { QA: postItem, replier: replier });
  };

  const handleSendAnswer = async () => {
    try {
      console.log(postItem._id, accountInfo.email, comment);

      const res = await Post_API.add_Comment(
        postItem._id,
        accountInfo.email,
        comment
      );
      console.log(res);
      if (typeof res === "object") {
        console.log("success");
        setPostItem(res);
        setIsViewAnswer(true);
        setIsReplied(false);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.question} onPress={toggleShowFullText}>
        <Text style={styles.title}>{postItem?.post_title}</Text>
        <View style={styles.userInfo}>
          <AntDesign name="message1" size={18} color={COLORS.PersianGreen} />
          <Text style={styles.userName}>{postItem?.user_id?.email}</Text>
        </View>
        <View style={styles.specialty}>
          <Text style={{ fontSize: 12 }}>
            #{postItem?.speciality_id?.name?.replace(/\s/g, "")}
          </Text>
        </View>
        <Text style={styles.createdDate}>
          {formatDistanceToNow(new Date(postItem.createdAt), {
            addSuffix: true,
            locale: vi,
          })}
        </Text>
        <Text style={styles.content} numberOfLines={7}>
          {postItem?.post_content}
        </Text>

        {postItem?.post_comments?.length > 0 && (
          <Pressable
            onPress={() => {
              setIsViewAnswer(!isViewAnswer);
            }}
            style={{ alignSelf: "flex-end" }}>
            <Text style={styles.viewText}>Xem câu trả lời</Text>
          </Pressable>
        )}

        {postItem?.post_comments?.length === 0 &&
          accountInfo?.__t === "Doctor" && (
            <Pressable
              onPress={() => {
                setIsReplied(!isReplied);
              }}
              style={{ alignSelf: "flex-end" }}>
              <Text style={styles.viewText}>Trả lời</Text>
            </Pressable>
          )}
      </TouchableOpacity>

      {isReplied && (
        <View style={styles.answerQuestion}>
          <TextInput
            style={styles.inputAnswer}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.sendButton}
            onPress={() => handleSendAnswer()}>
            <Ionicons name="send" size={15} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {isViewAnswer && postItem?.post_comments?.length > 0 && (
        <View style={styles.answer}>
          <View style={styles.doctorInfo}>
            <Pressable>
              <Image
                source={
                  replier?.profile_image
                    ? { uri: `data:image/png;base64,${replier?.profile_image}` }
                    : images.doctor_default
                }
                style={styles.image}
              />
            </Pressable>
            <View style={styles.doctorProfile}>
              <Pressable>
                <Text>{replier?.username || "Bác sĩ"}</Text>
              </Pressable>
              <Text>Bác sĩ</Text>
            </View>
          </View>
          <Text numberOfLines={4} style={styles.content}>
            {postItem?.post_comments[0].comment_content}
          </Text>

          {postItem?.post_comments[0].comment_content.length > 100 && (
            <TouchableOpacity
              onPress={toggleShowFullText}
              style={{ alignSelf: "flex-start" }}>
              <Text style={styles.viewText}>Xem thêm</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default QandAItem;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // backgroundColor: COLORS.white,
  },
  question: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: COLORS.silver,
    backgroundColor: COLORS.white,
    zIndex: 1,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  user: {
    flexDirection: "row",
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "space-between",
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
  viewText: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  answer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: COLORS.Concrete,
    marginBottom: 10,
    marginTop: -10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 999,
    borderColor: COLORS.gray,
    borderWidth: 0.5,
    marginEnd: 15,
  },
  doctorInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  doctorProfile: {
    alignSelf: "center",
  },
  answerQuestion: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: COLORS.Concrete,
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginTop: -10,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  inputAnswer: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 999,
    flex: 1,
    paddingHorizontal: 15,
    height: 35,
    backgroundColor: COLORS.white,
  },
  sendButton: {
    backgroundColor: COLORS.PersianGreen,
    padding: 8,
    borderRadius: 999,
    height: 32,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  createdDate: {
    fontSize: 12,
    textAlign: 'right',
    borderTopWidth: 1.5,
    borderColor: COLORS.Light20PersianGreen,
    paddingTop: 5,
    marginTop: 5,
    color: COLORS.gray
  }
});
