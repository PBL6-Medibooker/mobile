import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";
import { COLORS, images } from "../constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { UploadImage } from "../utils/Upload";
import { useState } from "react";

const UserProfile = ({ navigation }) => {
  const { storedToken } = useAuth();

  const [uriAvatar, setUriAvatar] = useState(null);

  const handleUploadImage = async () => {
    const image = await UploadImage();
    if (image) {
      console.log("image selected", image);
      setUriAvatar(image.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="My Profile" />
      <View style={styles.contentTitle}>
        <View style={styles.myAvatar}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => {}}>
            <Image
              source={uriAvatar ? { uri: uriAvatar } : images.user_default}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleUploadImage();
            }}
            style={styles.uploadAvatar}>
            <MaterialIcons name="photo-camera" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.myBasicInformation}>
          <Text style={styles.text}>Huệ Lê</Text>
          <Text style={styles.text}>0343403432</Text>
          <Text style={styles.text}>lehue@gmail.com</Text>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.item}>
          <Ionicons name="person-outline" size={28} style={styles.iconItem} />
          <Text style={styles.textItem}>Chỉnh Sửa Hồ Sơ</Text>
          <Ionicons
            name="chevron-forward"
            size={28}
            color={COLORS.PersianGreen}
          />
        </View>

        <View style={styles.item}>
          <Ionicons name="wallet-outline" size={28} style={styles.iconItem} />
          <Text style={styles.textItem}>Cuộc Hẹn Của Tôi</Text>
          <Ionicons
            name="chevron-forward"
            size={28}
            color={COLORS.PersianGreen}
          />
        </View>

        <View style={styles.item}>
          <MaterialIcons
            name="lock-outline"
            size={28}
            style={styles.iconItem}
          />
          <Text style={styles.textItem}>Chính Sách Riêng Tư</Text>
          <Ionicons
            name="chevron-forward"
            size={28}
            color={COLORS.PersianGreen}
          />
        </View>

        <View style={styles.item}>
          <Ionicons name="settings-outline" size={28} style={styles.iconItem} />
          <Text style={styles.textItem}>Cài Đặt</Text>
          <Ionicons
            name="chevron-forward"
            size={28}
            color={COLORS.PersianGreen}
          />
        </View>

        <View style={styles.item}>
          <MaterialIcons
            name="question-mark"
            size={28}
            style={styles.iconItem}
          />
          <Text style={styles.textItem}>Trợ Giúp</Text>
          <Ionicons
            name="chevron-forward"
            size={28}
            color={COLORS.PersianGreen}
          />
        </View>

        <View style={styles.item}>
          <Ionicons name="log-out-outline" size={28} style={styles.iconItem} />
          <Text style={styles.textItem}>Đăng Xuất</Text>
          <Ionicons
            name="chevron-forward"
            size={28}
            color={COLORS.PersianGreen}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentTitle: {
    backgroundColor: COLORS.PersianGreen,
    flexDirection: "row",
    paddingVertical: 20,
    paddingStart: 25,
  },
  myAvatar: {
    width: 120,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 40,
    marginRight: 12,
    backgroundColor: COLORS.silver,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  uploadAvatar: {
    position: "absolute",
    top: 91,
    start: 91,
    backgroundColor: COLORS.white,
    padding: 2,
    borderRadius: 999,
  },
  myBasicInformation: {
    justifyContent: "space-between",
    marginVertical: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
  },
  mainContainer: {
    flex: 1,
    margin: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconItem: {
    color: COLORS.Light50PersianGreen,
    backgroundColor: COLORS.PersianGreen,
    padding: 14,
    borderRadius: 999,
  },
  textItem: {
    fontSize: 20,
    flex: 1,
    marginHorizontal: 10,
    paddingStart: 5,
  },
});
