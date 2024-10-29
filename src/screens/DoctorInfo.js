import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarCustom, HeaderBack } from "../components";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import useSpecialities from "../hooks/useSpecialities";

const DoctorInfo = ({ navigation, route }) => {
  const { doctorSelected } = route.params || {};

  const [selectedDay, setSelectedDay] = useState({
    date: null,
    dayOfWeek: null,
    time: null,
  });

  const [message, setMessage] = useState(null);

  const [specialitiesHook, get_Specialty_By_ID, loading, error] =
    useSpecialities();

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      </SafeAreaView>
    );
  }

  const specialtyName = get_Specialty_By_ID(
    specialitiesHook,
    doctorSelected.speciality_id
  );

  const handleSetDate = () => {
    if (selectedDay.time !== null) {
      console.log(selectedDay);
      navigation.navigate("VerifyBooking");
    } else {
      setMessage("* Chưa chọn ngày - khung giờ");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} />
        <View style={styles.contentTitle}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {}}
            style={styles.myAvatar}>
            <Image source={images.user_default} style={styles.image} />
          </TouchableOpacity>

          <View style={styles.myBasicInformation}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
              {doctorSelected.name}
            </Text>
            <Text style={styles.text}>{specialtyName}</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>Giới thiệu</Text>
          <Text style={styles.contentText}>{doctorSelected.bio}</Text>

          <Text style={styles.titleText}>Lĩnh vực chuyên môn</Text>
          <Text style={styles.contentText}>doctor.bio.introduction</Text>

          <Text style={styles.titleText}>Thành viên hiệp hội</Text>
          <Text style={styles.contentText}>doctor.bio.introduction</Text>

          <CalendarCustom
            schedule={doctorSelected.active_hours}
            setMessage={setMessage}
            setSelectedDay={(val) => {
              setSelectedDay(val);
              console.log("dp: ", val);
            }}
            selectedDay={selectedDay}
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
