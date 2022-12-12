import React, { useState } from "react";
import dayjs from "dayjs";
import { View, StyleSheet, Text, TouchableOpacity, Modal, Platform } from "react-native";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../lang/localization";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";
type Props = {
  onPressDay: (day: string) => void;
  onChangeDay: (day: string) => void;
};

export const CalendarFrame: React.FC<Props> = ({ onPressDay, onChangeDay}: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;
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
            <Text style={styles.buttonText}>{currentDate.format("YYYY-MM-DD")}</Text>
          </TouchableOpacity>
        </View>
      )}
      {Platform.OS === "ios" && (
        <View style={styles.dayInput}>
          <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
            <Text style={styles.buttonText}>{currentDate.format("YYYY-MM-DD")}</Text>
          </TouchableOpacity>
        </View>
      )}
        {Platform.OS === "android" && (
          <View>
            {showPickerAndroid && (
            <DateTimePicker
              locale={i18n.t("Lang.lang")}
              value={dayjs(currentDate.toString(), "YYYY-MM-DD").toDate()}
              mode="date"
              display={"default"}
              onChange={(event, date) => {
                setShowPickerAndroid(false)
                setCurrentDate(dayjs(date));
                onChangeDay(dayjs(date).format("YYYY-MM-DD").toString())
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
                locale={i18n.t("Lang.lang")}
                value={dayjs(currentDate.toString(), "YYYY-MM-DD").toDate()}
                mode="date"
                display={"spinner"}
                onChange={(event, date) => {
                  if (date) {
                    setCurrentDate(dayjs(date));
                    onChangeDay(dayjs(date).format("YYYY-MM-DD").toString())
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
              marginTop: 0,
            },
          },
        }}
        monthFormat={`yyyy${i18n.t("ScheduleScreen.year")}MM${i18n.t("ScheduleScreen.monthBlank")}`}
        current={currentDate.format("YYYY-MM-DD")}
        key={currentDate.format("YYYY-MM-DD")}
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
              style={date!.dateString in reservations ? styles.buttonSelected : styles.button}
            >
              <Text style={dayTextStyle(date, currentDate.toDate()).dayText}> {date!.day}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const JapaneseHolidays = require('japanese-holidays');
const dayTextStyle = (date: any, currentDate: Date) =>

  StyleSheet.create({
    dayText: {
      fontSize: 16,
      backgroundColor: "transparent",
      color:
        date.month !== dayjs(currentDate).month() + 1
          ? "gray" : dayjs(date.dateString).day() === 0
          ? "red" : JapaneseHolidays.isHoliday(new Date(dayjs(date.dateString).format("YYYY/MM/DD")))
          ? "red" : dayjs(date.dateString).day() === 6
          ? "blue"
          : "black",
    },
  });

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
    backgroundColor:"#fff",
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
    top: "30%",
    backgroundColor: "gray",
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
