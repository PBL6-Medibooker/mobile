import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { areas } from "../utils/areas";
import { useState } from "react";
import { Dropdown, HeaderBack, RadioView } from "../components";
import { specialities } from "../utils/specialities";
import { doctors } from "../utils/doctors";

const dataAreas = areas.map((s) => ({
  id: s.id,
  value: s.name,
}));

const dataSpecialities = specialities.map((s) => ({
  value: s.label,
  id: `${s.flag} ${s.id}`, // Sử dụng dấu nháy ngược
}));

const dataDoctors = doctors.map((s) => ({
  id: s.id,
  value: s.name,
}));

const ServiceOptions = [
  { label: "Khám trong giờ", value: "intime" },
  { label: "Khám ngoài giờ", value: "aftertime" },
  { label: "Khám online", value: "online" },
];

const Booking = ({ navigation }) => {
  const [area, setArea] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  const handle = () => {
    console.log(area, service, specialty, doctor, medicalHistory, healthStatus);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderBack navigation={navigation} title="ĐĂNG KÝ LỊCH HẸN" />

        <View style={styles.main}>
          <Text style={styles.text}>Chọn khu vực</Text>
          <Dropdown
            data={dataAreas}
            placeholder="Chọn khu vực"
            onChange={setArea}
          />
          <Text style={styles.text}>Chọn dịch vụ khám</Text>
          <RadioView
            options={ServiceOptions}
            selectedOption={service}
            onSelect={setService}
          />
          <Text style={styles.text}>Chọn chuyên khoa</Text>
          <Dropdown
            data={dataSpecialities}
            placeholder="Chọn chuyên khoa"
            onChange={setSpecialty}
          />
          <Text style={styles.text}>Chọn bác sĩ</Text>
          <Dropdown
            data={dataDoctors}
            placeholder="Chọn bác sĩ"
            onChange={setDoctor}
          />
          <Text style={styles.text}>Chọn ngày - khung giờ khám</Text>
          <Text style={styles.text}>TIểu sử bệnh lý</Text>
          <TextInput
            style={styles.textInput}
            numberOfLines={3}
            value={medicalHistory}
            onChangeText={setMedicalHistory}
          />
          <Text style={styles.text}>Tình trạng sức khoẻ</Text>
          <TextInput
            style={styles.textInput}
            numberOfLines={3}
            value={healthStatus}
            onChangeText={setHealthStatus}
          />
          <Pressable
            onPress={() => {
              // console.log(selectedOption);
              handle();
              navigation.navigate("VerifyBooking");
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.Light50PersianGreen
                  : COLORS.PersianGreen,
              },
              styles.button,
            ]}>
            <Text style={styles.buttonText}>Tiếp theo</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  text: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 5,
  },
  main: {
    margin: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 10,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 5,
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
