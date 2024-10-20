import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants";

const HeaderBack = ({ navigation, title, screenName, backgroundColor }) => {
  return (
    <View
      style={[
        styles.container,
        !backgroundColor && { backgroundColor: COLORS.PersianGreen },
      ]}>
      <TouchableOpacity style={{ marginLeft: 5, height: 48, width: 48 }}>
        <Ionicons
          onPress={() => {
            if (!screenName) navigation.goBack();
            else navigation.navigate(screenName);
          }}
          name="arrow-back-outline"
          size={48}
          color={!backgroundColor ? COLORS.white : COLORS.PersianGreen}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          { color: !backgroundColor ? COLORS.white : COLORS.PersianGreen },
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: COLORS.PersianGreen,
    paddingVertical: 5,
  },
  title: {
    flex: 1,
    textAlign: "center",
    marginRight: 53,
    // color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
