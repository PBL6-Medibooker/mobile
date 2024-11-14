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
import Account_API from "../API/Account_API";
import { useFocusEffect } from "@react-navigation/native";
import Speciality_API from "../API/Speciality_API";
import Region_API from "../API/Region_API";

const SpecialtyDetail = ({ specialty, navigation }) => {
  const [loading, setloading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [regionList, setRegionList] = useState([]);

  const getRegionList = async () => {
    try {
      const allRegions = await Region_API.get_Region_List();
      setRegionList(allRegions);
      const initialDoctors = await fetchDoctorList();
      setDoctorList(initialDoctors);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRegionList();
    }, [])
  );

  const fetchDoctorList = useCallback(
    async (region = null) => {
      try {
        setloading(true);
        const doctorsBySpecialty = await Account_API.get_Filter_Doctor_List(
          specialty.name,
          region?.name || null
        );
        setloading(false);
        return Array.isArray(doctorsBySpecialty) ? doctorsBySpecialty : [];
      } catch (fetchError) {
        console.error("Error fetching doctor list:", fetchError);
        return [];
      }
    },
    [specialty]
  );

  const refRBSheet = useRef();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  const handleSpecialityChange = async (region, specialty, sortBy) => {
    try {
      const filteredDoctors = await fetchDoctorList(region);
      const sortedDoctors = filteredDoctors.slice().sort((a, b) => {
        if (sortBy === "A-Z") {
          return a.username.localeCompare(b.username);
        } else if (sortBy === "Z-A") {
          return b.username.localeCompare(a.username);
        }
        return 0;
      });
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
        <Text style={styles.text}>Danh sách bác sĩ:</Text>

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
          renderItem={({ item }) => {
            const doctorToSend = {
              ...item,
              name: item.username,
            };
            return <DoctorItem item={doctorToSend} navigation={navigation} />;
          }}
        />
      ) : (
        <Text>Không tìm thấy bác sĩ nào</Text> // Thêm thông báo nếu không có dữ liệu
      )}

      <BottomSheet
        bottomSheetRef={refRBSheet}
        onSelected={handleSpecialityChange}
        regionList={regionList}
        height={330}
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
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: COLORS.PersianGreen,
    borderRadius: 8,
    marginStart: 5,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.PersianGreen,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
