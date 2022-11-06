import React, { useState } from "react";
import dayjs from "dayjs";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const CalendarFrame: React.FC<Props> = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  return (
    <View style={styles.container}>
      <Calendar
        // 日付を選択したときの挙動。
        theme={{
          arrowColor: "#A53010",
          todayTextColor: "transparent",
          textMonthFontWeight: "bold",
          textMonthFontSize: 20,
          "stylesheet.calendar.header": {
            week: {
              flexDirection: "row",
              justifyContent: "space-around",
            },
            dayTextAtIndex0: {
              color: "red",
            },
            dayTextAtIndex6: {
              color: "blue",
            },
            dayNames: {
              width: "13%",
            },
          },
          "stylesheet.calendar.main": {
            dayContainer: {
              borderColor: "#ffffff",
              backgroundColor: "#F0E8E7",
              borderWidth: 2,
              flex: 1,
              alignItems: "center",
              paddingTop: 10,
              margingTop: 0,
            },
          },
        }}
        monthFormat={"yyyy年 M月"}
        current={currentDate.format("YYYY-MM-DD")}
        onPressArrowLeft={(subtractMonth) => {
          subtractMonth();
          setCurrentDate(currentDate.add(-1, "month"));
        }}
        onPressArrowRight={(addMonth) => {
          addMonth();
          setCurrentDate(currentDate.add(1, "month"));
        }}
        dayComponent={({ date }) => {
          return (
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text style={dayTextStyle(date, currentDate).dayText}> {date.day}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const dayTextStyle = (date: DateObject, currentDate: DateObject) =>
  StyleSheet.create({
    dayText: {
      fontSize: 16,
      backgroundColor: "transparent",
      color:
        date.month !== currentDate.month() + 1
          ? "gray"
          : dayjs(date.dateString).day() === 0
          ? "red"
          : dayjs(date.dateString).day() === 6
          ? "blue"
          : "black",
    },
  });
// カレンダーの日本語化
LocaleConfig.locales.jp = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    height: 40,
  },
});
