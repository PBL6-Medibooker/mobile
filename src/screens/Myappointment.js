import React, { useState } from "react";
import HeaderBack from "../components/HeaderBack";
import { COLORS, images } from "../constants";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const Myappointment = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("Complete");

  const doctors = [
    { name: "PGS.TS.BS Lê Hoàng", specialty: "Khoa tim mạch" },
    { name: "PGS.TS.BS Nguyễn Minh", specialty: "Khoa ngoại thần kinh" },
    { name: "TS.BS Châu Thanh Vũ.", specialty: "Khoa nhi" },
    { name: "TS.BS Kiều Phương Linh.", specialty: "Khoa răng-hàm-mặt" },
    { name: "PGS.TS.BS Đàm Văn Thanh.", specialty: "Khoa hô hấp" },
    { name: "GS.TS.BS Kiều Phương Linh.", specialty: "Khoa răng-hàm-mặt" },
    { name: "GS.TS.BS Kiều Phương Linh.", specialty: "Khoa răng-hàm-mặt" },
    { name: "GS.TS.BS Kiều Phương Linh.", specialty: "Khoa răng-hàm-mặt" },
    { name: "GS.TS.BS Kiều Phương Linh.", specialty: "Khoa răng-hàm-mặt" },
    { name: "GS.TS.BS Kiều Phương Linh.", specialty: "Khoa răng-hàm-mặt" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Cuộc hẹn của tôi" />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Complete" && styles.activeButton,
          ]}
          onPress={() => setSelectedFilter("Complete")}>
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Complete" && styles.activeButtonText,
            ]}>
            Complete
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Upcoming" && styles.activeButton,
          ]}
          onPress={() => setSelectedFilter("Upcoming")}>
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Upcoming" && styles.activeButtonText,
            ]}>
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Cancelled" && styles.activeButton,
          ]}
          onPress={() => setSelectedFilter("Cancelled")}>
          <Text
            style={[
              styles.filterButtonText,
              selectedFilter === "Cancelled" && styles.activeButtonText,
            ]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.mainContainer}>
        {doctors.map((doctor, index) => (
          <View key={index} style={styles.doctorContainer}>
            <Image source={images.avatar} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("AppointmentDetail")}>
                <AntDesign
                  style={styles.iconStyle}
                  name="ellipsis1"
                  size={24}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("Booking")}>
                <AntDesign style={styles.iconStyle} name="calendar" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("SettingAccount")}>
                <AntDesign
                  style={styles.iconStyle}
                  name="closesquareo"
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.PersianGreen,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
  },
  activeButton: {
    backgroundColor: COLORS.PersianGreen,
  },
  filterButtonText: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
  },
  activeButtonText: {
    color: COLORS.white,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  iconButton: {
    marginHorizontal: 4,
  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: COLORS.PersianGreen,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
});

export default Myappointment;