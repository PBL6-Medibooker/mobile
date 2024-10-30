import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";
import { formatToDDMMYYYY, formatToHHMMSS } from "../utils/ConvertDate";
import usePosts from "../hooks/usePosts";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { windowWidth } from "../utils/Dimentions";

const ViewArticle = ({ navigation, route }) => {
  const { post } = route.params || {};
  const [postsHook, firstPost, fourPosts] = usePosts();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} backgroundColor={true} />

        {post ? (
          <View style={styles.articleContainer}>
            <Text style={styles.postTitle}>{post.post_title}</Text>
            <Text style={styles.postSpecialty}>{post.speciality_id.name}</Text>
            <Text style={styles.postContent}>{post.post_content}</Text>
            <Text style={styles.postCreatedAt}>
              Đăng lúc: {formatToHHMMSS(post.createdAt)}{" "}
              {formatToDDMMYYYY(post.createdAt)}
            </Text>
          </View>
        ) : (
          <Text>Không nhận được dữ liệu</Text>
        )}

        <Text style={styles.relatedPost}>Bài viết liên quan</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: 15 }}>
          {fourPosts.map((post) => (
            <View key={post._id}>
              <TouchableOpacity style={styles.suggestedPost}>
                <Image
                  source={images.poster}
                  style={styles.imageSuggestedPost}
                />
                <Text style={styles.titleSuggestedPost} numberOfLines={2}>
                  {post.post_title}
                </Text>
                <View style={styles.dateSuggestedPostContainer}>
                  <FontAwesome5
                    name="calendar-alt"
                    size={15}
                    color={COLORS.gray}
                  />
                  <Text style={styles.dateSuggestedPost}>{post.createdAt}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  articleContainer: {
    marginHorizontal: 15,
  },
  postTitle: {
    color: COLORS.PersianGreen,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  postSpecialty: {
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  postCreatedAt: {
    color: COLORS.gray,
    textAlign: "right",
    marginBottom: 5,
  },
  relatedPost: {
    color: COLORS.PersianGreen,
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  suggestedPost: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.PersianGreen,
    alignItems: "center",
    width: windowWidth / 4 * 3,
    borderWidth: 0.5,
    borderColor: COLORS.Light20PersianGreen,
    marginRight: 15,
  },
  imageSuggestedPost: {
    height: 120,
    resizeMode: "cover",
    width: "100%",
  },
  titleSuggestedPost: {
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
    color: COLORS.blue,
    textAlign: "justify",
    marginTop: 5,
  },
  dateSuggestedPostContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5,
  },
  dateSuggestedPost: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 5,
  },
});
