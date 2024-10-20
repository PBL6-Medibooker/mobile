import { Pressable, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../constants";
import Dropdown from "./Dropdown";
import { useState } from "react";

const BottomSheet = ({ bottomSheetRef, specialtyList, onSelected }) => {
  const [specialty, setSpecialty] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const handleSortSelection = (type) => {
    setSortBy(type);
  };

  const handleOkPress = () => {
    if (onSelected) {
      onSelected(specialty, sortBy); // Truyền chuyên khoa và sortBy về component cha
    }
    bottomSheetRef.current.close(); // Đóng BottomSheet
  };

  const handleResetPress = () => {
    setSpecialty(null);
    setSortBy(null);
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      height={290}
      openDuration={true}
      closeOnPressBack={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        draggableIcon: {
          backgroundColor: COLORS.gray,
          width: 100,
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <View style={{ margin: 20 }}>
        <Text
          style={{
            marginBottom: 5,
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}>
          Filter
        </Text>

        {specialtyList ? (
          <>
            <Text style={{ marginBottom: 5 }}>Chuyên khoa: </Text>
            <Dropdown
              data={specialtyList}
              onChange={setSpecialty}
              placeholder="Chọn chuyên khoa"
              value={specialty}
            />
          </>
        ) : null}

        <Text style={{ marginTop: 10, marginBottom: 5 }}>Sắp xếp theo: </Text>
        <View style={{}}>
          <Pressable onPress={() => handleSortSelection("A-Z")}>
            <Text
              style={{
                padding: 5,
                backgroundColor:
                  sortBy === "A-Z" ? COLORS.Light20PersianGreen : "transparent",
              }}>
              Theo thứ tự A {String.fromCharCode(8594)} Z
            </Text>
          </Pressable>
          <View
            style={{
              height: 2,
              backgroundColor: COLORS.silver,
              borderRadius: 999,
              marginVertical: 3,
            }}
          />

          <Pressable onPress={() => handleSortSelection("Z-A")}>
            <Text
              style={{
                padding: 5,
                backgroundColor:
                  sortBy === "Z-A" ? COLORS.Light20PersianGreen : "transparent",
              }}>
              Theo thứ tự Z {String.fromCharCode(8594)} A
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 10,
            }}>
            <Pressable
              onPress={handleResetPress}
              style={{
                backgroundColor: COLORS.PersianGreen,
                borderRadius: 5,
                flex: 1,
              }}>
              <Text
                style={{
                  padding: 5,
                  color: COLORS.white,
                  textAlign: "center",
                }}>
                Đặt lại
              </Text>
            </Pressable>
            <View style={{ width: 10 }} />
            <Pressable
              onPress={handleOkPress}
              style={{
                backgroundColor: COLORS.PersianGreen,
                borderRadius: 5,
                flex: 1,
              }}>
              <Text
                style={{
                  padding: 5,
                  color: COLORS.white,
                  textAlign: "center",
                }}>
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
