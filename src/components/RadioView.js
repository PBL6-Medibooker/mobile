import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";

const RadioView = ({ options, selectedOption, onSelect }) => {
  // console.log(options);

  return (
    <View style={styles.radioContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioButton,
            selectedOption === option.label && styles.selectedButton,
          ]}
          onPress={() => onSelect(option.label)}>
          <Text
            style={[
              styles.text,
              selectedOption === option.label && styles.selectedText,
            ]}
            >
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
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 5
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedButton: {
    backgroundColor: COLORS.PersianGreen,
    borderColor: COLORS.silver,
    borderRadius: 5,
    flex: 1
  },
  text: {
    flex: 1,
    color: COLORS.black,
    padding: 3, 
    textAlign: 'center'
  },
  selectedText: {
    flex: 1,
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: 'center'
  },
});
