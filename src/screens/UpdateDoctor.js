import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, images } from "../constants";
import { useAuth } from "../AuthProvider";
import { HeaderBack } from "../components";
import { UploadImage } from "../utils/Upload";
import DateTimePicker from "@react-native-community/datetimepicker";
import Account_API from "../API/Account_API";
import { id } from "date-fns/locale";
import Speciality_API from "../API/Speciality_API";
import Region_API from "../API/Region_API";
import Dropdown from "../components/Dropdown";
import UpdateOther from "./UpdateOther";
import Feather from '@expo/vector-icons/Feather';

const UpdateDoctor = ({ navigation, route }) => {
  const { storedToken, account, setAccount } = useAuth();
  const [username, setUserName] = useState(account?.username || "");
  const [phone, setPhoneNumber] = useState(account?.phone || "");
  const [date_of_birth, setDateOfBirth] = useState(account?.date_of_birth || "");
  const [address, setAddress] = useState(account?.address || "");
  const [speciality, setSpeciality] = useState(account?.speciality|| "");
  const [region, setRegion] = useState(account?.region || "");
  const [bio, setBio] = useState(account?.bio || "");
  const [uriAvatar, setUriAvatar] = useState(account?.profile_image);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [specialities, setSpecialities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [openedDropdown, setOpenedDropdown] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialityList = await Speciality_API.get_Speciality_List();
        const regionList = await Region_API.get_Region_List();
        setSpecialities(specialityList);
        setRegions(regionList);
  
        if (account?.speciality_id?._id && account?.region_id?._id) {
          const currentSpeciality = specialityList.find(
            (item) => item._id.toString() === account.speciality_id._id.toString()
          );
          const currentRegion = regionList.find(
            (item) => item._id.toString() === account.region_id._id.toString()
          );
          if (currentSpeciality) setSpeciality(currentSpeciality.name);
          if (currentRegion) setRegion(currentRegion.name);
        // } else {
        //   Alert.alert("Vui lòng cập nhật thông tin chuyên khoa và khu vực.");
          }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleUploadImage = async () => {
    const image = await UploadImage();
    if (image) {
      setUriAvatar(image);
    }
  };

  const handleSave = async () => {
    try {
    const selectedSpeciality = specialities.find((item) => item.name === speciality);
    const selectedRegion = regions.find((item) => item.name === region);

    console.log("Chuyên khoa nhập vào:", speciality);
    console.log("Khu vực nhập vào:", region);
    console.log("Chuyên khoa tìm được:", selectedSpeciality);
    console.log("Khu vực tìm được:", selectedRegion);
    // Kiểm tra nếu không tìm thấy
    if (!selectedSpeciality && !selectedRegion) {
      Alert.alert("Thông báo", "Vui lòng cập nhật chuyên khoa và khu vực.");
      return;
  }
  if (!selectedSpeciality) {
      Alert.alert("Thông báo", "Vui lòng cập nhật lĩnh vực chuyên môn.");
      return;
  }
  if (!selectedRegion) {
      Alert.alert("Thông báo", "Vui lòng cập nhật khu vực.");
      return;
  }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("date_of_birth", date_of_birth);
    formData.append("address", address);
    if (uriAvatar) {
      formData.append("profile_image", {
        uri: uriAvatar,
        type: "image/jpeg",
        name: "avatar.jpg",
      });
    }
    const accountId = account._id;
    // Cập nhật thông tin tài khoản
    const accountResponse = await Account_API.update_Account(accountId, formData);
    if (!accountResponse) throw new Error("Cập nhật thông tin thất bại");

    // Cập nhật thông tin bác sĩ
    const doctorResponse = await Account_API.update_Doctor_Info(accountId, {
      speciality: selectedSpeciality.name,
      region: selectedRegion.name,
      bio,
    });
    if (!doctorResponse) throw new Error("Cập nhật thông tin thất bại");
    if (accountResponse && doctorResponse) {
      setAccount((prev) => ({
        ...prev,
        ...accountResponse,
        speciality_id: selectedSpeciality,
        region_id: selectedRegion,
      }));
      Alert.alert("Thành công", "Thông tin bác sĩ đã được cập nhật.");
      navigation.goBack();
    } else {
      throw new Error("Cập nhật thất bại.");
    }
  } catch (error) {
    console.error("Lỗi trong handleSave:", error.message);
    Alert.alert("Lỗi", error.message || "Không thể cập nhật thông tin.");
  }
};

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date_of_birth;
    setShowDatePicker(false);

    if (currentDate) {
      setDateOfBirth(currentDate.toISOString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Chỉnh Sửa Thông Tin Bác Sĩ" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.myAvatar}>
          <TouchableOpacity onPress={handleUploadImage}>
            <Image
              source={
                uriAvatar
                  ? { uri: uriAvatar }
                  : account?.profile_image
                  ? { uri: account.profile_image }
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("UpdateOther")} 
            style={styles.leftButton}>
            <Feather name="edit-2" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUserName} />

          <Text style={styles.label}>Số Điện Thoại</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={date_of_birth ? new Date(date_of_birth).toLocaleDateString() : ""}
              editable={false}
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
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />

          <Text style={styles.label}>Lĩnh vực chuyên môn</Text>
          <Dropdown
            data={specialities || []} 
            placeholder="Chọn chuyên khoa"
            onChange={(item) => setSpeciality(item.name)} 
            value={specialities.find((item) => item.name === speciality) || null} 
            onFocus={() => setOpenedDropdown("speciality")}
            expanded={openedDropdown === "speciality"}
            setExpanded={setOpenedDropdown}
          />

          <Text style={styles.label}>Khu vực</Text>
          <Dropdown
            data={regions || []} 
            placeholder="Chọn khu vực"
            onChange={(item) => setRegion(item.name)} 
            value={regions.find((item) => item.name === region) || null} 
            onFocus={() => setOpenedDropdown("region")}
            expanded={openedDropdown === "region"}
            setExpanded={setOpenedDropdown}
          />
          {/* <TextInput style={styles.input} value={region} onChangeText={setRegion} /> */}
          <Text style={styles.label}>Giới thiệu</Text>
          <TextInput style={styles.textarea} value={bio} onChangeText={setBio} multiline numberOfLines={4} />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu Thông Tin</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default UpdateDoctor;
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
    alignSelf: "center",
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng (x, y)
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 15, 
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
  leftButton: {
    position: "absolute",
    top: 91, 
    left: 0, 
    backgroundColor: COLORS.white,
    padding: 2,
    borderRadius: 999,
    elevation: 0, 
  },
  form: {
    marginBottom: 20,
    paddingBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    fontSize: 15,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: COLORS.silver,
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: COLORS.PersianGreen,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  textarea: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: COLORS.silver,
    borderWidth: 1,
    height: 120,
  },
  
});