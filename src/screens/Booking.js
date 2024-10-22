import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { Dropdown, HeaderBack, RadioView, DatePicker } from "../components";
import { doctors } from "../utils/doctors";
import useSpecialities from "../hooks/useSpecialities";
import useRegions from "../hooks/useRegions";

const dataDoctors = doctors.map((s) => ({
  _id: s.id,
  name: s.name,
}));

const ServiceOptions = [
  { label: "Khám trong giờ", value: "intime" },
  { label: "Khám ngoài giờ", value: "aftertime" },
  { label: "Khám online", value: "online" },
];

const Booking = ({ navigation, route }) => {
  const [area, setArea] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [datePicker, setDatePicker] = useState(null);

  const [sortSpecialities] = useSpecialities();
  const [regions] = useRegions();

  const { doctor_id } = route.params || {};
  if (doctor_id) console.log(doctor_id);

  const handle = () => {
    console.log(
      area,
      service,
      specialty,
      doctor,
      medicalHistory,
      healthStatus,
      datePicker
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} title="ĐĂNG KÝ LỊCH HẸN" />

        <View style={styles.main}>
          <Text style={styles.text}>Chọn khu vực</Text>
          <Dropdown
            data={[...regions].reverse()}
            placeholder="Chọn khu vực"
            onChange={setArea}
            value={area}
          />
          <Text style={styles.text}>Chọn dịch vụ khám</Text>
          <RadioView
            options={ServiceOptions}
            selectedOption={service}
            onSelect={setService}
          />
          <Text style={styles.text}>Chọn chuyên khoa</Text>
          {area !== null && service !== null ? (
            <Dropdown
              data={[...sortSpecialities].reverse()}
              placeholder="Chọn chuyên khoa"
              onChange={setSpecialty}
              disabled={false}
              value={specialty}
            />
          ) : (
            <Dropdown
              data={[...sortSpecialities].reverse()}
              placeholder="Chọn chuyên khoa"
              onChange={setSpecialty}
              disabled={true}
              value={specialty}
            />
          )}

          <Text style={styles.text}>Chọn bác sĩ</Text>
          {area !== null && service !== null && specialty !== null ? (
            <Dropdown
              data={dataDoctors}
              placeholder="Chọn bác sĩ"
              onChange={setDoctor}
              disabled={false}
              value={doctor}
            />
          ) : (
            <Dropdown
              data={dataDoctors}
              placeholder="Chọn bác sĩ"
              onChange={setDoctor}
              disabled={true}
              value={doctor}
            />
          )}

          <Text style={styles.text}>Chọn ngày - khung giờ khám</Text>
          {area !== null &&
          service !== null &&
          specialty !== null &&
          doctor !== null ? (
            <DatePicker
              onChange={setDatePicker}
              placeholder="Chọn ngày - khung giờ khám"
              disabled={false}
            />
          ) : (
            <DatePicker
              onChange={setDatePicker}
              placeholder="Chọn ngày - khung giờ khám"
              disabled={true}
            />
          )}

          <Text style={styles.text}>Tiểu sử bệnh lý</Text>
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 5,
    backgroundColor: COLORS.black,
    borderRadius: 20,
    padding: 10,
    width: "90%",
  },
});
