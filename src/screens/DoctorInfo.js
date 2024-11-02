import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarCustom, HeaderBack } from "../components";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import useSpecialities from "../hooks/useSpecialities";
import useRegions from "../hooks/useRegions";
import { useAuth } from "../AuthProvider";

const DoctorInfo = ({ navigation, route }) => {
  const { doctorSelected } = route.params || {};

  const [area, setArea] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  const [selectedDay, setSelectedDay] = useState({
    date: null,
    dayOfWeek: null,
    time: null,
  });

  const [message, setMessage] = useState(null);

  const [specialitiesHook, get_Specialty_By_ID, loading] = useSpecialities();
  const [regionsHook, get_Region_By_ID] = useRegions();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const getSpecialtyById = async () => {
      const specialtyById = await get_Specialty_By_ID(
        specialitiesHook,
        doctorSelected.speciality_id
      );
      // console.log(specialtyById);
      setSpecialty(specialtyById);
    };

    const getRegionById = async () => {
      const regionById = await get_Region_By_ID(
        regionsHook,
        doctorSelected.region_id
      );
      // console.log(regionById);
      setArea(regionById);
    };

    getSpecialtyById();
    getRegionById();
  }, [specialitiesHook]);

  const handleSetDate = () => {
    if (selectedDay.time !== null) {
      // console.log(selectedDay);
      const info = {
        region: area,
        specialty: specialty,
        doctor: doctorSelected,
        medicalHistory: null,
        healthStatus: healthStatus,
        time: selectedDay,
      };
      navigation.navigate("VerifyBooking", info);
    } else {
      setMessage("* Chưa chọn ngày - khung giờ");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} />
        <View style={styles.contentTitle}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {}}
            style={styles.myAvatar}>
            <Image
              source={
                doctorSelected.profile_image
                  ? {
                      uri: `data:image/png;base64,${doctorSelected.profile_image}`,
                    }
                  : images.doctor_default
              }
              style={styles.image}
            />
          </TouchableOpacity>

          <View style={styles.myBasicInformation}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
              {doctorSelected.name}
            </Text>
            {specialty?.name && (
              <Text style={styles.text}>{specialty?.name}</Text>
            )}
            {area?.name && <Text style={styles.text}>{area?.name}</Text>}
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
            navigation={navigation}
            schedule={doctorSelected.active_hours}
            setMessage={setMessage}
            setSelectedDay={(val) => {
              setSelectedDay(val);
              // console.log("dp: ", val);
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

          {selectedDay.time !== null && (
            <View>
              <Text style={styles.textHealth}>Tình trạng sức khoẻ</Text>
              <TextInput
                style={styles.textInputHealth}
                numberOfLines={3}
                multiline
                value={healthStatus}
                onChangeText={setHealthStatus}
              />
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
  textHealth: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 5,
  },
  textInputHealth: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 10,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 100,
    marginBottom: 10,
  },
});
