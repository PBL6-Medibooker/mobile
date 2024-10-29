import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { DoctorItem, HeaderBack } from "../components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useAccount from "../hooks/useAccount";
import { useEffect, useState } from "react";

const SpecialtyDetail = ({ specialty, navigation }) => {
  const [doctorsHook, getDoctorsBySpecialty, loading, error] =
    useAccount();
  const [doctorList, setDoctorList] = useState(null);

  const doctorsBySpecialty = getDoctorsBySpecialty(doctorsHook, specialty, null);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title={specialty.name}
        screenName="Specialty"
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchButton}>
          <TextInput style={styles.textInput} placeholder="Search" />
          <TouchableOpacity style={styles.btnSearch}>
            <FontAwesome name="search" size={20} color={COLORS.PersianGreen} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={doctorsBySpecialty}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => {
          return <DoctorItem item={item} navigation={navigation} />;
        }}
      />

      {/* <DoctorItem item={item} /> */}
      {/* <Text>specialty detail: {specialty.id}</Text> */}
    </SafeAreaView>
  );
};

export default SpecialtyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  list: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchContainer: {
    backgroundColor: COLORS.PersianGreen,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 999,
  },
  textInput: {
    marginStart: 10,
    flex: 1,
  },
  btnSearch: {
    marginHorizontal: 5,
  },
});
