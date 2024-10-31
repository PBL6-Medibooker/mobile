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
import { articles } from "../utils/articles";
import { ArticleItem, HeaderHome } from "../components";
import { useAuth } from "../AuthProvider";
import usePosts from "../hooks/usePosts";
import useArticles from "../hooks/useArticles";

const Home = ({ navigation }) => {
  const { storedToken, isLoggedIn } = useAuth();
  const [articlesHook, firstArticle, fourArticles, loading] = useArticles();

  const handleBooking = () => {
    if (!isLoggedIn) {
      Alert.alert("Thông báo", "Vui lòng đăng nhập để đăng kí lịch hẹn.", [
        {
          text: "để sau",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            navigation.navigate("Login");
          },
        },
      ]);
    } else {
      navigation.navigate("Booking");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={fourArticles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <ArticleItem data={item} navigation={navigation} />}
        ListHeaderComponent={() => (
          <>
            <HeaderHome
              title="TRANG CHỦ"
              isLoggedIn={isLoggedIn}
              navigation={navigation}
            />

            <View style={styles.container}>
              <Image source={images.poster} style={styles.imgPoster} />

              <View style={styles.bookingFrame}>
                <View style={styles.separate}></View>

                <Pressable
                  onPress={() => handleBooking()}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? COLORS.Light50PersianGreen
                        : COLORS.PersianGreen,
                    },
                    styles.buttonContainer,
                  ]}>
                  <View style={styles.buttonIcon}>
                    <Entypo name="calendar" size={24} color={COLORS.white} />
                    <Text style={styles.text}>Đặt lịch khám bệnh</Text>
                  </View>
                </Pressable>

                <View style={styles.separate}></View>
              </View>
            </View>

            <View style={styles.featureFrame}>
              <View style={[styles.featureRow, { borderBottomWidth: 1 }]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Specialty")}
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <Entypo name="calendar" size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureText}>Chuyên khoa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <FontAwesome5 name="blog" size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureText}>Chuyên mục tư vấn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Doctor")}
                  style={styles.featureButton}>
                  <View style={styles.featureIcon}>
                    <FontAwesome6
                      name="user-doctor"
                      size={24}
                      color={COLORS.white}
                    />
                  </View>
                  <Text style={styles.featureText}>Bác sĩ</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.featureRow}>
                <TouchableOpacity
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <FontAwesome5
                      name="search"
                      size={24}
                      color={COLORS.white}
                    />
                  </View>
                  <Text style={styles.featureText}>Tra cứu kết quả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <MaterialIcons
                      name="miscellaneous-services"
                      size={24}
                      color={COLORS.white}
                    />
                  </View>
                  <Text style={styles.featureText}>Dịch vụ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton}>
                  <View style={styles.featureIcon}>
                    <MaterialIcons
                      name="content-paste-search"
                      size={24}
                      color={COLORS.white}
                    />
                  </View>
                  <Text style={styles.featureText}>Hướng dẫn</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Tin tức mới nhất:
              </Text>

              <TouchableOpacity
                style={styles.firstArticleContainer}
                onPress={() =>
                  navigation.navigate("ViewArticle", { post: firstArticle })
                }>
                <Image source={images.poster} style={styles.imageFirstArticle} />
                <Text style={styles.titleFirstArticle} numberOfLines={2}>
                  {firstArticle.article_title}
                </Text>
                <Text
                  style={[styles.dateFirstArticle, { alignSelf: "flex-start" }]}>
                  Đăng bởi: {firstArticle.doctor_id?.email}
                </Text>
                <View style={styles.dateFirstArticleContainer}>
                  <FontAwesome5
                    name="calendar-alt"
                    size={18}
                    color={COLORS.gray}
                  />
                  <Text style={styles.dateFirstArticle}>
                    {firstArticle.date_published}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.showAll}
                onPress={() => navigation.navigate("Articles")}>
                <Text style={styles.showAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

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
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderColor: COLORS.silver,
  },
  featureIcon: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.PersianGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    marginBottom: 5,
  },
  featureText: {
    textAlign: "center",
    fontSize: 12,
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
});
