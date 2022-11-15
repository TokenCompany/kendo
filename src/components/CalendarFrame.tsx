import React, { useState } from "react";
import dayjs from "dayjs";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";

type Props = {
  onPressDay: (day: string) => void;
};

export const CalendarFrame: React.FC<Props> = ({ onPressDay }: Props) => {
  const [currentDate, setCurrentDate] = useState<string>(dayjs());
  const [show, setShow] = useState(false);
  const onChangeDate = (Date) => {
    setCurrentDate(Date);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };
  const onPressArrowLeft = () => {
    setCurrentDate(currentDate.add(-1, "month"));
  };
  const onPressArrowRight = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  class CalendarHeader extends React.PureComponent {
    render() {
      return (
        <View>
          <View style={styles.dayInput}>
            <TouchableOpacity onPress={onPressArrowLeft}>
              <Text>＜</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
              <Text style={styles.buttonText}>{currentDate.format("YYYY-MM-DD")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressArrowRight}>
              <Text>＞</Text>
            </TouchableOpacity>
          </View>
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
                value={dayjs(currentDate.toString(), "YYYYMMDD").toDate()}
                mode="date"
                display={"spinner"}
                onChange={(event, date) => {
                  if (date) {
                    const Date = Number(dayjs(date).format("YYYYMMDD"));
                    onChangeDate(Date);
                  }
                }}
              />
              <TouchableOpacity style={styles.modalButton} onPress={hideDatePicker}>
                <Text style={styles.textStyle}>×</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Calendar
        // customHeader={CalendarHeader}
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
            <TouchableOpacity
              onPress={() => {
                // console.log(date.dateString);
                if (date) {
                  onPressDay(date.dateString);
                }
              }}
              style={styles.button}
            >
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
  dayInput: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
    height: 25,
    borderColor: "#aaa",
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
  dateButton: {
    height: 40,
    backgroundColor: "#a53010",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
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
});
