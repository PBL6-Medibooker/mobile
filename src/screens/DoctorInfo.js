import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarCustom, HeaderBack } from "../components";
import { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";

const doctor = {
  id: "ggd",
  name: "PGS.TS.BS Le Hoang ssj",
  area: "Chi nhanh TP Ho Chi Minh",
  specialty: "Trung tâm kiểm soát cân nặng và điều trị béo phì",
  working_hours: [
    "8:00 a.m - 11:00 a.m, 20/9/2024",
    "6:30 a.m - 10:30 a.m, 21/9/2024",
  ],
  bio: {
    position:
      "Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.Giám đốc phòng Lab Trung tâm kiểm soát cân nặng và điều trị béo phì.",
    introduction:
      "BS.CKI Châu Hoàng Phương Thảo hiện đang nắm giữ chức vụ Phó đơn vị Hỗ trợ Sinh sản, Bệnh viện Đa khoa Tâm Anh TP.HCM. Với trình độ chuyên môn cao cùng gần 20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản, bác sĩ Châu Hoàng Phương Thảo không chỉ được chuyên gia đầu ngành đánh giá cao, sự kính nể của các đồng nghiệp mà còn nhận được sự yêu mến, tin tưởng của nhiều cặp vợ chồng đang trên hành trình tìm con. \n" +
      "Bên cạnh công tác khám, chẩn đoán và điều trị vô sinh – hiếm muộn, tư vấn phương pháp điều trị hiệu quả các bệnh lý phụ khoa, tử cung… bác sĩ Châu Hoàng Phương Thảo còn tham gia biên soạn tài liệu, giảng dạy chương trình đào tạo liên tục về kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng cho các thế hệ bác sĩ trẻ tương lai. \n" +
      "Chính nhờ kinh nghiệm thực tiễn cùng y đức và tâm huyết dành cho nghề, BS.CKI Châu Hoàng Phương Thảo là một trong những bác sĩ khám, điều trị vô sinh – hiếm muộn được đánh giá cao tại TP.HCM.",
  },
};

const DoctorInfo = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [message, setMessage] = useState(null);

  const { doctor_id } = route.params || {};
  if (doctor_id) {
    console.log(doctor_id);
  }

  const handleSetDate = useCallback(() => {
    if (selectedDate !== null && selectedHour !== null) {
      //   onChange({
      //     day: selectedDate,
      //     hour: selectedHour,
      //   });
      console.log(selectedDate, selectedHour);
      navigation.navigate("VerifyBooking");
    } else {
      setMessage("* Chưa chọn ngày - khung giờ");
    }
  }, [selectedDate, selectedHour]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderBack navigation={navigation} title={doctor_id} />
        <View style={styles.contentTitle}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {}}
            style={styles.myAvatar}>
            <Image source={images.user_default} style={styles.image} />
          </TouchableOpacity>

          <View style={styles.myBasicInformation}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
              {doctor.name}
            </Text>
            <Text style={styles.text}>{doctor.specialty}</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>Giới thiệu</Text>
          <Text style={styles.contentText}>{doctor.bio.introduction}</Text>

          <Text style={styles.titleText}>Lĩnh vực chuyên môn</Text>
          <Text style={styles.contentText}>doctor.bio.introduction</Text>

          <Text style={styles.titleText}>Thành viên hiệp hội</Text>
          <Text style={styles.contentText}>doctor.bio.introduction</Text>

          <CalendarCustom
            selectedDate={selectedDate}
            selectedHour={selectedHour}
            setSelectedDate={setSelectedDate}
            setSelectedHour={setSelectedHour}
            setMessage={setMessage}
            theme="light"
          />

          {message && (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ color: "red", textAlign: "center" }}>
                {message}
              </Text>
            </View>
          )}

          <Pressable
            onPress={() => {
              handleSetDate();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.Light50PersianGreen
                  : COLORS.PersianGreen,
              },
              styles.button,
            ]}>
            <Text style={styles.buttonText}>Đặt lịch hẹn với bác sĩ</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentTitle: {
    backgroundColor: COLORS.PersianGreen,
    alignItems: "center",
  },
  myAvatar: {
    width: "30%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 999,
    backgroundColor: COLORS.silver,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  myBasicInformation: {
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderRadius: 10,
    padding: 5,
    width: "70%",
  },
  text: {
    textAlign: "center",
  },
  titleText: {
    color: COLORS.PersianGreen,
    fontSize: 18,
  },
  contentText: {
    marginBottom: 8,
    textAlign: "justify",
  },
  mainContainer: {
    flex: 1,
    margin: 15,
  },
  button: {
    marginTop: 12,
    borderRadius: 999,
    color: COLORS.PersianGreen,
    padding: 8,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
