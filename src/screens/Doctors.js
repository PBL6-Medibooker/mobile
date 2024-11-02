import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants";
import { BottomSheet, DoctorItem, Dropdown, HeaderBack } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useEffect, useRef, useState } from "react";
import useSpecialities from "../hooks/useSpecialities";
import useAccount from "../hooks/useAccount";
import useRegions from "../hooks/useRegions";

const Doctors = ({ navigation }) => {
  const [specialty, setSpecialty] = useState(null);
  const [region, setRegion] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [doctorList, setDoctorList] = useState([]);

  const [specialitiesHook] = useSpecialities();
  const [regionsHook] = useRegions();
  const [doctorsHook, getDoctorsBySpecialtyAndRegion] = useAccount();

  useEffect(() => {
    setDoctorList(doctorsHook);
  }, [doctorsHook]);

  const refRBSheet = useRef();

  const handleSpecialityChange = (region, specialty, sortBy) => {
    const doctors = getDoctorsBySpecialtyAndRegion(
      doctorsHook,
      specialty,
      region
    );
    if (Array.isArray(doctors)) {
      const sortDoctors = doctors.slice().sort((a, b) => {
        if (sortBy === "A-Z") {
          return a.name.localeCompare(b.name);
        } else if (sortBy === "Z-A") {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });
      setDoctorList(sortDoctors);
    } else {
      setDoctorList([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="Bác sĩ"
        // backgroundColor={true}
      />
      <View style={styles.searchContainer}>
        <View style={styles.searchButton}>
          <FontAwesome
            name="search"
            size={16}
            color={COLORS.silver}
            style={styles.btnSearch}
          />
          <TextInput style={styles.textInput} placeholder="Search" />
        </View>

        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => refRBSheet.current.open()}>
          <FontAwesome
            name="filter"
            size={20}
            color={COLORS.white} // Thay đổi màu sắc nếu cần
          />
        </TouchableOpacity>
      </View>

      {doctorList && doctorList.length > 0 ? (
        <FlatList
          style={styles.list}
          data={doctorList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => {
            return <DoctorItem item={item} navigation={navigation} />;
          }}
          ListHeaderComponent={<View style={{ height: 10 }} />}
        />
      ) : (
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      )}

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        specialtyList={specialitiesHook}
        regionList={regionsHook}
        height={390}
      />
    </SafeAreaView>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 12,
    // marginTop: 8,
  },
  searchContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.PersianGreen,
    paddingBottom: 25,
    borderBottomStartRadius: 18,
    borderBottomEndRadius: 18,
  },
  searchButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderColor: COLORS.silver,
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
  },
  btnSearch: {
    marginHorizontal: 8,
  },
  btnFilter: {
    backgroundColor: COLORS.Light50PersianGreen,
    borderRadius: 8,
    marginStart: 5,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
