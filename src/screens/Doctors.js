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

import { useCallback, useEffect, useRef, useState } from "react";
import useSpecialities from "../hooks/useSpecialities";
import useAccount from "../hooks/useAccount";
import useRegions from "../hooks/useRegions";
import { useFocusEffect } from "@react-navigation/native";
import Speciality_API from "../API/Speciality_API";
import Region_API from "../API/Region_API";
import Account_API from "../API/Account_API";

const Doctors = ({ navigation }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [specialtyList, setSpecialtyList] = useState([]);
  const [regionList, setRegionList] = useState([]);

  const [loading, setloading] = useState(false);

  const getFilterDoctorList = async (specialty, region) => {
    try {
      const doctorsBySpecialty = await Account_API.get_Filter_Doctor_List(
        specialty?.name || null,
        region?.name || null
      );
      return doctorsBySpecialty;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataList = async () => {
    try {
      setloading(true);
      const doctors = await getFilterDoctorList(null, null);
      setDoctorList(doctors);
      const allRegions = await Region_API.get_Region_List();
      setRegionList(allRegions);
      const allSpecialties = await Speciality_API.get_Speciality_List();
      setSpecialtyList(allSpecialties);
      setloading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataList();
    }, [])
  );

  const refRBSheet = useRef();

  const handleSpecialityChange = async (region, specialty, sortBy) => {
    const doctors = await getFilterDoctorList(specialty, region);
    if (Array.isArray(doctors)) {
      const sortDoctors = doctors.slice().sort((a, b) => {
        if (sortBy === "A-Z") {
          return a.username.localeCompare(b.username);
        } else if (sortBy === "Z-A") {
          return b.username.localeCompare(a.username);
        }
        return 0;
      });
      setDoctorList(sortDoctors);
    } else {
      setDoctorList([]);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

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
            const doctorToSend = {
              ...item,
              name: item.username,
            };
            return <DoctorItem item={doctorToSend} navigation={navigation} />;
          }}
          ListHeaderComponent={<View style={{ height: 10 }} />}
        />
      ) : (
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      )}

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        specialtyList={specialtyList}
        regionList={regionList}
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
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    marginVertical: 1,
    height: 35
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
