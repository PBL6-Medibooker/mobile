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
import { BottomSheet, DoctorItem, HeaderBack } from "../components";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import useAccount from "../hooks/useAccount";
import { useCallback, useEffect, useRef, useState } from "react";
import useRegions from "../hooks/useRegions";

const SpecialtyDetail = ({ specialty, navigation }) => {
  const [doctorsHook, getDoctorsBySpecialty, loading, error] = useAccount();
  const [regionsHook] = useRegions();
  const [doctorList, setDoctorList] = useState([]);

  const fetchDoctorList = useCallback(
    async (region = null) => {
      try {
        // console.log("Fetching data for region:", region);
        const doctorsBySpecialty = await getDoctorsBySpecialty(
          doctorsHook,
          specialty,
          region
        );
        return Array.isArray(doctorsBySpecialty) ? doctorsBySpecialty : [];
      } catch (fetchError) {
        console.error("Error fetching doctor list:", fetchError);
        return [];
      }
    },
    [specialty, doctorsHook]
  );

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const initialDoctors = await fetchDoctorList();
        setDoctorList(initialDoctors);
      } catch (error) {
        console.error("Error loading initial doctor list:", error);
      }
    };
    loadDoctors();
  }, [fetchDoctorList]);

  const refRBSheet = useRef();

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', }}>
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

  const handleSpecialityChange = async (region, specialty, sortBy) => {
    try {
      const filteredDoctors = await fetchDoctorList(region);
      const sortedDoctors =
        sortBy === "A-Z"
          ? filteredDoctors
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
          : filteredDoctors
              .slice()
              .sort((a, b) => b.name.localeCompare(a.name));
      setDoctorList(sortedDoctors);
    } catch (sortError) {
      console.error("Error sorting doctor list:", sortError);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title={specialty.name}
        screenName="Specialty"
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

      {doctorList && Array.isArray(doctorList) && doctorList.length > 0 ? (
        <FlatList
          style={styles.list}
          data={doctorList}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <DoctorItem item={item} navigation={navigation} />
          )}
        />
      ) : (
        <Text>Không tìm thấy bác sĩ nào</Text> // Thêm thông báo nếu không có dữ liệu
      )}

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        // specialtyList={specialitiesHook}
        regionList={regionsHook}
      />
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
