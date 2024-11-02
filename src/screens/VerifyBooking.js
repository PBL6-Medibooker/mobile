import {
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
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "../AuthProvider";
import { useEffect, useState } from "react";
import Client_API from "../API/Client_API";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  formatDate,
  formatToDDMMYYYY,
  translateDayOfWeek,
} from "../utils/ConvertDate";
import Appointment_API from "../API/Appointment_API";

const VerifyBooking = ({ navigation, route }) => {
  const { accountInfo } = useAuth();
  const [client, setClient] = useState(null);
  const [insurance, setInsurance] = useState({
    insurance_name: null,
    insurance_number: null,
    insurance_location: null,
    insurance_exp_date: null,
  });

  const { region, specialty, doctor, medicalHistory, healthStatus, time } =
    route.params;

  useEffect(() => {
    const check_client = async () => {
      const client = await Client_API.get_Client_By_User_Id(accountInfo._id);
      setClient(client);
    };

    check_client();
  }, [accountInfo]);

  const handleRegister = async () => {
    if (!client) {
      const add_client = await Client_API.add_Client(
        accountInfo._id,
        insurance
      );
      if (add_client) {
        console.log(add_client);
        const add_appointment = await Appointment_API.add_Appointment(
          add_client._id,
          doctor._id,
          `${time.dayOfWeek} ${formatToDDMMYYYY(time.date)}`,
          time.time.start_time,
          time.time.end_time,
          healthStatus
        );
        if (add_appointment) {
          console.log(add_appointment);
          Alert.alert("Thông báo", "Đặt lịch hẹn thành công.", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBack navigation={navigation} title="Cuộc hẹn của bạn" />

        {/* Thông tin bác sĩ */}
        <View style={styles.doctorInfoContainer}>
          <View style={styles.doctorCard}>
            <Image source={images.avatar} style={styles.doctorImage} />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialty}>
                {specialty.name} khu vực {region.name}
              </Text>
              {/* <Text style={styles.specialty}>{region.name}</Text> */}
            </View>
          </View>
        </View>

        {/* Thông tin cuộc hẹn */}
        <View style={styles.appointmentInfo}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate(time.date)}</Text>
            <Text style={styles.timeText}>
              {translateDayOfWeek(time.dayOfWeek)}, {time.time.label}
            </Text>
          </View>
          <View style={styles.iconsContainer}>
            <AntDesign
              name="checkcircle"
              size={24}
              color={COLORS.PersianGreen}
            />
            <AntDesign
              name="calendar"
              size={24}
              color={COLORS.PersianGreen}
              style={styles.iconSpacing}
            />
          </View>
        </View>

        {/* Thông tin cá nhân */}
        <View style={styles.personalInfoContainer}>
          <Text style={styles.infoTitle}>Thông tin cá nhân</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ và Tên</Text>
            <Text style={styles.infoValue}>{accountInfo.username}</Text>
          </View>
          {/* <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tuổi</Text>
          <Text style={styles.infoValue}>30</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Giới tính</Text>
          <Text style={styles.infoValue}>Nữ</Text>
        </View> */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{accountInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            <Text style={styles.infoValue}>{accountInfo.phone}</Text>
          </View>
        </View>

        {/* Thông tin bảo hiểm */}
        {client && client.insurance ? (
          <View style={styles.problemContainer}>
            <Text style={styles.infoTitle}>Bảo hiểm</Text>
            <View style={styles.insuranceContainer}>
              {client.insurance.map((insurance, index) => (
                <View key={insurance._id}>
                  <View style={styles.infoInsurance}>
                    <Text style={styles.insuranceName}>{insurance.name}</Text>
                    <TouchableOpacity>
                      <FontAwesome6 name="edit" size={20} color={COLORS.blue} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 8 }}>
                      <FontAwesome6
                        name="trash-can"
                        size={20}
                        color={COLORS.blue}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.infoRow}>
                    <Text>Số BH:</Text>
                    <Text>{insurance.number}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text>Địa chỉ:</Text>
                    <Text>{insurance.location}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text>Ngày hết hạn:</Text>
                    <Text>{insurance.exp_date}</Text>
                  </View>

                  {index !== client.insurance.length - 1 && (
                    <View style={styles.separator}></View>
                  )}
                </View>
              ))}
            </View>
            {/* <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tên</Text>
            <Text style={styles.infoValue}>{client.insurance[0].name}</Text>
          </View> */}
          </View>
        ) : (
          <View style={styles.problemContainer}>
            <Text style={styles.infoTitle}>Bảo hiểm</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tên BH:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="BHYT"
                value={insurance.insurance_name}
                onChangeText={(val) =>
                  setInsurance({ ...insurance, insurance_name: val })
                }
              />
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số BH:</Text>
              <TextInput
                style={styles.textInput}
                keyboardType="number-pad"
                placeholder="123456789"
                value={insurance.insurance_number}
                onChangeText={(val) =>
                  setInsurance({ ...insurance, insurance_number: val })
                }
              />
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Địa chỉ:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Đà Nẵng"
                value={insurance.insurance_location}
                onChangeText={(val) =>
                  setInsurance({ ...insurance, insurance_location: val })
                }
              />
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngày hết hạn:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="12/12/2025"
                value={insurance.insurance_exp_date}
                onChangeText={(val) =>
                  setInsurance({ ...insurance, insurance_exp_date: val })
                }
              />
            </View>
          </View>
        )}

        {/* Tiền sử bệnh lý */}
        {accountInfo.underlying_condition !== "none" && (
          <View style={styles.problemContainer}>
            <Text style={styles.infoTitle}>Tiền sử bệnh lý</Text>
            <Text style={styles.problemText}>- {accountInfo.underlying_condition}</Text>
          </View>
        )}

        {/* Tình trạng sức khỏe */}
        {healthStatus && (
          <View style={styles.problemContainer}>
            <Text style={styles.infoTitle}>Tình trạng sức khỏe</Text>
            <Text style={styles.problemText}>- {healthStatus}</Text>
          </View>
        )}

        <View style={[styles.problemContainer, { marginBottom: 50 }]}>
          <Pressable
            onPress={() => {
              handleRegister();
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
              Đặt lịch
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  doctorInfoContainer: {
    alignItems: "center",
    backgroundColor: COLORS.PersianGreen,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    width: "90%",
    shadowColor: COLORS.gray,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.silver,
  },
  doctorDetails: {
    marginLeft: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  specialty: {
    fontSize: 16,
    color: COLORS.black,
    marginRight: 50,
  },
  appointmentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.Light50PersianGreen,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: "column",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.PersianGreen,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.PersianGreen,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginLeft: 10,
  },
  personalInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.PersianGreen,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  problemContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  problemText: {
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 22,
  },
  insuranceContainer: {
    padding: 10,
    borderRadius: 10,
    // borderWidth: 0.2,
    // borderColor: COLORS.PersianGreen,
    backgroundColor: COLORS.Concrete,
    shadowColor: COLORS.PersianGreen,
    elevation: 2,
  },
  infoInsurance: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  insuranceName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
  },
  updateInsurance: {
    textDecorationLine: "underline",
    color: COLORS.blue,
  },
  separator: {
    marginVertical: 15,
    height: 1.5,
    backgroundColor: COLORS.silver,
    marginHorizontal: 10,
    borderRadius: 999,
  },
  textInput: {
    marginVertical: 1,
    borderBottomWidth: 1,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderColor: COLORS.gray,
    width: "65%",
  },
  button: {
    marginTop: 12,
    borderRadius: 10,
    color: COLORS.PersianGreen,
    padding: 8,
  },
});
