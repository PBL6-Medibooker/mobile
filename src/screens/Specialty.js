import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
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
  id: `${s.flag} ${s.value}`, // Sử dụng dấu nháy ngược
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

const Specialty = ({ navigation }) => {
  const [area, setArea] = useState({});
  const [specialty, setSpecialty] = useState({});

  const [selectedService, setSelectedService] = useState(null);

  const handle = () => {
    console.log(area, selectedService, specialty);
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
            onChange={(item) => setArea(item)}
          />
          <Text style={styles.text}>Chọn dịch vụ khám</Text>
          <RadioView
            options={ServiceOptions}
            selectedOption={selectedService}
            onSelect={(val) => setSelectedService(val)}
          />
          <Text style={styles.text}>Chọn chuyên khoa</Text>
          <Dropdown
            data={dataSpecialities}
            placeholder="Chọn chuyên khoa"
            onChange={(item) => setSpecialty(item)}
          />
          <Text style={styles.text}>Chọn bác sĩ</Text>
          <Dropdown
            data={dataDoctors}
            placeholder="Chọn bác sĩ"
            onChange={(item) => setSpecialty(item)}
          />
          <Text style={styles.text}>Chọn ngày - khung giờ khám</Text>
          <Text style={styles.text}>TIểu sử bệnh lý</Text>
          <TextInput style={styles.textInput} numberOfLines={3} />
          <Text style={styles.text}>Tình trạng sức khoẻ</Text>
          <TextInput style={styles.textInput} numberOfLines={3} />
          <Pressable
            onPress={() => {
              // console.log(selectedOption);
              handle();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.Light50PersianGreen
                  : COLORS.PersianGreen,
              },
              styles.button,
            ]}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 15,
              }}>
              Tiếp theo
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specialty;

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
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    marginTop: 12,
    borderRadius: 999,
    color: COLORS.PersianGreen,
    padding: 8,
  }
});
