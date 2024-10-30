import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { useEffect, useState } from "react";
import { HeaderBack } from "../components";
import useSpecialities from "../hooks/useSpecialities";

// Hàm thêm các item trống nếu không chia hết cho numColumns
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== 0 && numberOfElementsLastRow !== numColumns) {
    data.push({ empty: true }); // Thêm item trống
    numberOfElementsLastRow++;
  }
  return data;
};

const Specialty = ({ navigation }) => {
  const [specialties, setSpecialties] = useState({});
  const [specialitiesHook, , loading] = useSpecialities(); // Loading từ hook

  // Xử lý hiển thị nếu đang tải
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PersianGreen} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={formatData(specialitiesHook, 2)} // Sử dụng hàm formatData
        numColumns={2}
        keyExtractor={(item) => item._id?.toString()}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={[styles.itemSpecialty, styles.invisibleItem]} />;
          }
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("BottomTabNavigation", { specialty: item })}
              style={styles.itemSpecialty}>
              {item.speciality_image ? (
                <Image
                  source={{ uri: `data:image/png;base64,${item.speciality_image}` }}
                  style={styles.imageSpecialty}
                  resizeMode="cover"
                />
              ) : (
                <Image source={images.logo} style={styles.imageSpecialty} resizeMode="contain" />
              )}
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={() => (
          <HeaderBack navigation={navigation} title="Chuyên khoa" />
        )}
      />
    </SafeAreaView>
  );
};

export default Specialty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    // paddingHorizontal: 10,
  },
  imageSpecialty: {
    width: "50%",
    height: "50%",
  },
  itemSpecialty: {
    flex: 1,
    margin: 2,
    aspectRatio: 1, // Chiều cao bằng chiều rộng để tạo khung vuông
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.silver,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  invisibleItem: {
    backgroundColor: "transparent", // Đảm bảo các item trống không hiển thị
    borderWidth: 0,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: COLORS.black,
  },
});
