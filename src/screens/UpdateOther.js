import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images} from "../constants";
import { HeaderBack} from "../components";
import Account_API from "../API/Account_API";
import { UploadImage } from "../utils/Upload"; 
import { useAuth } from "../AuthProvider";
import { Picker } from '@react-native-picker/picker';
import moment from "moment";

const UpdateOther = ({ navigation }) => {
  const { storedToken, account, setAccount } = useAuth();
  const [imageFile, setImageFile] = useState(account?.proof);
  const [selectedDay, setSelectedDay] = useState("Monday"); 
  const [activeHours, setActiveHours] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [currentHour, setCurrentHour] = useState(null); 
  const [day, setDay] = useState(""); 
  const [startTime, setStartTime] = useState(""); 
  const [endTime, setEndTime] = useState(""); 
  const [appointmentLimit, setAppointmentLimit] = useState("");
  const [hourType, setHourType] = useState("appointment"); 
  const [filteredHours, setFilteredHours] = useState([]);
  
  useEffect(() => {
    const fetchActiveHours = async () => {
  try {
    const doctor_id = account._id; 
    const response = await Account_API.get_Doctor_Active_Hour_List(doctor_id);
    console.log("Dữ liệu giờ làm việc trước xử lý:", response);

    // Lọc bỏ phần tử không hợp lệ
    const validActiveHours = Array.isArray(response.active_hours)
      ? response.active_hours.filter((hour) => hour && typeof hour === "object")
      : [];
    
    setActiveHours(validActiveHours);
    console.log("Dữ liệu giờ làm việc sau xử lý:", validActiveHours);
  } catch (error) {
    console.error("Lỗi khi lấy giờ làm việc:", error.message);
  }
};
    fetchActiveHours();
  }, []);

  const filterHours = (day, hours) => {
    const filtered = hours.filter((hour) => hour.day === day);
    setFilteredHours(filtered);
    setSelectedDay(day);
  };

  const handleSaveHour = async () => {
    try {
        console.log("Ngày trước khi lưu:", day); 
        const doctor_id = account._id;
        
        const newHour = {
          day,
          start_time: startTime,
          end_time: endTime,
          hour_type: hourType,
          appointment_limit: Number(appointmentLimit),
        };
        if (currentHour) {
            const response = await Account_API.updateDoctorActiveHour(doctor_id, {
                ...newHour,
                old_day: currentHour.day,
                old_start_time: currentHour.start_time,
                old_end_time: currentHour.end_time,
                old_hour_type: currentHour.hour_type,
              });
              console.log("Response from server:", response);

            setActiveHours((prev) =>
            prev.map((hour) =>
              hour._id === currentHour._id ? { ...hour, ...newHour } : hour
            )
          );
          filterHours(selectedDay, response?.active_hours)
          Alert.alert("Thành công", "Giờ làm việc đã được cập nhật!");
        } else {
          // Thêm giờ làm việc mới
          const response = await Account_API.addDoctorActiveHour(doctor_id, newHour);
          setActiveHours(response);
        //   setActiveHours([...activeHours, response]);
          filterHours(selectedDay, response);
          Alert.alert("Thành công", "Giờ làm việc đã được thêm!");
        }
        setShowModal(false);
      } catch (error) {
        Alert.alert("Lỗi", error.message || "Không thể lưu giờ làm việc.");
        console.error("Lỗi khi lưu giờ làm việc:", error.message);
      }
  };
  
  const handleDeleteHour = async (hour) => {
    try {
        const doctor_id = account._id;
        const response = await Account_API.deleteDoctorActiveHour(doctor_id, hour);
        setActiveHours((prev) => prev.filter((item) => item._id !== hour._id));
        console.log("Response from server:", response);
        Alert.alert("Thành công", "Giờ làm việc đã được xóa!");
      } catch (error) {
        Alert.alert("Lỗi", error.message || "Không thể xóa giờ làm việc.");
        console.error("Lỗi khi xóa giờ làm việc:", error.message);
      }
};
  
  return (
    <SafeAreaView style={styles.container}>
    <HeaderBack navigation={navigation} title="Giờ Làm Việc" />
    <ScrollView horizontal style={styles.dayScrollView} showsHorizontalScrollIndicator={false}>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
        (day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => filterHours(day, activeHours)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        )
      )}
    </ScrollView>

    <ScrollView style={{height: "100%"}}>
      {filteredHours.map((hour) => (
        <View key={hour._id} style={styles.hourItem}>
          <Text>{`${hour.start_time} - ${hour.end_time}`}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                setCurrentHour(hour);
                setDay(hour.day);
                setStartTime(hour.start_time);
                setEndTime(hour.end_time);
                setHourType(hour.hour_type);
                setAppointmentLimit(hour.appointment_limit?.toString());
                setShowModal(true);
              }}
            >
              <Text style={styles.editButton}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const updatedHours = activeHours.filter(
                  (item) => item._id !== hour._id
                );
                setActiveHours(updatedHours);
                filterHours(selectedDay, updatedHours);
              }}
            >
              <Text style={styles.deleteButton}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>

    <TouchableOpacity
      style={styles.addButton}
      onPress={() => {
        setCurrentHour(null);
        setDay(selectedDay);
        setStartTime("");
        setEndTime("");
        setHourType("appointment");
        setAppointmentLimit("");
        setShowModal(true);
      }}
    >
      <Text style={styles.addButtonText}>Thêm giờ làm việc</Text>
    </TouchableOpacity>

    <Modal visible={showModal} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {currentHour ? "Sửa Giờ Làm Việc" : "Thêm Giờ Làm Việc"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Giờ Bắt Đầu (VD: 08:00)"
            value={startTime}
            onChangeText={setStartTime}
          />
          <TextInput
            style={styles.input}
            placeholder="Giờ Kết Thúc (VD: 17:00)"
            value={endTime}
            onChangeText={setEndTime}
          />
          <Picker
            selectedValue={hourType}
            style={styles.picker}
            onValueChange={(itemValue) => setHourType(itemValue)}
          >
            <Picker.Item label="Lịch khám" value="appointment" />
            <Picker.Item label="Lịch làm việc" value="working" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Giới hạn số cuộc hẹn"
            value={appointmentLimit}
            onChangeText={setAppointmentLimit}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveHour}
          >
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </SafeAreaView>
);
};
export default UpdateOther;

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: COLORS.white 
    },
    dayScrollView: {
        height: 90, 
        marginVertical: 10,
    },
    dayButton: {
        padding: 5,
        backgroundColor: COLORS.lightGray,
        marginHorizontal: 5,
        borderRadius: 10,
        flex: 1,
        width: 100,
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.Light50PersianGreen
    },
    selectedDayButton: {
        backgroundColor: COLORS.PersianGreen,
      },
      dayButtonText: {
        color: COLORS.black,
        textAlign: 'center',
        fontSize: 16
      },
      selectedDayButtonText: {
        color: COLORS.white,
        fontWeight: "bold"
      },
    section: { 
    //   marginBottom: 20, 
    //   paddingHorizontal: 15 
    padding: 20,
    },
    title: { 
      fontSize: 18, 
      fontWeight: "bold", 
      marginBottom: 10 
    },
    fileContainer: { 
      flexDirection: "row", 
      justifyContent: "space-between",
      alignItems: "center",
    },
    imagePreview: {
        width: 200,
        height: 200,
        marginVertical: 10,
      },
    hourItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: COLORS.silver,
    },
    actions: {
        flexDirection: "row" 
    },
    addButton: {
      backgroundColor: COLORS.PersianGreen,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    addButtonText: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "bold",
    },
    editButton: {
      color: COLORS.blue,
      fontWeight: "bold",
      fontSize: 14,
      paddingHorizontal: 10,
    },
    deleteButton: {
      color: COLORS.red,
      fontWeight: "bold",
      fontSize: 14,
      paddingHorizontal: 10,
    },
    saveButton: {
      backgroundColor: COLORS.PersianGreen,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    saveButtonText: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "bold",
    },
    cancelButton: {
      backgroundColor: COLORS.gray,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    cancelButtonText: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)", // Màu nền mờ
    },
    modalContent: {
      width: "90%",
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      elevation: 5, // Đổ bóng
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.silver,
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      fontSize: 15,
    },
    timeSlot: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: COLORS.silver,
        borderRadius: 5,
        alignItems: "center",
      },
      selectedTimeSlot: {
        backgroundColor: COLORS.PersianGreen,
      },
      timeSlotText: {
        color: COLORS.white,
        fontWeight: "bold",
      },
      input: {
        borderWidth: 1,
        borderColor: COLORS.silver,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 15,
      },
      picker: {
        borderWidth: 1,
        borderColor: COLORS.silver,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 15,
      },      
      
  });