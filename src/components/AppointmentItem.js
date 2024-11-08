import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Account_API from "../API/Account_API";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import Speciality_API from "../API/Speciality_API";
import Region_API from "../API/Region_API";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { convertAppointmentDate } from "../utils/ConvertDate";

const AppointmentItem = ({ appointmentKey, item, navigation, filter }) => {
  const [doctor, setDoctor] = useState({});
  const [specialty, setSpecialty] = useState({});
  const [region, setRegion] = useState({});

  useEffect(() => {
    const getDoctorById = async () => {
      try {
        const doctor = await Account_API.get_Account_By_Id(item.doctor_id);
        setDoctor(doctor);
        const speciality = await Speciality_API.get_Speciality_By_Id(
          doctor.speciality_id
        );
        setSpecialty(speciality);
        const region = await Region_API.get_Region_By_Id(doctor.region_id);
        setRegion(region);
      } catch (error) {
        console.error(error);
      }
    };

    getDoctorById();
  }, [item]);

  const handleCancelAppointment = async () => {
    try {
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container} key={appointmentKey}>
      <View style={styles.doctorContainer}>
        <Image
          source={
            doctor.profile_image
              ? { uri: `data:image/png;base64,${doctor.profile_image}` }
              : images.doctor_default
          }
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.username}</Text>
          <Text style={styles.doctorSpecialty}>
            {specialty.name} khu vực {region.name}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate("AppointmentDetail", {
                doctor: doctor,
                specialty: specialty,
                region: region,
                appoinment: item,
              })
            }>
            <AntDesign style={styles.iconStyle} name="ellipsis1" size={24} />
          </TouchableOpacity>

          {filter !== "Upcoming" && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                const doctorToSend = {
                  ...doctor,
                  name: doctor.username,
                };
                navigation.navigate("DoctorInfo", {
                  doctorSelected: doctorToSend,
                });
              }}>
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
      <View
        style={{
          height: 1.5,
          backgroundColor: COLORS.Light20PersianGreen,
          marginVertical: 5,
          borderRadius: 999,
          marginHorizontal: 15,
        }}
      />
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
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
});
