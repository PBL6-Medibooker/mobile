import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthProvider";
import { COLORS, images } from "../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const Logout = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log("Đã đăng xuất");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            onPress={() => {
              navigation.navigate("Home");
            }}
            name="arrow-back-outline"
            size={48}
            color={COLORS.PersianGreen}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Image source={images.doctorA} style={styles.image} />
        <Text style={styles.text}>Bạn có chắc chắn muốn đăng xuất không?</Text>
      </View>

      <Pressable
        onPress={() => handleLogout()}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? COLORS.Light50PersianGreen
              : COLORS.PersianGreen,
          },
          styles.buttonLogin,
        ]}>
        <Text style={styles.loginText}>Đăng xuất</Text>
        <Ionicons
          name="arrow-forward-outline"
          size={26}
          color={COLORS.white}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButtonContainer: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  backButton: {
    height: 48,
    width: 48,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 100,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
  },
  buttonLogin: {
    marginTop: 12,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
    marginStart: 26,
  },
  text: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    fontSize: 16,
  },
});
