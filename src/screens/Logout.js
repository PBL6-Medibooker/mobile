import React from "react";
import { View, Text, Button, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthProvider";

const Logout = () => {
  const navigation = useNavigation();
  const { clearToken } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất không?",
      [
        {
          text: "Hủy",
          style: "cancel",
          onPress: () => {
            navigation.navigate("Home");
          },
        },
        {
          text: "Đăng xuất",
          onPress: async () => {
            try {
              clearToken();
              //   await AsyncStorage.removeItem("userToken"); // Xóa token khỏi AsyncStorage
              console.log("Đã đăng xuất");
              navigation.navigate("Login"); // Điều hướng về màn hình đăng nhập
            } catch (error) {
              console.error("Lỗi khi đăng xuất:", error);
            }
          },
        },
      ],
      { cancelable: false } // Không cho phép hủy khi nhấn ra ngoài Alert
    );
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bạn có chắc chắn muốn đăng xuất?</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default Logout;
