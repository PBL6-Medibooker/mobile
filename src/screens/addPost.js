import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown, HeaderBack } from "../components";
import { COLORS } from "../constants";
import useSpecialities from "../hooks/useSpecialities";
import { useState } from "react";
import Post_API from "../API/Post_API";
import { useAuth } from "../AuthProvider";

const AddPost = ({ navigation }) => {
  const { accountInfo } = useAuth();
  const [specialitiesHook] = useSpecialities();

  const [specialty, setSpecialty] = useState(null);
  const [postTitle, setPostTitle] = useState(null);
  const [postContent, setPostContent] = useState(null);

  const [error, isError] = useState(false);
  const [message, setMessage] = useState(null);

  const [openedDropdown, setOpenedDropdown] = useState(null);

  const handleAddPost = async () => {
    isError(true);
    if (!specialty) {
      setMessage("specialty");
      return;
    }
    if (!postTitle) {
      setMessage("title");
      return;
    }
    if (!postContent) {
      setMessage("content");
      return;
    }

    isError(false);
    console.log(accountInfo.email, postTitle, postContent, specialty.name);
    const res = await Post_API.add_New_Post(
      accountInfo.email,
      postTitle,
      postContent,
      specialty.name
    );

    if (typeof res === "object") {
      console.log(res);
      Alert.alert("Thông báo", "Đặt câu hỏi cho chuyên gia thành công.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Forum");
          },
        },
      ]);
    } else Alert.alert("Thông báo", res, [{ text: "OK" }]);
  };

  const handleFocus = (field) => {
    if (message === field) {
      isError(false);
    }
    if (field === "specialty") setOpenedDropdown(field);
    else setOpenedDropdown(null)
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setOpenedDropdown(null)}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="always">
            <HeaderBack navigation={navigation} backgroundColor={true} />
            <Text style={styles.screenTitle}>ĐẶT CÂU HỎI CHO CHUYÊN GIA</Text>
            <View style={styles.postContent}>
              <View>
                <Text style={styles.specialtyLabel}>
                  Bạn gửi tư vấn đến khoa:
                </Text>
                <Dropdown
                  data={specialitiesHook}
                  placeholder="Chuyên khoa"
                  onFocus={() => handleFocus("specialty")}
                  value={specialty}
                  onChange={setSpecialty}
                  expanded={openedDropdown === "specialty"}
                  setExpanded={setOpenedDropdown}
                />
              </View>
              {error && message === "specialty" && (
                <Text style={styles.message}>
                  * Chưa chọn chuyên khoa cần tư vấn
                </Text>
              )}
              <View>
                <Text style={styles.specialtyLabel}>Tiêu đề:</Text>
                <TextInput
                  style={styles.title}
                  onFocus={() => handleFocus("title")}
                  value={postTitle}
                  onChangeText={setPostTitle}
                />
              </View>
              {error && message === "title" && (
                <Text style={styles.message}>* Chưa nhập tiêu đề câu hỏi</Text>
              )}
              <View>
                <Text style={styles.specialtyLabel}>Đặt câu hỏi:</Text>
                <TextInput
                  style={styles.content}
                  numberOfLines={3}
                  multiline
                  onFocus={() => handleFocus("content")}
                  value={postContent}
                  onChangeText={setPostContent}
                />
              </View>
              {error && message === "content" && (
                <Text style={styles.message}>* Chưa nhập nội dung câu hỏi</Text>
              )}
              <Pressable
                onPress={handleAddPost}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? COLORS.Light50PersianGreen
                      : COLORS.PersianGreen,
                  },
                  styles.button,
                ]}>
                <Text style={styles.buttonText}>Tiếp theo</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  screenTitle: {
    color: COLORS.PersianGreen,
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  postContent: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
  },
  specialtyLabel: {
    marginVertical: 8,
  },
  title: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  content: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 10,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 100,
  },
  button: {
    marginTop: 15,
    borderRadius: 999,
    color: COLORS.PersianGreen,
    padding: 8,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  message: {
    color: COLORS.red,
    fontSize: 12,
  },
});
