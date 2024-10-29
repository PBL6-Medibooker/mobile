import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, images } from "../constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect } from "react";

const DoctorItem = ({ item, navigation }) => {
  // useEffect(() => console.log(item));
  return (
      <View style={styles.doctorContainer} key={item._id}>
        <Pressable
          style={styles.imageContainer}
          onPress={() => {
            navigation.navigate("DoctorInfo", { doctorSelected: item });
          }}>
          <Image
            source={
              item.profile_image ? { uri: item.profile_image } : images.avatar
            }
            style={styles.image}
          />
        </Pressable>
        <View style={styles.infoContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("DoctorInfo", { doctorSelected: item });
            }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              style={styles.position}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.bio}
            </Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Booking", { doctorSelected: item });
            }}
            style={styles.makeAppointment}>
            <AntDesign name="calendar" size={24} color={COLORS.PersianGreen} />
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default DoctorItem;

const styles = StyleSheet.create({
  doctorContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
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
    height: 40,
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
