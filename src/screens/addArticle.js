import {
  Alert,
  Image,
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
import { COLORS, images } from "../constants";
import { useState } from "react";
import { useAuth } from "../AuthProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import Article_API from "../API/Article_API";
import { UploadImageArticle } from "../utils/Upload";

const AddArticle = ({ navigation }) => {
  const { account } = useAuth();

  const [articleTitle, setPostTitle] = useState(null);
  const [articleContent, setArticleContent] = useState(null);
  const [articleImage, setArticleImage] = useState({});

  const [error, isError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUploadImage = async () => {
    const image = await UploadImageArticle();
    console.log(image);

    if (image) setArticleImage(image);
  };

  const handleAddPost = async () => {
    isError(true);
    if (!articleTitle) {
      setMessage("title");
      return;
    }
    if (!articleContent) {
      setMessage("content");
      return;
    }

    isError(false);
    // console.log(account.email, articleTitle, articleContent, specialty.name);
    const res = await Article_API.add_Article(
      account.email,
      articleTitle,
      articleContent,
      // specialty.name
      articleImage
    );

    if (typeof res === "object") {
      // console.log(res);
      Alert.alert("Thông báo", "Thành công.", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
      ]);
    } else Alert.alert("Thông báo", res, [{ text: "OK" }]);
  };

  const handleFocus = (field) => {
    if (message === field) {
      isError(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="always">
          <HeaderBack navigation={navigation} backgroundColor={true} />
          <Text style={styles.screenTitle}>THÔNG TIN BÀI BÁO</Text>
          <View style={styles.articleContent}>
            <View>
              <Text style={styles.specialtyLabel}>Tiêu đề:</Text>
              <TextInput
                style={styles.title}
                onFocus={() => handleFocus("title")}
                value={articleTitle}
                onChangeText={setPostTitle}
              />
            </View>
            {error && message === "title" && (
              <Text style={styles.message}>* Chưa nhập tiêu đề bài báo</Text>
            )}

            <View>
              <Text style={styles.specialtyLabel}>Đặt câu hỏi:</Text>
              <TextInput
                style={styles.content}
                numberOfLines={3}
                multiline
                onFocus={() => handleFocus("content")}
                value={articleContent}
                onChangeText={setArticleContent}
              />
            </View>
            {error && message === "content" && (
              <Text style={styles.message}>* Chưa nhập nội dung</Text>
            )}

            <View>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Text style={styles.imageLabel}>Thêm hình ảnh:</Text>
                <Pressable
                  style={{ alignSelf: "center" }}
                  onPress={() => handleUploadImage()}>
                  <Ionicons name="images" size={22} color={COLORS.blue} />
                </Pressable>
              </View>

              {articleImage?.uri && (
                <View style={styles.articleImageContainer}>
                  <Image
                    source={{ uri: articleImage.uri }}
                    style={styles.articleImage}
                  />
                  <Pressable
                    style={styles.cancelImage}
                    onPress={() => setArticleImage({})}>
                    <Ionicons
                      name="close-circle-outline"
                      size={24}
                      color={COLORS.gray}
                    />
                  </Pressable>
                </View>
              )}
            </View>
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
              <Text style={styles.buttonText}>Đăng bài</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddArticle;

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
  },
  articleContent: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  specialtyLabel: {
    marginVertical: 8,
  },
  imageLabel: {
    marginVertical: 8,
    marginRight: 10,
  },
  title: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 5,
    backgroundColor: COLORS.Concrete,
    height: 40,
  },
  content: {
    borderRadius: 5,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 250,
    backgroundColor: COLORS.Concrete,
  },
  button: {
    marginTop: 15,
    borderRadius: 5,
    color: COLORS.PersianGreen,
    padding: 8,
    marginBottom: 40
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
  articleImageContainer: {
    width: "80%",
    aspectRatio: 4 / 3,
    alignSelf: "center",
    position: "relative",
    backgroundColor: COLORS.Concrete,
    padding: 1,
    borderRadius: 10,
  },
  articleImage: {
    flex: 1,
    aspectRatio: 4 / 3,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cancelImage: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: COLORS.white,
    borderRadius: 999,
  },
});
