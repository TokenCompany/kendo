import React, { useState } from "react";
import dayjs from "dayjs";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Platform } from "react-native";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
type Props = {
  onPressDay: (day: string) => void;
};

export const CalendarFrame: React.FC<Props> = ({ onPressDay }: Props) => {
  const reservations = useSelector((state: RootState) => state.reservation);
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
  const [show, setShow] = useState(false);
  const showDatepicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const [showPickerAndroid, setShowPickerAndroid] = useState<boolean>();
  const onPressShowPickerAndroid = () => {
    setShowPickerAndroid(true)
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <View style={styles.dayInput}>
          <TouchableOpacity style={styles.dateButton} onPress={onPressShowPickerAndroid}>
            <Text style={styles.buttonText}>{currentDate.format("YYYY-MM")}</Text>
          </TouchableOpacity>
        </View>
      )}
      {Platform.OS === "ios" && (
        <View style={styles.dayInput}>
          <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
            <Text style={styles.buttonText}>{currentDate.format("YYYY-MM")}</Text>
          </TouchableOpacity>
        </View>
      )}
        {Platform.OS === "android" && (
          <View>
            {showPickerAndroid && (
            <DateTimePicker
              value={dayjs(currentDate.toString(), "YYYY-MM").toDate()}
              mode="date"
              display={"spinner"}
              onChange={(event, date) => {
                setShowPickerAndroid(false)
                console.log(date);

                setCurrentDate(dayjs(date));
              }}
            />
            )}
          </View>
        )}
        {Platform.OS === "ios" && (
          <Modal
            animationType="fade"
            visible={show}
            transparent={true}
            onRequestClose={() => {
              setShow(false);
            }}
          >
            <View style={styles.modalView}>
              <DateTimePicker
                value={dayjs(currentDate.toString(), "YYYY-MM").toDate()}
                mode="date"
                display={"spinner"}
                onChange={(event, date) => {
                  console.log(date);

                  if (date) {
                    setCurrentDate(dayjs(date));
                  }
                }}
              />
              <TouchableOpacity style={styles.modalButton} onPress={hideDatePicker}>
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
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
        monthFormat={"yyyy年 MM月"}
        current={currentDate.format("YYYY-MM")}
        key={currentDate.format("YYYY-MM")}
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
            <TouchableOpacity
              onPress={() => {
                if (date) {
                  onPressDay(date.dateString);
                }
              }}
              style={date.dateString in reservations ? styles.buttonSelected : styles.button}
            >
              <Text style={dayTextStyle(date, currentDate).dayText}> {date.day}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const JapaneseHolidays = require('japanese-holidays');
const dayTextStyle = (date: DateObject, currentDate: DateObject) =>

  StyleSheet.create({
    dayText: {
      fontSize: 16,
      backgroundColor: "transparent",
      color:
        date.month !== currentDate.month() + 1
          ? "gray" : dayjs(date.dateString).day() === 0
          ? "red" : JapaneseHolidays.isHoliday(new Date(dayjs(date.dateString).format("YYYY/MM/DD")))
          ? "red" : dayjs(date.dateString).day() === 6
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
    position:"relative",
    margin: 10,
  },
  dateButton:{
    paddingHorizontal:30,
    height:40,
  },
  buttonSelected: {
    height: 34,
    width: 34,
    marginBottom: 6,
    padding: 5,
    paddingLeft: 4,
    backgroundColor: "#fff",
  },
  button: {
    marginBottom: 6,
    height: 34,
    width: 34,
    padding: 5,
    paddingLeft: 4,
  },
  dayInput: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    borderColor: "#000",
    color: "#000",
    fontSize: 20,
    position:"absolute",
    zIndex:2,
    left:"30%",
    top:"2%",
  },
  buttonText: {
    fontSize: 20,
    color: "transparent",
  },
  modalView: {
    position: "relative",
    top: "40%",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  modalButton: {
    borderRadius: 5,
    padding: 7,
    width: 50,
    elevation: 2,
    position: "absolute",
    top: 15,
    right: 15,
  },
  textStyle: {
    fontSize: 26,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  dayText: {
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingLeft: 5,
    paddingRight: 120,
    marginLeft: 10,
    height: 40,
  },
  arrowButton:{
    fontSize:18,
    fontWeight:"bold",
    color:"red",
  },
});
