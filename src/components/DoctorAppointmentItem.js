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
import Speciality_API from "../API/Speciality_API";
import Region_API from "../API/Region_API";
import { formatDistanceToNow, parse } from "date-fns";
import { it, vi } from "date-fns/locale";
import {
  convertAppointmentDate,
  parseAppointmentEndDate,
} from "../utils/ConvertDate";
import Appointment_API from "../API/Appointment_API";

const DoctorAppointmentItem = ({
  appointmentKey,
  item,
  navigation,
  filter,
}) => {
  const [doctor, setDoctor] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const getDoctorById = async () => {
      try {
        const doctor = await Account_API.get_Account_By_Id(item.doctor_id);
        setDoctor(doctor);
        const userRes = await Account_API.get_Account_By_Id(item.user_id);
        setUser(userRes);
      } catch (error) {
        console.error(error);
      }
    };

    getDoctorById();
  }, [item]);

  const checkHour = (appointment) => {
    const now = new Date();
    const datePart = appointment.appointment_day.split(" ").slice(1).join(" ");
    const parsedDate = parse(datePart, "dd/MM/yyyy", new Date());

    if (
      parsedDate.getDate() === now.getDate() &&
      parsedDate.getMonth() === now.getMonth() &&
      parsedDate.getFullYear() === now.getFullYear()
    ) {
      const [hour, minute] = appointment.appointment_time_start
        .split(":")
        .map(Number);

      if (now.getHours() >= hour) return true;
    }

    return false;
  };

  const restoreAppointment = async (appointment) => {
    try {
      const restore = await Appointment_API.restore_Appointment(
        appointment._id
      );
      if (typeof restore === "object") {
        Alert.alert("Thông báo", "Khôi phục lịch hẹn thành công.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("BookingHistory", {
                refresh: `restore ${appointment._id}`,
              });
            },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreAppointment = () => {
    Alert.alert("", "Bạn chắc chắn muốn khôi phục cuộc hẹn này?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          restoreAppointment(item);
        },
      },
    ]);
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const cancel = await Appointment_API.soft_delete_Appointment(
        appointmentId
      );
      if (typeof cancel === "object") {
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

  return (
    <View style={styles.containerAppointment} key={appointmentKey}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.container} />
        <View style={{ flex: 1, marginVertical: 15, marginHorizontal: 20 }}>
          <View style={styles.doctorContainer}>
            <View style={styles.doctorImageContainer}>
              <Image
                source={
                  user.profile_image
                    ? { uri: user.profile_image }
                    : images.user_default
                }
                style={styles.doctorImage}
              />
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{user.username}</Text>
              <Text style={styles.doctorSpecialty}>{user?.email}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  navigation.navigate("DoctorAppointmentDetail", {
                    user: user,
                    appoinment: item,
                    filter: filter
                  })
                }>
                <AntDesign
                  style={styles.iconStyle}
                  name="ellipsis1"
                  size={24}
                />
              </TouchableOpacity>

              {/* {filter === "Upcoming" && (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleCancelAppointment()}>
                  <AntDesign
                    style={styles.iconStyle}
                    name="closesquareo"
                    size={24}
                  />
                </TouchableOpacity>
              )} */}
            </View>
          </View>
          {/* <View style={styles.separator} /> */}
          {item?.health_issue && (
            <Text style={{ color: COLORS.gray, marginBottom: 5 }}>
              Tình trạng sức khoẻ: {item.health_issue}
            </Text>
          )}
          <View style={styles.infoRow}>
            <Text style={{ fontSize: 14, marginEnd: 5 }}>
              {item.appointment_time_start} - {item.appointment_time_end}
            </Text>
            <Text style={{ fontSize: 15 }}>
              {convertAppointmentDate(item.appointment_day)}
            </Text>
          </View>
          {filter === "Upcoming" && !checkHour(item) && (
            <TouchableOpacity
              onPress={() => handleCancelAppointment()}
              style={styles.restoreButton}>
              <AntDesign
                name="closecircleo"
                size={20}
                color={COLORS.PersianGreen}
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: COLORS.PersianGreen }}>Cancel</Text>
            </TouchableOpacity>
          )}

          {filter === "Cancelled" &&
            parseAppointmentEndDate(item) > new Date() && (
              <TouchableOpacity
                onPress={() => handleRestoreAppointment()}
                style={styles.restoreButton}>
                <Text style={{ color: COLORS.PersianGreen }}>Khôi phục</Text>
              </TouchableOpacity>
            )}

          {filter === "Upcoming" && checkHour(item) && (
            <View style={styles.restoreButton}>
              <Text style={{ color: COLORS.PersianGreen }}>Đang diễn ra</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DoctorAppointmentItem;

const styles = StyleSheet.create({
  containerAppointment: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: COLORS.PersianGreen,
    borderWidth: 1,
    borderColor: COLORS.Light20PersianGreen,
    // elevation: 2,
  },
  container: {
    width: 8,
    backgroundColor: COLORS.PersianGreen,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  doctorImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.Light20PersianGreen,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 999,
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
    marginBottom: 5,
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoItem: {
    fontSize: 14,
    color: COLORS.gray,
  },
  restoreButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingVertical: 8,
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
