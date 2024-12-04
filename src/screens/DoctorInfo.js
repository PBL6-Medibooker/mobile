// import { SafeAreaView } from "react-native-safe-area-context";
// import { CalendarCustom, HeaderBack } from "../components";
// import { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { COLORS, images } from "../constants";
// import { useAuth } from "../AuthProvider";
// import Speciality_API from "../API/Speciality_API";
// import Region_API from "../API/Region_API";
// import { useFocusEffect } from "@react-navigation/native";
// import Account_API from "../API/Account_API";

// const DoctorInfo = ({ navigation, route }) => {
//   const { doctorSelected } = route.params || {};

//   const { isLoggedIn } = useAuth();

//   const [area, setArea] = useState(null);
//   const [specialty, setSpecialty] = useState(null);
//   const [healthStatus, setHealthStatus] = useState(null);

//   const [activeHours, setActiveHours] = useState({});

//   const [selectedDay, setSelectedDay] = useState({
//     date: null,
//     dayOfWeek: null,
//     time: null,
//   });

//   const [message, setMessage] = useState(null);
//   const [loading, setloading] = useState(false);

//   // const { isLoggedIn } = useAuth();

//   // useEffect(() => {
//   //   const get_Doctor_Active_Hours = async () => {
//   //     const activeHours = await Account_API.get_Doctor_Active_Hour_List(
//   //       doctor._id
//   //     );
//   //     console.log(activeHours);
//   //   };
//   //   get_Doctor_Active_Hours();
//   // }, [doctorSelected]);

//   const getSpecialtyAndRegionById = async () => {
//     setloading(true);
//     const specialtyById = await Speciality_API.get_Speciality_By_Id(
//       doctorSelected?.speciality_id?._id
//         ? doctorSelected.speciality_id._id
//         : doctorSelected.speciality_id
//     );
//     setSpecialty(specialtyById);
//     const regionById = await Region_API.get_Region_By_Id(
//       doctorSelected?.region_id?._id
//         ? doctorSelected.region_id._id
//         : doctorSelected.region_id
//     );
//     setArea(regionById);
//     const activeHours = await Account_API.get_Doctor_Active_Hour_List(
//       doctorSelected._id
//     );
//     // console.log(activeHours);
//     setActiveHours(activeHours);
//     setloading(false);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getSpecialtyAndRegionById();
//     }, [])
//   );

//   const handleSetDate = () => {
//     if (selectedDay.time !== null) {
//       // console.log(selectedDay);
//       const info = {
//         region: area,
//         specialty: specialty,
//         doctor: doctorSelected,
//         medicalHistory: null,
//         healthStatus: healthStatus,
//         time: selectedDay,
//       };
//       navigation.navigate("VerifyBooking", info);
//     } else {
//       setMessage("* Chưa chọn ngày - khung giờ");
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={COLORS.PersianGreen} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <HeaderBack navigation={navigation} />
//         <View style={styles.contentTitle}>
//           <TouchableOpacity
//             activeOpacity={0.85}
//             onPress={() => {}}
//             style={styles.myAvatar}>
//             <Image
//               source={
//                 doctorSelected.profile_image
//                   ? {
//                       uri: doctorSelected.profile_image,
//                     }
//                   : images.doctor_default
//               }
//               style={styles.image}
//             />
//           </TouchableOpacity>

//           <View style={styles.myBasicInformation}>
//             <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
//               {doctorSelected.name}
//             </Text>
//             {specialty?.name && (
//               <Text style={styles.text}>{specialty?.name}</Text>
//             )}
//             {area?.name && <Text style={styles.text}>{area?.name}</Text>}
//           </View>
//         </View>

//         <View style={styles.mainContainer}>
//           <Text style={styles.titleText}>Giới thiệu</Text>
//           <Text style={styles.contentText}>{doctorSelected.bio}</Text>

//           <Text style={styles.titleText}>Lĩnh vực chuyên môn</Text>
//           <Text style={styles.contentText}>doctor.bio.introduction</Text>

//           <Text style={styles.titleText}>Thành viên hiệp hội</Text>
//           <Text style={styles.contentText}>doctor.bio.introduction</Text>

//           <CalendarCustom
//             // navigation={navigation}
//             schedule={activeHours ? activeHours : null}
//             setMessage={setMessage}
//             setSelectedDay={(val) => {
//               setSelectedDay(val);
//               // console.log("dp: ", val);
//             }}
//             selectedDay={selectedDay}
//             theme="light"
//           />

//           {message && (
//             <View style={{ flexDirection: "row", justifyContent: "center" }}>
//               <Text style={{ color: "red", textAlign: "center" }}>
//                 {message}
//               </Text>
//             </View>
//           )}

//           {selectedDay.time !== null && (
//             <View>
//               <Text style={styles.textHealth}>Tình trạng sức khoẻ</Text>
//               <TextInput
//                 style={styles.textInputHealth}
//                 numberOfLines={3}
//                 multiline
//                 value={healthStatus}
//                 onChangeText={setHealthStatus}
//               />
//             </View>
//           )}

//           <Pressable
//             onPress={() => {
//               if (isLoggedIn) handleSetDate();
//               else {
//               Alert.alert(
//                 "Thông báo",
//                 "Bạn cần đăng nhập để tiếp tục thao tác!",
//                 [
//                   {
//                     text: "Để sau",
//                     style: "cancel",
//                   },
//                   {
//                     text: "OK",
//                     onPress: () => navigation.navigate("Login"),
//                   },
//                 ]
//               );
//             }
//             }}
//             style={({ pressed }) => [
//               {
//                 backgroundColor: pressed
//                   ? COLORS.Light50PersianGreen
//                   : COLORS.PersianGreen,
//               },
//               styles.button,
//             ]}>
//             <Text style={styles.buttonText}>Đặt lịch hẹn với bác sĩ</Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DoctorInfo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   contentTitle: {
//     backgroundColor: COLORS.PersianGreen,
//     alignItems: "center",
//   },
//   myAvatar: {
//     width: "30%",
//     aspectRatio: 1,
//     resizeMode: "cover",
//     borderRadius: 999,
//     backgroundColor: COLORS.silver,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 999,
//   },
//   myBasicInformation: {
//     backgroundColor: COLORS.white,
//     marginVertical: 15,
//     borderRadius: 10,
//     padding: 5,
//     width: "70%",
//   },
//   text: {
//     textAlign: "center",
//   },
//   titleText: {
//     color: COLORS.PersianGreen,
//     fontSize: 18,
//   },
//   contentText: {
//     marginBottom: 8,
//     textAlign: "justify",
//   },
//   mainContainer: {
//     flex: 1,
//     margin: 15,
//   },
//   button: {
//     marginTop: 12,
//     borderRadius: 999,
//     color: COLORS.PersianGreen,
//     padding: 8,
//   },
//   buttonText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 15,
//   },
//   textHealth: {
//     color: COLORS.PersianGreen,
//     fontWeight: "bold",
//     fontSize: 15,
//     marginVertical: 5,
//   },
//   textInputHealth: {
//     borderWidth: 1,
//     borderColor: COLORS.silver,
//     borderRadius: 10,
//     textAlignVertical: "top",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     height: 100,
//     marginBottom: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });


import { SafeAreaView } from "react-native-safe-area-context";
import { CalendarCustom, HeaderBack } from "../components";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import { useAuth } from "../AuthProvider";
import Speciality_API from "../API/Speciality_API";
import Region_API from "../API/Region_API";
import { useFocusEffect } from "@react-navigation/native";
import Account_API from "../API/Account_API";
 
const DoctorInfo = ({ navigation, route }) => {
  const { doctorSelected } = route.params || {};
  const { storedToken, account, setAccount } = useAuth();
  const { isLoggedIn } = useAuth();
  const [area, setArea] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [activeHours, setActiveHours] = useState({});
  const [selectedDay, setSelectedDay] = useState({
    date: null,
    dayOfWeek: null,
    time: null,
  });
 
  const [message, setMessage] = useState(null);
  const [loading, setloading] = useState(false);
  const [introduce, setIntroduce] = useState(account?.introduce || "");
  const [workProcess, setWorkProcess] = useState(account?.workProcess ||"");
  const [educationProcess, setEducationProcess] = useState(account?.educationProcess ||"");
 
  const getSpecialtyAndRegionById = async () => {
    setloading(true);
    const specialtyById = await Speciality_API.get_Speciality_By_Id(
      doctorSelected?.speciality_id?._id
        ? doctorSelected.speciality_id._id
        : doctorSelected.speciality_id
    );
    setSpecialty(specialtyById);
    const regionById = await Region_API.get_Region_By_Id(
      doctorSelected?.region_id?._id
        ? doctorSelected.region_id._id
        : doctorSelected.region_id
    );
    setArea(regionById);
    const activeHours = await Account_API.get_Doctor_Active_Hour_List(
      doctorSelected._id
    );
    // console.log(activeHours);
    setActiveHours(activeHours);
 
    /// Tách bio
  const bio = doctorSelected?.bio || "";
  const bioParts = bio.split('\n');
 
  let intro = '';
  let workHistory = '';
  let educationHistory = '';
 
  bioParts.forEach((part) => {
    if (part.includes('Giới thiệu:')) {
      intro = part.replace('Giới thiệu:', '').trim();  
    } else if (part.includes('Quá trình công tác:')) {
      workHistory = part.replace('Quá trình công tác:', '').trim();  
    } else if (part.includes('Quá trình học tập:')) {
      educationHistory = part.replace('Quá trình học tập:', '').trim();  
    }
  });
    setIntroduce(intro);
    setWorkProcess(workHistory);
    setEducationProcess(educationHistory);
    setloading(false);
  };
 
  useFocusEffect(
    useCallback(() => {
      getSpecialtyAndRegionById();
    }, [])
  );
 
  const handleSetDate = () => {
    if (selectedDay.time !== null) {
      // console.log(selectedDay);
      const info = {
        region: area,
        specialty: specialty,
        doctor: doctorSelected,
        medicalHistory: null,
        healthStatus: healthStatus,
        time: selectedDay,
      };
      navigation.navigate("VerifyBooking", info);
    } else {
      setMessage("* Chưa chọn ngày - khung giờ");
    }
  };
 
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      </SafeAreaView>
    );
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} />
        <View style={styles.contentTitle}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {}}
            style={styles.myAvatar}>
            <Image
              source={
                doctorSelected.profile_image
                  ? {
                      uri: doctorSelected.profile_image,
                    }
                  : images.doctor_default
              }
              style={styles.image}
            />
          </TouchableOpacity>
 
          <View style={styles.myBasicInformation}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>
              {doctorSelected.name}
            </Text>
            {specialty?.name && (
              <Text style={styles.text}>{specialty?.name}</Text>
            )}
            {area?.name && <Text style={styles.text}>{area?.name}</Text>}
          </View>
        </View>
 
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>Giới thiệu</Text>
          <Text style={styles.contentText}>{introduce}</Text>
 
          <Text style={styles.titleText}>Quá trình công tác</Text>
          <Text style={styles.contentText}>{workProcess}</Text>
 
          <Text style={styles.titleText}>Quá trình học tập</Text>
          <Text style={styles.contentText}>{educationProcess}</Text>
 
          <CalendarCustom
            // navigation={navigation}
            schedule={activeHours ? activeHours : null}
            setMessage={setMessage}
            setSelectedDay={(val) => {
              setSelectedDay(val);
              // console.log("dp: ", val);
            }}
            selectedDay={selectedDay}
            theme="light"
          />
          {message && (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ color: "red", textAlign: "center" }}>
                {message}
              </Text>
            </View>
          )}
          {selectedDay.time !== null && (
            <View>
              <Text style={styles.textHealth}>Tình trạng sức khoẻ</Text>
              <TextInput
                style={styles.textInputHealth}
                numberOfLines={3}
                multiline
                value={healthStatus}
                onChangeText={setHealthStatus}
              />
            </View>
          )}
          <Pressable
            onPress={() => {
              if (isLoggedIn) handleSetDate();
              else {
              Alert.alert(
                "Thông báo",
                "Bạn cần đăng nhập để tiếp tục thao tác!",
                [
                  {
                    text: "Để sau",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("Login"),
                  },
                ]
              );
            }
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? COLORS.Light50PersianGreen
                  : COLORS.PersianGreen,
              },
              styles.button,
            ]}>
            <Text style={styles.buttonText}>Đặt lịch hẹn với bác sĩ</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default DoctorInfo;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentTitle: {
    backgroundColor: COLORS.PersianGreen,
    alignItems: "center",
  },
  myAvatar: {
    width: "30%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 999,
    backgroundColor: COLORS.silver,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  myBasicInformation: {
    backgroundColor: COLORS.white,
    marginVertical: 15,
    borderRadius: 10,
    padding: 5,
    width: "70%",
  },
  text: {
    textAlign: "center",
  },
  titleText: {
    color: COLORS.PersianGreen,
    fontSize: 18,
  },
  contentText: {
    marginBottom: 8,
    textAlign: "justify",
  },
  mainContainer: {
    flex: 1,
    margin: 15,
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
  textHealth: {
    color: COLORS.PersianGreen,
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 5,
  },
  textInputHealth: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 10,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 100,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});