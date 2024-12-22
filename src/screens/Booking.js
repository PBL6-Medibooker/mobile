import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { useEffect, useState } from "react";
import { Dropdown, HeaderBack, RadioView, DatePicker } from "../components";
import useSpecialities from "../hooks/useSpecialities";
import useRegions from "../hooks/useRegions";
import useAccount from "../hooks/useAccount";
import Account_API from "../API/Account_API";

const ServiceOptions = [
  { label: "Khám trong giờ", value: "intime" },
  { label: "Khám ngoài giờ", value: "aftertime" },
  { label: "Khám online", value: "online" },
];

const Booking = ({ navigation, route }) => {
  const { doctorSelected } = route.params || {};

  const [area, setArea] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [datePicker, setDatePicker] = useState({
    date: null,
    dayOfWeek: null,
    time: null,
  });

  const [message, setMessage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const [specialitiesHook] = useSpecialities();
  const [regionsHook] = useRegions();
  const [doctorsHook] = useAccount();
  const [doctors, setDoctors] = useState([]);
  const [activeHours, setActiveHours] = useState({});

  const [openedDropdown, setOpenedDropdown] = useState(null);

  useEffect(() => {
    const getDoctorBySpecialty = async () => {
      // Chỉ thiết lập lại doctor và datePicker khi doctorSelected không tồn tại
      if (!doctorSelected) {
        setDoctor(null);
        setDatePicker({
          date: null,
          dayOfWeek: null,
          time: null,
        });
      }

      if (specialty && area) {
        // Chỉ gọi khi specialty và area đã có giá trị
        const doctors = await Account_API.get_Filter_Doctor_List(
          specialty?.name,
          area?.name
        );
        const doctorsBySpecialtyAndRegion = doctors.map(
          ({ username, ...rest }) => ({
            name: username,
            ...rest,
          })
        );
        setDoctors(doctorsBySpecialtyAndRegion);
      }
    };

    getDoctorBySpecialty();
  }, [specialty, area, doctorsHook, doctorSelected]);

  useEffect(() => {
    if (
      doctorSelected &&
      regionsHook.length > 0 &&
      specialitiesHook.length > 0
    ) {
      // Đảm bảo dữ liệu đã tải xong
      let selectedRegion = null;
      let selectedSpecialty = null;
      if (doctorSelected?.region_id?._id)
        selectedRegion = regionsHook.find(
          (item) => item._id === doctorSelected?.region_id?._id
        );
      if (doctorSelected?.speciality_id?._id)
        selectedSpecialty = specialitiesHook.find(
          (item) => item._id === doctorSelected?.speciality_id?._id
        );

      if (selectedRegion && selectedSpecialty) {
        setArea(selectedRegion);
        setSpecialty(selectedSpecialty);
        setDoctor(doctorSelected);
      }
    }
  }, [doctorSelected, regionsHook, specialitiesHook]);

  useEffect(() => {
    const get_Doctor_Active_Hours = async () => {
      const activeHours = await Account_API.get_Doctor_Active_Hour_List(
        doctor._id
      );
      console.log(activeHours);
      setActiveHours(activeHours);
    };
    get_Doctor_Active_Hours();
  }, [doctor]);

  const handleFocus = (field) => {
    if (message === field) {
      setIsVerified(false);
    }

    setOpenedDropdown(field);
  };

  const handle = () => {
    setIsVerified(true);
    if (!area) {
      setMessage("area");
      return;
    }
    if (!specialty) {
      setMessage("specialty");
      return;
    }
    if (!doctor) {
      setMessage("doctor");
      return;
    }
    if (!(datePicker.date && datePicker.dayOfWeek && datePicker.time)) {
      setMessage("time");
      return;
    }
    setIsVerified(false);

    handleSelectedFull();
  };

  const handleSelectedFull = () => {
    const info = {
      region: area,
      specialty: specialty,
      doctor: doctor,
      medicalHistory: medicalHistory,
      healthStatus: healthStatus,
      time: datePicker,
    };
    navigation.navigate("VerifyBooking", info);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} title="ĐĂNG KÝ LỊCH HẸN" />

        <TouchableWithoutFeedback onPress={() => setOpenedDropdown(null)}>
          <View style={styles.main}>
            <Text style={styles.text}>Chọn khu vực</Text>
            <Dropdown
              data={regionsHook}
              placeholder="Chọn khu vực"
              onChange={setArea}
              value={area}
              onFocus={() => {
                handleFocus("area");
              }}
              expanded={openedDropdown === "area"}
              setExpanded={setOpenedDropdown}
            />

            {isVerified && message === "area" ? (
              <Text style={styles.message}>* Chưa chọn khu vực</Text>
            ) : null}

            <Text style={styles.text}>Chọn chuyên khoa</Text>
            <Dropdown
              data={specialitiesHook}
              placeholder="Chọn chuyên khoa"
              onChange={setSpecialty}
              value={specialty}
              onFocus={() => {
                handleFocus("specialty");
              }}
              expanded={openedDropdown === "specialty"}
              setExpanded={setOpenedDropdown}
            />

            {isVerified && message === "specialty" ? (
              <Text style={styles.message}>* Chưa chọn chuyên khoa</Text>
            ) : null}

            <Text style={styles.text}>Chọn bác sĩ</Text>
            <Dropdown
              data={doctors}
              placeholder="Chọn bác sĩ"
              onChange={setDoctor}
              onFocus={() => {
                handleFocus("doctor");
              }}
              disabled={!(area && specialty)}
              value={doctor}
              expanded={openedDropdown === "doctor"}
              setExpanded={setOpenedDropdown}
            />

            {isVerified && message === "doctor" ? (
              <Text style={styles.message}>* Chưa chọn bác sĩ</Text>
            ) : null}

            <Text style={styles.text}>Chọn ngày - khung giờ khám</Text>
            <DatePicker
              value={datePicker}
              schedule={activeHours ? activeHours : null}
              onChange={setDatePicker}
              placeholder="Chọn ngày - khung giờ khám"
              disabled={!(area && specialty && doctor)}
              onFocus={() => {
                handleFocus("time");
              }}
            />

            {isVerified && message === "time" ? (
              <Text style={styles.message}>
                * Chưa chọn ngày - khung giờ khám
              </Text>
            ) : null}

            {/* <Text style={styles.text}>Tiền sử bệnh lý</Text>
          <TextInput
            style={[styles.textInput, { height: 100 }]}
            numberOfLines={3}
            value={medicalHistory}
            multiline
            onChangeText={setMedicalHistory}
          /> */}

            <Text style={styles.text}>Tình trạng sức khoẻ</Text>
            <TextInput
              style={[styles.textInput, { height: 100 }]}
              numberOfLines={3}
              multiline
              value={healthStatus}
              onChangeText={setHealthStatus}
            />
            <Pressable
              onPress={() => {
                handle();
                // navigation.navigate("VerifyBooking");
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
        </TouchableWithoutFeedback>
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
  message: {
    color: COLORS.red,
    fontSize: 12,
  },
});
