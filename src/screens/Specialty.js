import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images } from "../constants";
import { areas } from "../utils/areas";
import { useState } from "react";
import { Dropdown, HeaderBack, RadioView } from "../components";
import { specialities } from "../utils/specialities";
import { doctors } from "../utils/doctors";

const dataSpecialities = specialities.map((s) => ({
  value: s.label,
  id: `${s.flag} ${s.id}`, // Sử dụng dấu nháy ngược
  image: s.image,
}));

const Specialty = ({ navigation }) => {
  const [specialty, setSpecialty] = useState({});

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={dataSpecialities}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemSpecialty}>
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={styles.imageSpecialty}
              />
            ) : (
              <Image source={images.logo} style={styles.imageSpecialty} />
            )}
            <Text>{item.value}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <HeaderBack navigation={navigation} title="Chuyên khoa"></HeaderBack>
        )}
      />
      <Text>Specialty</Text>
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
    borderWidth: 1,
  },
  imageSpecialty: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: 120,
  },
  itemSpecialty: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: 5
  },
});
