import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ArticleItem, HeaderBack, HeaderHome } from "../components";
import { useAuth } from "../AuthProvider";
import useArticles from "../hooks/useArticles";
import { useCallback, useEffect, useState } from "react";
import useCustomFonts from "../hooks/useCustomFonts";
import { useFocusEffect } from "@react-navigation/native";
import Article_API from "../API/Article_API";

const MyArticles = ({ navigation }) => {
  const [myArticles, setMyArticles] = useState([]);
  const { account, isLoggedIn } = useAuth();

  // State để quản lý thông báo
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const showTemporaryNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Ẩn sau 1 giây
  };

  useFocusEffect(
    useCallback(() => {
      const getMyArticle = async () => {
        try {
          const myArticles = await Article_API.getArticlesByDoctor(
            account?.email
          );

          setMyArticles(myArticles);
        } catch (error) {
          console.error(error);
        }
      };

      getMyArticle();
    }, [])
  );

  const handle_Delete_Article = async (articleId) => {
    try {
      const deleteArticle = await Article_API.soft_Delete_Article(articleId);
      if (deleteArticle?.modifiedCount > 0) {
        // Alert.alert("Thông báo", "Tin tức đã được chuyển vào thùng rác.")
        showTemporaryNotification("Tin tức đã được chuyển vào thùng rác.");
        setMyArticles(myArticles.filter((item) => item._id !== articleId));
      } else {
        showTemporaryNotification(res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderBack navigation={navigation} title="Tin Tức của bạn" />
      <FlatList
        data={myArticles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separateFlat} />}
        ListFooterComponent={() => <View style={{ height: 30 }} />}
        renderItem={({ item }) => (
          <>
            <ArticleItem data={item} navigation={navigation} />
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 12,
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddArticle", {
                    status: "update",
                    article: item,
                  })
                }
                style={{
                  backgroundColor: COLORS.blue,
                  padding: 5,
                  flex: 1,
                  borderRadius: 10,
                  marginRight: 10,
                  marginLeft: 100,
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontWeight: "bold",
                  }}>
                  Chỉnh sửa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handle_Delete_Article(item._id)}
                style={{
                  backgroundColor: COLORS.gray,
                  padding: 5,
                  flex: 1,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.white,
                    fontWeight: "bold",
                  }}>
                  Xoá
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />

      {showNotification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notificationMessage}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddArticle", { status: "add" })}>
        <FontAwesome6 name="add" size={42} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyArticles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  featureFrame: {
    marginHorizontal: 30,
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.silver,
    // elevation: 5,
    backgroundColor: COLORS.white,
    // shadowColor: COLORS.PersianGreen,
  },
  bookingFrame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  featureRow: {
    flexDirection: "row",
    borderColor: COLORS.silver,
  },
  featureButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 4,
    borderColor: COLORS.silver,
  },
  featureIcon: {
    aspectRatio: 1,
    width: 40,
    backgroundColor: COLORS.PersianGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    // marginBottom: 5,
  },
  featureText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Poppins_Regular",
    // textAlignVertical: "center",
    marginVertical: 4,
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    color: COLORS.white,
    fontWeight: "bold",
  },
  imgPoster: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  buttonContainer: {
    width: "70%",
    marginHorizontal: 6,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.Light20PersianGreen,
    color: COLORS.PersianGreen,
  },
  buttonIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  separate: {
    width: "10%",
    height: 3,
    backgroundColor: COLORS.PersianGreen,
    borderRadius: 999,
  },
  firstArticleContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  imageFirstArticle: {
    height: 150,
    resizeMode: "cover",
    width: "95%",
  },
  titleFirstArticle: {
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    color: COLORS.blue,
    textAlign: "justify",
    marginTop: 5,
    textAlign: "left",
  },
  dateFirstArticleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5,
  },
  dateFirstArticle: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 5,
  },
  showAll: {
    color: COLORS.blue,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
  separateFlat: {
    height: 1.5,
    backgroundColor: COLORS.silver,
    marginHorizontal: 15,
    borderRadius: 999,
    marginTop: 15,
  },
  notification: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    alignItems: "center",
    zIndex: 20,
  },
  notificationText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 25, // Khoảng cách từ đáy màn hình
    right: 25,
    backgroundColor: COLORS.PersianGreen,
    borderRadius: 999,
    height: 55,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
