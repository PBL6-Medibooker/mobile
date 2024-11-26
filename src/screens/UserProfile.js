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
import Account_API from "../API/Account_API";

const UserProfile = ({ navigation }) => {
  const { storedToken, isLoggedIn, account } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="My Profile" />
      <View style={styles.contentTitle}>
        <View style={styles.myAvatar}>
          <TouchableOpacity activeOpacity={0.85} onPress={() => {}}>
            <Image
              source={
                account?.profile_image
                  ? { uri: account.profile_image }
                  : images.user_default
              }
              style={styles.image}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleUploadImage();
            }}
            style={styles.uploadAvatar}>
            <MaterialIcons name="photo-camera" size={22} color={COLORS.gray} />
          </TouchableOpacity> */}
        </View>

        <View
          style={[
            styles.myBasicInformation,
            !account?.__t && { paddingVertical: 5 },
          ]}>
          <Text style={styles.text}>{account.username}</Text>
          <Text style={styles.text}>{account.phone}</Text>
          <Text style={styles.text}>{account.email}</Text>
          {account?.__t && (
            <View style={styles.accountType}>
              <Text style={{ fontSize: 12 }}>Bác sĩ</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            if (account?.__t === "Doctor") {
              // Điều hướng đến trang UpdateDoctor nếu là bác sĩ
              navigation.navigate("UpdateDoctor");
            } else {
              // Điều hướng đến trang UpdateUser nếu không phải bác sĩ
              navigation.navigate("UpdateUser");
            }
          }}>
          <View style={styles.item}>
            <Ionicons name="person-outline" size={28} style={styles.iconItem} />
            <Text style={styles.textItem}>Chỉnh Sửa Hồ Sơ</Text>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("BookingHistory")}>
          <View style={styles.item}>
            <Ionicons name="wallet-outline" size={28} style={styles.iconItem} />
            <Text style={styles.textItem}>Cuộc Hẹn Của Tôi</Text>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
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
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SettingAccount")}>
          <View style={styles.item}>
            <Ionicons
              name="settings-outline"
              size={28}
              style={styles.iconItem}
            />
            <Text style={styles.textItem}>Cài Đặt</Text>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
          </View>
        </TouchableOpacity>

        {/* <View style={styles.item}>
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
        </View> */}

        <TouchableOpacity onPress={() => navigation.navigate("Logout")}>
          <View style={styles.item}>
            <Ionicons
              name="log-out-outline"
              size={28}
              style={styles.iconItem}
            />
            <Text style={styles.textItem}>Đăng Xuất</Text>
            <Ionicons
              name="chevron-forward"
              size={28}
              color={COLORS.PersianGreen}
            />
          </View>
        </TouchableOpacity>
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
    justifyContent: "flex-start",
    paddingLeft: 10
  },
  myAvatar: {
    width: 120,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 40,
    marginRight: 5,
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
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
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
  accountType: {
    backgroundColor: COLORS.white,
    fontSize: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.Sinbad,
  },
});
