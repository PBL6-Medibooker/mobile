import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { specialities } from "../utils/specialities";
import { useState } from "react";
import { HeaderBack } from "../components";

// Dữ liệu chuyên khoa
const dataSpecialities = specialities.map((s) => ({
  value: s.label,
  id: `${s.flag} ${s.id}`,
  image: s.image,
}));

// Hàm thêm các item trống nếu không chia hết cho 3
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== 0 && numberOfElementsLastRow !== numColumns) {
    data.push({ empty: true }); // Thêm item trống
    numberOfElementsLastRow++;
  }
  return data;
};

const Specialty = ({ navigation }) => {
  const [specialty, setSpecialty] = useState({});

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={formatData(dataSpecialities, 3)} // Sử dụng hàm formatData
        numColumns={3}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => {
          if (item.empty) {
            return <View style={[styles.itemSpecialty, styles.invisibleItem]} />;
          }
          return (
            <TouchableOpacity onPress={() => navigation.navigate("SpecialtyDetail", {specialty: item})} style={styles.itemSpecialty}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageSpecialty}
                />
              ) : (
                <Image source={images.logo} style={styles.imageSpecialty} />
              )}
              <Text style={styles.text}>{item.value}</Text>
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
    backgroundColor: COLORS.white,
  },
  list: {
    // borderWidth: 1,
  },
  imageSpecialty: {
    width: "50%",
    height: "50%",
  },
  itemSpecialty: {
    flex: 1,
    margin: 1,
    aspectRatio: 1, // Chiều cao bằng chiều rộng để tạo khung vuông
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 5,
    overflow: "hidden",
    padding: 2,
  },
  invisibleItem: {
    backgroundColor: "transparent", // Đảm bảo các item trống không hiển thị
    borderWidth: 0,
  },
  text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center'
  },
});
