import React, { useCallback, useEffect, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import Appointment_API from "../API/Appointment_API";
import { useAuth } from "../AuthProvider";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { DoctorAppointmentItem } from "../components";

const DoctorAppointment = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("Upcoming");
  const { account } = useAuth();

  const [appoinmentsUpcoming, setAppoinmentsUpcoming] = useState([]);
  const [appoinmentsComplete, setAppoinmentsComplete] = useState([]);
  const [appoinmentsCanceled, setAppoinmentsCanceled] = useState([]);

  const route = useRoute();

  const getAppointments = async () => {
    try {
      const appointments =
        await Appointment_API.get_Doctor_Appointment_By_Status(account._id);
      
      setAppoinmentsComplete(appointments?.complete);
      setAppoinmentsUpcoming(appointments?.upcoming);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cuộc hẹn:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (account && account._id) {
        getAppointments();
      }
    }, [account, route.params?.refresh])
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Cuộc hẹn của tôi" />
      <View style={styles.filterContainer}>
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
      </View>

      <ScrollView contentContainerStyle={styles.mainContainer}>
      
        {selectedFilter === "Complete" &&
          appoinmentsComplete?.map((appointment) => (
            <DoctorAppointmentItem
              key={appointment._id}
              appointmentKey={appointment._id}
              item={appointment}
              navigation={navigation}
              filter={selectedFilter}
            />
          ))}
        {selectedFilter === "Upcoming" &&
          appoinmentsUpcoming?.map((appointment) => (
            <DoctorAppointmentItem
              key={appointment._id}
              appointmentKey={appointment._id}
              item={appointment}
              navigation={navigation}
              filter={selectedFilter}
            />
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
    marginHorizontal: 10,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.PersianGreen,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  activeButton: {
    backgroundColor: COLORS.PersianGreen,
  },
  filterButtonText: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeButtonText: {
    color: COLORS.white,
  },
  mainContainer: {
    paddingHorizontal: 15,
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

export default DoctorAppointment;
