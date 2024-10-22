import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";

const DoctorItem = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.doctorContainer}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => {
            navigation.navigate("DoctorInfo", { doctor_id: item.id });
          }}>
          <Image source={images.avatar} style={styles.image} />
        </Pressable>
        <View style={styles.infoContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("DoctorInfo", { doctor_id: item.id });
            }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              style={styles.position}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.bio.position}
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Booking", { doctor_id: item.id });
            }}
            style={styles.makeAppointment}>
            <AntDesign name="calendar" size={24} color={COLORS.PersianGreen} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <TouchableOpacity onPress={() => {navigation.navigate("Booking", {doctor_id: item.id})}} style={styles.makeAppointment}>
        <AntDesign name="calendar" size={24} color={COLORS.PersianGreen} />
      </TouchableOpacity> */}
    </View>
  );
};

export default DoctorItem;

const styles = StyleSheet.create({
  container: {
    // borderBottomWidth: 2,
    // paddingVertical: 5,
    // borderColor: COLORS.silver,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  doctorContainer: {
    flex: 1,
    flexDirection: "row",
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginEnd: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 15,
    marginEnd: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  position: {
    fontSize: 13,
    textAlign: "justify",
    color: COLORS.PersianGreen,
  },
  intro: {
    fontSize: 13,
    textAlign: "justify",
  },
  infoContainer: {
    flex: 1,
  },
  makeAppointment: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    // marginEnd: 5,
  },
});
