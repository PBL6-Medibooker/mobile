// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   Modal,
//   Alert,
//   Image
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { COLORS, images} from "../constants";
// import { HeaderBack, CalendarCustom } from "../components";
// import Account_API from "../API/Account_API";
// import { UploadImage } from "../utils/Upload"; 
// import { useAuth } from "../AuthProvider";
// import { Picker } from '@react-native-picker/picker';
// import CalendarCustomDoctor from "../components/CalendarCustomDoctor";
// import moment from "moment";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";


// const Nhap = ({ navigation }) => {
//   const { storedToken, account, setAccount } = useAuth();

//   const [imageFile, setImageFile] = useState(account?.proof);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [activeHours, setActiveHours] = useState([]); 
//   const [showModal, setShowModal] = useState(false); 
//   const [currentHour, setCurrentHour] = useState(null); 
//   const [day, setDay] = useState(""); 
//   const [startTime, setStartTime] = useState(""); 
//   const [endTime, setEndTime] = useState(""); 
//   const [appointmentLimit, setAppointmentLimit] = useState("");
//   const [hourType, setHourType] = useState("appointment"); 

  

//   const handleUploadImage = async () => {

//     const image = await UploadImage();
//     if (image) {
//       console.log("image selected", image);
//       setImageFile(image);
//     }
//   };

//   const handleSave = async () => {
//     console.log("HandleSave goi");
//     const formData = new FormData();

//     if (imageFile) {
//       formData.append("proof", {
//         uri: imageFile,
//         type: "image/jpeg", 
//         name: "proof.jpg", 
//       });
//     }
//     // Kiểm tra ID
//     const doctor_id = account._id;
//     console.log('account gg', doctor_id);
//     try {
//       const response = await Account_API.uploadDoctorProof(doctor_id, imageFile);
//       if (response) {
//         Alert.alert("Cập nhật thành công");
        
//         console.log("Account log: ", response);
//         setAccount(response)
//         setImageFile(null)

//       } else {
//         Alert.alert("Cập nhật thất bại", response.error || "Vui lòng thử lại");
//       }
//     } catch (error) {
//       Alert.alert("Có lỗi xảy ra", "Vui lòng thử lại sau");
//     }
//   };


//   return (
//     <SafeAreaView style={styles.container}>
//       <HeaderBack navigation={navigation} title="Chỉnh Sửa Hồ Sơ" />
//       <View style={styles.content}>
//         <View style={styles.myAvatar}>
//           <TouchableOpacity activeOpacity={0.85}>
//             <Image
//               source={
//                 imageFile
//                   ? { uri: imageFile }
//                   : account?.proof
//                     ? { uri: account.proof }
//                     : images.doctor_default
//               }
//               style={styles.image}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             activeOpacity={0.7}
//             onPress={handleUploadImage}
//             style={styles.uploadAvatar}>
//             <MaterialIcons name="photo-camera" size={22} color={COLORS.gray} />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.saveButton} onPress={() => handleSave()}>
//           <Text style={styles.saveButtonText}>Lưu</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Nhap;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   content: {
//     padding: 20,
//   },
//   myAvatar: {
//     width: 120,
//     aspectRatio: 1,
//     resizeMode: "cover",
//     borderRadius: 40,
//     marginRight: 5,
//     backgroundColor: COLORS.silver,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 40,
//   },
//   uploadAvatar: {
//     position: "absolute",
//     top: 91,
//     start: 91,
//     backgroundColor: COLORS.white,
//     padding: 2,
//     borderRadius: 999,
//   },
//   form: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 15,
//     color: COLORS.PersianGreen,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   input: {
//     backgroundColor: COLORS.white,
//     padding: 10,
//     borderRadius: 20,
//     marginBottom: 15,
//     borderColor: COLORS.silver,
//     borderWidth: 1,
//   },
//   saveButton: {
//     backgroundColor: COLORS.PersianGreen,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });




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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { HeaderBack, CalendarCustom } from "../components";
import Account_API from "../API/Account_API";
import { UploadPDF } from "../utils/Upload"; 
import { useAuth } from "../AuthProvider";
import { Picker } from '@react-native-picker/picker';


const Nhap = ({ navigation }) => {
  const { storedToken, account, setAccount } = useAuth();
  const [pdfFile, setPdfFile] = useState(null);
  const [activeHours, setActiveHours] = useState([]); 
  const [showModal, setShowModal] = useState(false); 
  const [currentHour, setCurrentHour] = useState(null); 
  const [day, setDay] = useState(""); 
  const [startTime, setStartTime] = useState(""); 
  const [endTime, setEndTime] = useState(""); 
  const [appointmentLimit, setAppointmentLimit] = useState("");
  const [hourType, setHourType] = useState("appointment"); 
  
  useEffect(() => {
    const fetchProof = async () => {
      try {
        const doctor_id = account._id;
        const proof = await Account_API.getDoctorProof(doctor_id); 
        if (proof) {
          setPdfFile(proof); 
        }
      } catch (error) {
        console.error("Lỗi khi lấy minh chứng:", error.message);
      }
    };
    
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
    fetchProof();
    fetchActiveHours();
  }, []);

  const handleUploadPDF = async () => {
    try {
      const pdfFile = await UploadPDF();
        const doctor_id = account._id; 
        const response = await Account_API.uploadDoctorProof(doctor_id, pdfFile);

        if (response) {
          setAccount((prev) => ({
        ...prev,
        proof: response.proof, 
        }));

         setPdfFile({
            name: pdfFile.name,
            buffer: pdfFile.uri, 
          });
          Alert.alert("Thành công", "File PDF đã được tải lên!");
          console.log("Kết quả từ server:", response);
      } else {
        Alert.alert("Thông báo", "Không có file nào được chọn.");
      }
    } catch (error) {
      Alert.alert("Lỗi", error.message || "Không thể tải lên file PDF.");
      console.error("Lỗi khi upload PDF:", error.message);
    }
  };
  
  const handleSaveHour = async () => {
    try {
        const doctor_id = account._id;
        const newHour = {
          day,
          start_time: startTime,
          end_time: endTime,
          hour_type: hourType,
          appointment_limit: Number(appointmentLimit),
        };
    
        if (currentHour) {
          // Chỉnh sửa giờ làm việc
          const response = await Account_API.updateDoctorActiveHour(
            doctor_id,
            newHour,
            currentHour
          );
          setActiveHours((prev) =>
            prev.map((hour) =>
              hour._id === currentHour._id ? { ...hour, ...newHour } : hour
            )
          );
          Alert.alert("Thành công", "Giờ làm việc đã được cập nhật!");
        } else {
          // Thêm giờ làm việc mới
          const response = await Account_API.addDoctorActiveHour(doctor_id, newHour);
          setActiveHours((prev) => [...prev, response]);
          Alert.alert("Thành công", "Giờ làm việc đã được thêm!");
        }
        setShowModal(false);
      } catch (error) {
        Alert.alert("Lỗi", error.message || "Không thể lưu giờ làm việc.");
        console.error("Lỗi khi lưu giờ làm việc:", error.message);
      }
  };
  

  // Xóa giờ làm việc
  const handleDeleteHour = async (hour) => {
    try {
        const doctor_id = account._id;
        const response = await Account_API.deleteDoctorActiveHour(doctor_id, hour);
        setActiveHours((prev) => prev.filter((item) => item._id !== hour._id));
        Alert.alert("Thành công", "Giờ làm việc đã được xóa!");
      } catch (error) {
        Alert.alert("Lỗi", error.message || "Không thể xóa giờ làm việc.");
        console.error("Lỗi khi xóa giờ làm việc:", error.message);
      }
};
  
const handleSaveAll = async () => {
    
  };
  
  return (
    <SafeAreaView style={styles.container}>
  <HeaderBack navigation={navigation} title="Minh Chứng và Giờ Làm Việc" />
  {/* Minh chứng bác sĩ */}
  <View style={styles.section}>
    <Text style={styles.title}>Minh Chứng</Text>
    {pdfFile ? (
      <View style={styles.fileContainer}>
        <Text>{pdfFile.name || "File minh chứng"}</Text>
        <TouchableOpacity onPress={handleUploadPDF}>
          <Text style={styles.deleteButton}>Thay thế</Text>
        </TouchableOpacity>
      </View>
    ) : (
<TouchableOpacity style={styles.uploadButton} onPress={handleUploadPDF}>
        <Text style={styles.uploadButtonText}>Tải File PDF</Text>
      </TouchableOpacity>
    )}
  </View>

  {/* Giờ làm việc */}
  <View style={styles.section}>
    <Text style={styles.title}>Giờ Làm Việc</Text>
    
    onAddHour={(day) => {
        // Mở modal thêm giờ làm việc
        setDay(day); 
        setStartTime(""); 
        setEndTime(""); 
        setHourType("appointment"); 
        setAppointmentLimit("");
        setCurrentHour(null); 
        setShowModal(true);
      }}
      onEditHour={(hour) => {
        // Mở modal chỉnh sửa giờ làm việc
        setDay(hour.day);
        setStartTime(hour.start_time);
        setEndTime(hour.end_time);
        setHourType(hour.hour_type);
        setAppointmentLimit(hour.appointment_limit?.toString());
        setCurrentHour(hour); // Chỉnh sửa giờ làm việc hiện tại
        setShowModal(true);
      }}
      onDeleteHour={handleDeleteHour} // Xóa giờ làm việc
            
    
    </View>

  {/* Nút Lưu tất cả */}
  <TouchableOpacity style={styles.saveButton} onPress={handleSaveAll}>
    <Text style={styles.saveButtonText}>Lưu tất cả</Text>
  </TouchableOpacity>
  {/* Modal thêm/sửa giờ làm việc */}
  <Modal visible={showModal} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {currentHour ? "Sửa Giờ Làm Việc" : "Thêm Giờ Làm Việc"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Ngày (VD: Thứ Hai)"
          value={day}
          onChangeText={setDay}
        />
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
          style={styles.input}
          onValueChange={(itemValue) => setHourType(itemValue)}
        >
            <Picker.Item label="Lịch khám" value="appointment" />
            <Picker.Item label="Lịch làm việc" value="working" />
            </Picker>
        <TextInput
        style={styles.input}
        placeholder="Giới hạn số cuộc hẹn (VD: 5)"
        value={appointmentLimit}
        onChangeText={setAppointmentLimit}
        keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            handleSaveHour();
            setShowModal(false);
          }}
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

export default Nhap;
const styles = StyleSheet.create({
    // Các style đã có
    container: { 
      flex: 1, 
      backgroundColor: COLORS.white 
    },
    section: { 
      marginBottom: 20, 
      paddingHorizontal: 15 
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
    uploadButton: {
      backgroundColor: COLORS.PersianGreen,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    uploadButtonText: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: "bold",
    },
    hourItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: COLORS.silver,
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


