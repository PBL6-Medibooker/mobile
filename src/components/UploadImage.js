// UploadFile.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";

const UploadImage = ({ onImageSelected }) => {
  const pickImage = async () => {
    // Yêu cầu quyền truy cập vào thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Quyền truy cập vào thư viện ảnh bị từ chối!");
      return;
    }

    // Mở thư viện ảnh để chọn ảnh
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.uri); // Gọi hàm onImageSelected với URI ảnh
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Chọn Ảnh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.PersianGreen,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
