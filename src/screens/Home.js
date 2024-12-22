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
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ArticleItem, HeaderHome } from "../components";
import { useAuth } from "../AuthProvider";
import useArticles from "../hooks/useArticles";
import { useCallback, useEffect } from "react";
import useCustomFonts from "../hooks/useCustomFonts";
import { useFocusEffect } from "@react-navigation/native";
import { formatToDDMMYYYY, formatToHHMMSS } from "../utils/ConvertDate";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const fontsLoaded = useCustomFonts();

  const { isLoggedIn, error, account } = useAuth();
  const [
    articlesHook,
    firstArticle,
    fourArticles,
    loading,
    getArticlesBySpecialty,
    getArticlesByDoctor,
    filterArticles,
  ] = useArticles();

  // useEffect(() => {
  //   if (!isLoggedIn && error !== null)
  //     Alert.alert("Thông báo", error, [{ text: "OK" }]);
  // }, [error]);

  useFocusEffect(
    useCallback(() => {
      filterArticles();
    }, [navigation])
  );

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
        ItemSeparatorComponent={() => <View style={styles.separateFlat} />}
        renderItem={({ item }) => (
          <ArticleItem data={item} navigation={navigation} />
        )}
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

                {isLoggedIn && account?.__t === "Doctor" ? (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("BookingHistory");
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? COLORS.Light50PersianGreen
                          : COLORS.PersianGreen,
                      },
                      styles.buttonContainer,
                    ]}>
                    <View style={styles.buttonIcon}>
                      <Ionicons
                        name="wallet-outline"
                        size={24}
                        color={COLORS.white}
                      />
                      <Text style={styles.text}>Cuộc hẹn của tôi</Text>
                    </View>
                  </Pressable>
                ) : (
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
                )}

                <View style={styles.separate}></View>
              </View>
            </View>

            <View style={styles.featureFrame}>
              <View style={styles.featureRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Specialty")}
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <AntDesign name="book" size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureText}>Chuyên khoa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Forum")}
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <FontAwesome5 name="blog" size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureText}>Chuyên mục tư vấn</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (account?.__t !== "Doctor")
                      navigation.navigate("Doctor");
                    else navigation.navigate("MyArticle");
                  }}
                  style={styles.featureButton}>
                  <View style={styles.featureIcon}>
                    {account?.__t !== "Doctor" ? (
                      <FontAwesome6
                        name="user-doctor"
                        size={24}
                        color={COLORS.white}
                      />
                    ) : (
                      <FontAwesome name="list-alt" size={24} color={COLORS.white} />
                    )}
                  </View>
                  <Text style={styles.featureText}>
                    {account?.__t !== "Doctor" ? "Bác sĩ" : "Tin tức của tôi"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Tin tức mới nhất:
              </Text>

              {firstArticle?.article_title && (
                <TouchableOpacity
                  style={styles.firstArticleContainer}
                  onPress={() =>
                    navigation.navigate("ViewArticle", { post: firstArticle })
                  }>
                  <Image
                    source={
                      firstArticle?.article_image
                        ? { uri: firstArticle.article_image }
                        : images.poster
                    }
                    style={styles.imageFirstArticle}
                  />
                  <Text style={styles.titleFirstArticle} numberOfLines={2}>
                    {firstArticle.article_title}
                  </Text>
                  <Text
                    style={[
                      styles.dateFirstArticle,
                      { alignSelf: "flex-start" },
                    ]}>
                    Đăng bởi: {firstArticle.doctor_id?.email}
                  </Text>
                  <View style={styles.dateFirstArticleContainer}>
                    <FontAwesome5
                      name="calendar-alt"
                      size={18}
                      color={COLORS.gray}
                    />
                    <Text style={styles.dateFirstArticle}>
                      {formatToHHMMSS(firstArticle.date_published)}{" "}
                      {formatToDDMMYYYY(firstArticle.date_published)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              <TextInput />

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
    paddingTop: 10,
    paddingHorizontal: 5,
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
    height: 1,
    backgroundColor: COLORS.silver,
    marginHorizontal: 15,
    borderRadius: 999,
    marginTop: 15,
  },
});
