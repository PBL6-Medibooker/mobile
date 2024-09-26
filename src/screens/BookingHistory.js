import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderHome } from "../components";
import { COLORS } from "../constants";

const BookingHistory = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome title="LỊCH SỬ CUỘC HẸN" navigation={navigation} />
      <View style={styles.main}>
        <Text>Lịch khám bệnh</Text>
      </View>
    </SafeAreaView>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
