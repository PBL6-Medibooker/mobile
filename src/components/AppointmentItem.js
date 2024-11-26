import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Account_API from "../API/Account_API";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatDistanceToNow, parse } from "date-fns";
import { vi } from "date-fns/locale";
import {
  convertAppointmentDate,
} from "../utils/ConvertDate";
import Appointment_API from "../API/Appointment_API";

const AppointmentItem = ({ appointmentKey, item, navigation, filter }) => {
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    const getDoctorById = async () => {
      try {
        const doctor = await Account_API.get_Account_By_Id(item.doctor_id._id);
        setDoctor(doctor);
      } catch (error) {
        console.error(error);
      }
    };

    getDoctorById();
  }, [item]);

  const checkHour = (appointment) => {
    const now = new Date();

    const datePart = appointment.appointment_day.split(" ")[1];
    const parsedDate = parse(datePart, "yyyy-MM-dd", new Date());
  
    const isToday =
      parsedDate.getDate() === now.getDate() &&
      parsedDate.getMonth() === now.getMonth() &&
      parsedDate.getFullYear() === now.getFullYear();
  
    if (isToday) {
      const [hour, minute] = appointment.appointment_time_start
        .split(":")
        .map(Number);
  
      const appointmentTime = new Date();
      appointmentTime.setHours(hour, minute, 0, 0);
  
      if (now >= appointmentTime) return true;
    }
  
    return false;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const cancel = await Appointment_API.canncel_Appointment(appointmentId);
      if (typeof cancel === "object" && cancel?.message) {
        // console.log(cancel.message);

        Alert.alert("Thông báo", "Huỷ lịch hẹn thành công.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("BookingHistory", {
                refresh: `cancel ${appointmentId}`,
              });
            },
          },
        ]);
      } else {
        console.log(cancel);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelAppointment = () => {
    Alert.alert("", "Bạn chắc chắn muốn huỷ cuộc hẹn này?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await cancelAppointment(item._id);
        },
      },
    ]);
  };

  const handleMakeAnAppointment = async () => {
    const doctorToSend = {
      ...doctor,
      name: doctor.username,
    };
    navigation.navigate("DoctorInfo", {
      doctorSelected: doctorToSend,
    });
  };

  return (
    <View style={styles.container} key={appointmentKey}>
      <View style={styles.doctorContainer}>
        <View style={styles.doctorImageContainer}>
          <Image
            source={
              doctor.profile_image
                ? { uri: doctor.profile_image }
                : images.doctor_default
            }
            style={styles.doctorImage}
          />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.username}</Text>
          <Text style={styles.doctorSpecialty}>
            {doctor?.speciality_id?.name} khu vực {doctor?.region_id?.name}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate("AppointmentDetail", {
                doctor: doctor,
                appoinment: item,
                filter: filter,
              })
            }>
            <AntDesign style={styles.iconStyle} name="ellipsis1" size={24} />
          </TouchableOpacity>

          {filter !== "Upcoming" && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleMakeAnAppointment()}>
              <AntDesign style={styles.iconStyle} name="calendar" size={24} />
            </TouchableOpacity>
          )}

          {filter === "Upcoming" && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleCancelAppointment()}>
              <AntDesign
                style={styles.iconStyle}
                name="closesquareo"
                size={24}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.infoRow}>
        <Text style={styles.infoItem}>Lịch khám:</Text>
        <Text style={styles.infoItem}>
          {convertAppointmentDate(item.appointment_day)}
        </Text>
      </View>
      <Text style={[styles.infoItem, { textAlign: "right", marginBottom: 4 }]}>
        {item.appointment_time_start} - {item.appointment_time_end}
      </Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoItem}>Ngày đặt lịch:</Text>
        <Text style={styles.infoItem}>
          {formatDistanceToNow(new Date(item.createdAt), {
            addSuffix: true,
            locale: vi,
          })}
        </Text>
      </View>

      {filter === "Upcoming" && checkHour(item) && (
        <View style={styles.restoreButton}>
          <Text style={{ color: COLORS.white }}>Đang diễn ra</Text>
        </View>
      )}
    </View>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: COLORS.PersianGreen,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.Light20PersianGreen,
  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.Light20PersianGreen,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: "cover",
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: COLORS.gray,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    size: 24,
    color: COLORS.PersianGreen,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    fontSize: 14,
    color: COLORS.gray,
  },
  restoreButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: COLORS.Light20PersianGreen,
    borderRadius: 999,
    marginTop: 5,
  },
  separator: {
    height: 1.5,
    backgroundColor: COLORS.Light20PersianGreen,
    marginVertical: 5,
    borderRadius: 999,
    marginHorizontal: 15,
  },
});
