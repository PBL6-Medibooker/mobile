// UpdateInfoScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { useAuth } from "../AuthProvider";
import * as ImagePicker from "expo-image-picker";
import HeaderBack from "../components/HeaderBack";
import UploadImage from "../components/UploadImage";

const UpdateInfo = ({ navigation }) => {
  const { accountInfo, update_acc_info } = useAuth();
  const [username, setUserName] = useState(accountInfo?.username || "");
  const [phone, setPhoneNumber] = useState(accountInfo?.phone || "");
  const [underlyingCondition, setUnderlyingCondition] = useState(accountInfo?.underlying_condition || "");
  const [uriAvatar, setUriAvatar] = useState(accountInfo?.profile_image || null);
  const [email, setEmail] = useState(accountInfo?.email || ""); 

  useEffect(() => {
    setUriAvatar(accountInfo?.profile_image);
  }, [accountInfo]);

  const handleImageSelected = async () => {
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
    if (!result.canceled && result.uri) {  // Thay đổi kiểm tra canceled
      setUriAvatar(result.uri);
    }
  };

  // UpdateInfo.js
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("phone", phone);
      formData.append("underlying_condition", underlyingCondition);
  
      if (uriAvatar) {
        // Tạo blob từ URI
        const response = await fetch(uriAvatar);
        const blob = await response.blob();
        formData.append("profile_image", blob, "anh.jpg"); // Đảm bảo truyền blob đúng cách
      }
  
      console.log("FormData:", formData);
      const accountId = accountInfo._id; // Sử dụng _id từ accountInfo
      const response = await update_acc_info(accountId, formData);
  
      if (response && response.error) {
        Alert.alert("Lỗi", response.error);
      } else {
        Alert.alert("Thành công", "Thông tin đã được cập nhật!");
        setUriAvatar(accountInfo.profile_image);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin, vui lòng thử lại.");
    }
  };
  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Chỉnh Sửa Hồ Sơ" />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={uriAvatar ? { uri: uriAvatar } : images.user_default}
            style={styles.avatarImage}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleImageSelected}>
            <Text style={styles.uploadButtonText}>Tải Ảnh Lên</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Họ và Tên</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUserName}
          />

          <Text style={styles.label}>Số Điện Thoại</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Tình Trạng Bệnh</Text>
          <TextInput
            style={styles.input}
            value={underlyingCondition}
            onChangeText={setUnderlyingCondition}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.silver,
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: COLORS.PersianGreen,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.Light50PersianGreen,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: COLORS.silver,
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: COLORS.PersianGreen,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
