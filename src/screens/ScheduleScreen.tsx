import React, { useState } from "react";
import moment from "moment";
import { View, StyleSheet, Text ,TouchableOpacity} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Calendar, DateObject, LocaleConfig } from "react-native-calendars";
import CalendarList from "react-native-calendars/src/calendar-list/new";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(moment());
  return (
    <View style={styles.container}>
      <Calendar
        // 日付を選択したときの挙動。
        horizontal={true}
        pagingEnabled={true}
        theme={{
          calendarBackground: 'transparent',
          todayTextColor: 'red',
          textMonthFontWeight: 'bold',
          textMonthFontSize: 20,
          'stylesheet.calendar.header': {
            week:{
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            dayTextAtIndex0: {
              color: 'red'
            },
            dayTextAtIndex6: {
              color: 'blue'
            },
          },
          'stylesheet.calendar.main': {
            dayContainer: {
              borderColor: '#ffffff',
              borderWidth: 2,
              flex:1,
              alignItems: 'center',
              paddingTop: 10,
            },
            week:{
              flex:1,
              marginTop:0,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#F0E8E7'
            },
          }
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
const dayTextStyle = (date: DateObject, currentDate: moment.Moment) =>
  StyleSheet.create({
    dayText: {
      fontSize: 16,
      backgroundColor: date.dateString === moment().format('YYYY-MM-DD') ? 'transparent' : 'transparent',
      color: date.month !== currentDate.month() + 1 ? 'gray' :  moment(date.dateString).days() === 0 ? 'red' : moment(date.dateString).days() === 6 ? 'blue' : 'black',
    }
  });
// カレンダーの日本語化
LocaleConfig.locales.jp = {
  monthNames: [
    "1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",],
  monthNamesShort: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",],
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
