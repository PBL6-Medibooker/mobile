import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";
import Account_API from "../API/Account_API";
import Post_API from "../API/Post_API";

const PostAnswerItem = ({
  item,
  myAccountEmail,
  key,
  answerKey,
  post_id,
  navigation,
}) => {
  const [replier, setReplier] = useState(null);
  const [content, setContent] = useState(item.comment_content);

  const [edit, setEdit] = useState(false);

  const handleEditAnswer = async () => {
    try {
      const updatePost = await Post_API.update_Comment(
        content,
        item._id,
        post_id
      );
      if (typeof updatePost === "object") setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getReplierNameById = async () => {
      if (item.replier?._id) {
        const replierRes = await Account_API.get_Account_By_Id(
          item.replier._id
        );
        setReplier(replierRes);
      }
    };
    getReplierNameById();
  }, [item]);

  return (
    <View style={styles.answer} key={answerKey}>
      <View style={styles.doctorInfo}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            if (replier?.__t) {
              const doctorToSend = {
                ...replier,
                name: replier.username,
              };
              navigation.navigate("DoctorInfo", {
                doctorSelected: doctorToSend,
              });
            }
          }}>
          <Image
            source={
              replier?.profile_image
                ? { uri: replier?.profile_image }
                : images.doctor_default
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={{ maxWidth: "86%" }}>
          <View style={styles.commentContainer}>
            <Text style={styles.usernameComment}>{item.replier?.username}</Text>
            {!edit && <Text style={styles.contentComment}>{content}</Text>}
          </View>
          {myAccountEmail === item?.replier?.email && !edit && (
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => setEdit(true)}>
              <FontAwesome name="edit" size={15} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {edit && (
        <View>
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.inputAnswer}
            value={content}
            onChangeText={(value) => setContent(value)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginEnd: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setEdit(false);
                setContent(item.comment_content);
              }}>
              <FontAwesome name="close" size={25} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditAnswer()}>
              <FontAwesome
                name="check"
                size={25}
                color={COLORS.PersianGreen}
                style={{ marginStart: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostAnswerItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  question: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Light20PersianGreen,
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
  imageContainer: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 999,
    borderColor: COLORS.Light20PersianGreen,
    borderWidth: 1,
    marginEnd: 10,
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
    textAlignVertical: "top",
  },
});
