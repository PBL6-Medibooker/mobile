import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";
import { COLORS } from "../constants";

const UpdateUser = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Chỉnh Sửa Hồ Sơ" />

      <View style={styles.body}>
        <Text style={styles.text}>Họ và tên:</Text>
        <TextInput style={styles.textInput} />

        <Text style={styles.text}>Họ và</Text>
        <TextInput style={styles.textInput} />

        <Text style={styles.text}>Họ và tên</Text>
        <TextInput style={styles.textInput} />

        <Text style={styles.text}>Họ và tên dgydhdikd</Text>
        <TextInput style={styles.textInput} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
  field: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    fontSize: 16,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    // marginBottom: 10,
  },
});
