import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, images } from "../constants";
import { UploadImage } from "../utils/Upload";
import { HeaderBack } from "../components";
import { useAuth } from "../AuthProvider";
import DateTimePicker from '@react-native-community/datetimepicker';



const UpdateUser = ({ navigation }) => {
  const { storedToken, accountInfo, update_acc_info } = useAuth();

  const [username, setUserName] = useState(accountInfo?.username || "");
  const [phone, setPhoneNumber] = useState(accountInfo?.phone || "");
  // const [email, setEmail] = useState(accountInfo?.email || ""); 
  const [date_of_birth, setDateOfBirth] = useState(accountInfo?.date_of_birth || ""); 
  const [address, setAddress] = useState(accountInfo?.address || "");
  const [uriAvatar, setUriAvatar] = useState(null);
  const [underlyingCondition, setUnderlyingCondition] = useState(accountInfo?.underlying_condition || "");

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUploadImage = async () => {
    const image = await UploadImage();
    if (image) {
      setUriAvatar(image.uri);
    }
  };


  

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("date_of_birth", date_of_birth);
    formData.append("address", address);
    // formData.append("email", email);
    formData.append("underlying_condition", underlyingCondition);

    if (uriAvatar) {
      formData.append("profile_image", {
        uri: uriAvatar,
        type: "image/jpeg", // Thay đổi nếu bạn sử dụng định dạng ảnh khác
        name: "anh.jpg", // Tên file
      });
    }
     // Kiểm tra ID
    const accountId = accountInfo._id;
    try {
      const response = await update_acc_info(accountId, formData);
      if (response && !response.error) {
        Alert.alert("Cập nhật thành công");

        

        // Hiển thị thông tin mới nhất
      setUserName(response.username || "");
      setPhoneNumber(response.phone || "");
      setDateOfBirth(response.date_of_birth || "");
      setAddress(response.address || "");
      setUnderlyingCondition(response.underlying_condition || "");
      setUriAvatar(response.profile_image ? `data:image/png;base64,${response.profile_image}` : null);

        // navigation.navigate("UserProfile");
      } else {
        Alert.alert("Cập nhật thất bại", response.error || "Vui lòng thử lại");
      }
    } catch (error) {
      Alert.alert("Có lỗi xảy ra", "Vui lòng thử lại sau");
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date_of_birth;
    setShowDatePicker(false);
    
    // Chuyển đổi ngày thành ISO 8601 và lưu vào state
    if (currentDate) {
      setDateOfBirth(currentDate.toISOString());
    }
  };

  useEffect(() => {
    // Khi vào lại trang, cập nhật state từ accountInfo mới nhất
    setUserName(accountInfo?.username || "");
    setPhoneNumber(accountInfo?.phone || "");
    setDateOfBirth(accountInfo?.date_of_birth || "");
    setAddress(accountInfo?.address || "");
    setUnderlyingCondition(accountInfo?.underlying_condition || "");
    setUriAvatar(accountInfo?.profile_image ? `data:image/png;base64,${accountInfo.profile_image}` : null);
  }, [accountInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Chỉnh Sửa Hồ Sơ" />
      <View style={styles.content}>
        <View style={styles.myAvatar}>
          <TouchableOpacity activeOpacity={0.85}>
            <Image
              source={
                uriAvatar
                  ? { uri: uriAvatar }
                  : accountInfo?.profile_image
                  ? { uri: `data:image/png;base64,${accountInfo.profile_image}` }
                  : images.user_default
              }
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleUploadImage}
            style={styles.uploadAvatar}>
            <MaterialIcons name="photo-camera" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
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

<Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={date_of_birth ? new Date(date_of_birth).toLocaleDateString() : ""}
              editable={false} // Làm cho TextInput không thể chỉnh sửa
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date_of_birth ? new Date(date_of_birth) : new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}


          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Tình Trạng Bệnh</Text>
          <TextInput
            style={styles.input}
            value={underlyingCondition}
            onChangeText={setUnderlyingCondition}
          />  
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
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
  content: {
    padding: 20,
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
