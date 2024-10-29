import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";

const RadioView = ({
  options,
  selectedOption,
  onSelect,
  textColor,
  setMessage,
}) => {
  return (
    <View style={styles.radioContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioButton,
            selectedOption &&
              selectedOption.value === option.value &&
              styles.selectedButton,
            index === 0 && styles.firstButton, // Bo góc cho item đầu
            index === options.length - 1 && styles.lastButton, // Bo góc cho item cuối
          ]}
          onPress={() => {
            onSelect(option);
            if (setMessage) setMessage(null);
          }}>
          <Text
            style={[
              styles.text,
              { color: textColor },
              selectedOption &&
                selectedOption.value === option.value &&
                styles.selectedText,
            ]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioView;

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderColor: COLORS.silver,
    // Không cần borderRadius ở đây
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedButton: {
    backgroundColor: COLORS.PersianGreen,
    borderColor: COLORS.silver,
  },
  firstButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderStartWidth: 1,
  },
  lastButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderEndWidth: 1,
  },
  text: {
    flex: 1,
    // color: COLORS.black,
    padding: 3,
    textAlign: "center",
  },
  selectedText: {
    flex: 1,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
