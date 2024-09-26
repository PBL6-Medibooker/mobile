import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants";

const HeaderBack = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{height: 48, width: 48 }}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-back-outline"
          size={48}
          color={COLORS.white}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PersianGreen,
    paddingVertical: 5
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: 48,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
});
