import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "../components";
import { COLORS } from "../constants";

const VerifyBooking = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack navigation={navigation} title="XÁC THỰC THÔNG TIN" />

      <ScrollView style={styles.main}>
        <View style={styles.rowInfo}>
          <Text style={styles.text}>Họ tên:</Text>
          <Text style={styles.textInfo}>Lê Thị Huệ</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  main: {
    margin: 15,
  },
  rowInfo: {
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
  },
  textInfo: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right'
  },
});
