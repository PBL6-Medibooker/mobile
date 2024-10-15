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
      <Pressable onPress={() => {navigation.navigate("DoctorInfo", {doctor_id: item.id})}} style={styles.doctorContainer}>
        <Image source={images.avatar} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.position} numberOfLines={3} ellipsizeMode="tail">
            {item.bio.position}
          </Text>
          <Text style={styles.intro} numberOfLines={3} ellipsizeMode="tail">
            {item.bio.introduction}
          </Text>
        </View>
      </Pressable>
      <TouchableOpacity onPress={() => {navigation.navigate("Booking", {doctor_id: item.id})}} style={styles.makeAppointment}>
        <AntDesign name="calendar" size={24} color={COLORS.PersianGreen} />
      </TouchableOpacity>
    </View>
  );
};

export default DoctorItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    paddingVertical: 5,
    borderColor: COLORS.silver,
  },
  doctorContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 10,
    marginEnd: 5,
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
    marginEnd: 5,
  },
});
