import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { articles } from "../utils/articles";
import { useNavigation } from "@react-navigation/native";
import { ArticleItem, HeaderHome } from "../components";

const dataArticles = articles.map((s) => ({
  title: s.title,
  id: s.id,
  content: s.content,
  date: s.date,
}));

const Home = ({ route }) => {
  const navigation = useNavigation();

  const { user } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={dataArticles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ArticleItem data={item} />}
        ListHeaderComponent={() => (
          <>
            <HeaderHome title="TRANG CHỦ" user={user} navigation={navigation} />

            <View style={styles.container}>
              <Image source={images.poster} style={styles.imgPoster} />

              <View
                style={styles.bookingFrame}>
                <View style={styles.separate}></View>

                <Pressable
                  onPress={() => navigation.navigate("Booking")}
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
                  style={[styles.featureButton, { borderRightWidth: 1 }]}>
                  <View style={styles.featureIcon}>
                    <FontAwesome5 name="blog" size={24} color={COLORS.white} />
                  </View>
                  <Text style={styles.featureText}>Chuyên mục tư vấn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.featureButton}>
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
  },
  bookingFrame:{
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
});
