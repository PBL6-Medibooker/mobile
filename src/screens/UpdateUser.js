import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, images } from "../constants";
import { UploadImage } from "../utils/Upload";
import { HeaderBack } from "../components";

const UpdateUser = ({ navigation }) => {
  const [fullName, setFullName] = useState('Huệ Lê');
  const [phoneNumber, setPhoneNumber] = useState('0343403432');
  const [email, setEmail] = useState('lehue@gmail.com');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [uriAvatar, setUriAvatar] = useState(null);

  const handleUploadImage = async () => {
    const image = await UploadImage();
    if (image) {
      // console.log("image selected", image);
      setUriAvatar(image.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Chỉnh Sửa Hồ Sơ" />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity activeOpacity={0.85} onPress={handleUploadImage}>
            <Image
              source={uriAvatar ? { uri: uriAvatar } : images.user_default}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editAvatarButton}
            onPress={handleUploadImage}
          >
            <MaterialIcons name="photo-camera" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Họ và Tên</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Số Điện Thoại</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
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

          <Text style={styles.label}>Ngày Sinh</Text>
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="DD / MM / YYYY"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.PersianGreen,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.white,
    marginLeft: 10,
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
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 15,
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
