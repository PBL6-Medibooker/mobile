import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";
import { COLORS } from "../constants";

const UpdateUser = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="Chỉnh Sửa Hồ Sơ" />

      <View style={styles.body}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} placeholder="example@axample.com" />

        <Text style={styles.text}>Họ và tên</Text>
        <TextInput style={styles.textInput} placeholder="Fullname" />

        <Text style={styles.text}>Số điện thoại</Text>
        <TextInput style={styles.textInput} placeholder="0123456789" />

        <Text style={styles.text}>Tình trạng sức khoẻ</Text>
        <TextInput
          style={[
            styles.textInput,
            {
              textAlignVertical: "top",
              height: 100,
            },
          ]}
          placeholder="Underlying Condition"
          numberOfLines={3}
          multiline
        />

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? COLORS.Light50PersianGreen
                : COLORS.PersianGreen,
            },
            styles.button,
          ]}>
          <Text style={styles.buttonText}>Chỉnh sửa</Text>
        </Pressable>
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
    marginHorizontal: 20,
    marginTop: 15,
  },
  field: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.silver,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
  },
  button: {
    marginTop: 12,
    borderRadius: 5,
    color: COLORS.PersianGreen,
    padding: 8,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
