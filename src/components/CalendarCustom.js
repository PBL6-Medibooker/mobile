import { StyleSheet, Text, View } from "react-native";
import { LocaleConfig, Calendar } from "react-native-calendars";
import { COLORS } from "../constants";
import RadioView from "./RadioView";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAuth } from "../AuthProvider";
import { parse } from "date-fns";

const darkTheme = {
  calendarBackground: COLORS.black,
  dayTextColor: COLORS.white,
  todayTextColor: COLORS.PersianGreen,
  selectedDayBackgroundColor: COLORS.PersianGreen,
  selectedDayTextColor: COLORS.black,
  arrowColor: COLORS.PersianGreen,
  monthTextColor: COLORS.white,
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
  setMessage,
  theme,
  schedule,
  selectedDay,
  setSelectedDay,
  navigation,
}) => {
  const [markedDates, setMarkedDates] = useState({});

  const { isLoggedIn } = useAuth();

  const getMarkedDatesForMonth = () => {
    let marked = {};
    const currentDate = moment();
    const endOfMonth = moment().add(1, "month");

    while (currentDate.isBefore(endOfMonth)) {
      const currentDayOfWeek = currentDate.format("dddd");

      schedule.forEach((appointment) => {
        if (appointment.day === currentDayOfWeek) {
          marked[currentDate.format("YYYY-MM-DD")] = {
            marked: true,
            dotColor: COLORS.PersianGreen,
          };
        }
      });

      currentDate.add(1, "day");
    }

    setMarkedDates(marked);
  };

  useEffect(() => {
    getMarkedDatesForMonth();
  }, []);

  const checkHour = (item) => {
    const now = new Date();
    const datePart = selectedDay.date;

    const [year, month, day] = datePart.split("-").map(Number);

    if (
      day === now.getDate() &&
      month === now.getMonth() + 1 &&
      year === now.getFullYear()
    ) {
      const [hour, minute] = item.start_time.split(":").map(Number);

      if (now.getHours() > hour) return false;
      else if (now.getHours() === hour) {
        if (now.getMinutes() > minute) return false;
      }
    }

    return true;
  };

  const activeHours = () => {
    const hours = schedule
      .filter(
        (item) =>
          item.hour_type === "appointment" &&
          item.day === selectedDay.dayOfWeek &&
          checkHour(item)
      )
      .map((item) => ({
        value: item._id,
        label: `${item.start_time} - ${item.end_time}`,
        start_time: item.start_time,
        end_time: item.end_time,
      }));
    return hours;
  };

  return (
    <View style={{}}>
      <Calendar
        theme={theme === "light" ? lightTheme : darkTheme}
        style={{ borderRadius: 10 }}
        onDayPress={(date) => {
          if (markedDates[date.dateString]?.marked) {
            const dayOfWeek = new Date(date.dateString).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
              }
            );
            setSelectedDay({
              ...selectedDay,
              dayOfWeek: dayOfWeek,
              date: date.dateString,
            });
            if (setMessage) setMessage(null);
          } else {
            setMessage("* Không có lịch khám bệnh cho ngày này");
          }
        }}
        markedDates={{
          ...markedDates,
          [selectedDay.date]: selectedDay.date
            ? {
                selected: true,
                marked: true,
              }
            : null,
        }}
      />
      <View
        style={[
          { marginBottom: 5 },
          theme !== "light" && { marginHorizontal: 14 },
        ]}>
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
        <View  style={{}}>
        {selectedDay.date !== null ? (
          <RadioView
            options={activeHours()} // Gọi hàm activeHours
            selectedOption={selectedDay.time}
            onSelect={(val) => {
              if (isLoggedIn) {
                setSelectedDay({ ...selectedDay, time: val });
              } else navigation.navigate("Login");
            }}
            textColor={theme === "light" ? COLORS.black : COLORS.white}
            setMessage={setMessage}
          />
        ) : (
          <Text style={styles.textMessage}>Vui lòng chọn ngày trước</Text>
        )}
        </View>
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
