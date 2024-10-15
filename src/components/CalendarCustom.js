import { StyleSheet, Text, View } from "react-native";
import { LocaleConfig, Calendar } from "react-native-calendars";
import { COLORS } from "../constants";
import RadioView from "./RadioView";
import { useState } from "react";

LocaleConfig.locales["vn"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Th1",
    "Th2",
    "Th3",
    "Th4",
    "Th5",
    "Th6",
    "Th7",
    "Th8",
    "Th9",
    "Th10",
    "Th11",
    "Th12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};
// Set the default locale to Vietnamese
LocaleConfig.defaultLocale = "vn";

const darkTheme = {
  calendarBackground: COLORS.black, // Màu nền cho lịch
  // textSectionTitleColor: COLORS.gray, // Màu văn bản tiêu đề (ngày trong tuần)
  dayTextColor: COLORS.white, // Màu văn bản cho ngày
  todayTextColor: COLORS.PersianGreen, // Màu văn bản cho ngày hiện tại
  selectedDayBackgroundColor: COLORS.PersianGreen, // Màu nền cho ngày được chọn
  selectedDayTextColor: COLORS.black, // Màu văn bản cho ngày được chọn
  arrowColor: COLORS.PersianGreen, // Màu mũi tên điều hướng tháng
  monthTextColor: COLORS.white, // Màu văn bản tháng
  // textDisabledColor: "#d9e1e8",
  // dotColor: COLORS.PersianGreen,
  selectedDotColor: COLORS.black,
};

const lightTheme = {
  calendarBackground: COLORS.Light20PersianGreen,
  dayTextColor: COLORS.black,
  todayTextColor: COLORS.PersianGreen,
  selectedDayBackgroundColor: COLORS.PersianGreen,
  selectedDayTextColor: COLORS.white,
  arrowColor: COLORS.PersianGreen,
  monthTextColor: COLORS.black,
  selectedDotColor: COLORS.white,
};

const CalendarCustom = ({
  selectedDate,
  setSelectedDate,
  selectedHour,
  setSelectedHour,
  setMessage,
  theme,
}) => {
  const doctorDates = {
    "2024-10-09": { marked: true, dotColor: COLORS.PersianGreen },
    "2024-10-10": { marked: true, dotColor: COLORS.PersianGreen },
    "2024-10-16": { marked: true, dotColor: COLORS.PersianGreen },
    "2024-10-17": { marked: true, dotColor: COLORS.PersianGreen },
    "2024-10-23": { marked: true, dotColor: COLORS.PersianGreen },
    "2024-11-07": { marked: true, dotColor: COLORS.PersianGreen },
  };

  const hourOptions = [
    { label: "Buổi Sáng", value: "morning" },
    { label: "Buổi Chiều", value: "afternoon" },
    { label: "Buổi Tối", value: "evening" },
  ];
  return (
    <View>
      <Calendar
        theme={theme === "light" ? lightTheme : darkTheme}
        style={{borderRadius: 10}}
        onDayPress={(date) => {
          if (doctorDates[date.dateString]?.marked) {
            setSelectedDate(date.dateString);
            if (setMessage) setMessage(null);
          }
        }}
        markedDates={{
          ...doctorDates,
          [selectedDate]: selectedDate
            ? {
                selected: true,
                marked: true,
              }
            : null,
        }}
      />
      <View style={[{ marginBottom: 5 }, theme !== "light" && {marginHorizontal: 14}]}>
        <View style={styles.noteContainer}>
          <View style={[styles.circle, { backgroundColor: COLORS.gray }]} />
          <Text
            style={[styles.text, theme === "light" && { color: COLORS.black }]}>
            Ngày bác sĩ có lịch làm việc
          </Text>
        </View>
        <View style={styles.noteContainer}>
          <View
            style={[styles.circle, { backgroundColor: COLORS.PersianGreen }]}
          />
          <Text
            style={[styles.text, theme === "light" && { color: COLORS.black }]}>
            Ngày bác sĩ có lịch khám
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            { marginBottom: 5 },
            theme === "light" && { color: COLORS.black },
          ]}>
          Chọn khung giờ khám
        </Text>
        {selectedDate !== null ? (
          <RadioView
            options={hourOptions}
            selectedOption={selectedHour}
            onSelect={setSelectedHour}
            textColor={theme === "light" ? COLORS.black : COLORS.white}
            setMessage={setMessage}
          />
        ) : (
          <Text style={styles.textMessage}>Vui lòng chọn ngày trước</Text>
        )}
      </View>
    </View>
  );
};

export default CalendarCustom;

const styles = StyleSheet.create({
  circle: {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginEnd: 6,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  text: {
    color: COLORS.white,
    fontSize: 12,
  },
  textMessage: {
    color: COLORS.black,
    fontSize: 12,
    backgroundColor: COLORS.Light20PersianGreen,
    padding: 6,
    borderRadius: 10,
  },
});
