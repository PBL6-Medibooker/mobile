import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useState } from "react";
import { COLORS } from "../constants";
import Entypo from '@expo/vector-icons/Entypo';

const Dropdown = ({ data, onChange, placeholder, disabled }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    if (!disabled) {
      setExpanded(!expanded);
    }
  }, [expanded, disabled]);

  const [value, setValue] = useState("");
  const onSelect = useCallback(
    (item) => {
      if (!disabled) {
        onChange(item);
        setValue(item.value);
        setExpanded(false);
      }
    },
    [onChange, disabled]
  );

  return (
    <View style={{ alignItems: "flex-end" }}>
      <TouchableOpacity
        style={[
          styles.button,
          disabled && styles.disabledButton, // Add a disabled style if the dropdown is disabled
        ]}
        activeOpacity={disabled ? 1 : 0.8} // Disable opacity effect if disabled
        onPress={toggleExpanded}>
        <Text
          style={[
            { flex: 1, paddingHorizontal: 0 },
            disabled && { color: COLORS.gray }, // Change text color if disabled
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"> 
          {value || placeholder}
        </Text>
        <Entypo name={expanded ? "chevron-up" : "chevron-down"} size={18} color={COLORS.gray} />
      </TouchableOpacity>

      {expanded && !disabled ? (
        <View style={styles.options}>
          <ScrollView style={{ maxHeight: 200 }}>
            {data.map((item) => (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                key={item.value}
                activeOpacity={0.8}
                style={styles.optionItem}>
                <Text>{item.value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  button: {
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 15,
    borderColor: COLORS.silver,
  },
  options: {
    position: "absolute",
    top: 43,
    paddingHorizontal: 10,
    width: "85%",
    backgroundColor: COLORS.Light20PersianGreen,
    borderRadius: 10,
    zIndex: 1,
  },
  separator: {
    height: 10,
  },
  optionItem: {
    justifyContent: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.PersianGreen,
  },
});
