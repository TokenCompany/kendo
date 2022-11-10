import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { Picker } from "@react-native-community/picker";
import { TextButton } from "../components/TextButton";
import { bookReservationItem, deleteReservationItem } from "../store/reservationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
// import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state: RootState) => state.reservation);
  // console.log(reservations);

  // 日付の取得と表示
  const [selectedDateText, setSelectedDateText] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [startTime, onChangeStartTime] = useState<string>();
  const [endTime, onChangeEndTime] = useState<string>();
  const [place, setPlace] = useState<string>();

  return (
    <ScrollView style={styles.container}>
      <CalendarFrame
        onPressDay={(day) => {
          // 文字列型日付を日本語に変換
          let dateTextArray = day.split("-");
          let dateText =
            dateTextArray[0] + "年" + dateTextArray[1] + "月" + dateTextArray[2] + "日";
          // 文字の変更
          setSelectedDate(day);
          setSelectedDateText(dateText);
          // 選択された日付が既に存在する場合
          if (day in reservations) {
            onChangeStartTime(reservations[day].startTime);
            onChangeEndTime(reservations[day].endTime);
            setPlace(reservations[day].place);
          }
        }}
      />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>{selectedDateText}</Text>
        <View style={styles.boxInputArea}>
          <Text>◆時間</Text>
          <View style={styles.boxInputTime}>
            <View style={styles.boxInputTimeFlex}>
              <Picker
                selectedValue={startTime}
                style={styles.inputTime}
                onValueChange={(itemValue, itemIndex) => onChangeStartTime(itemValue)}
                itemStyle={{ height: 60 }}
              >
                <Picker.Item label="10:00" value="10:00" />
                <Picker.Item label="11:00" value="11:00" />
                <Picker.Item label="12:00" value="12:00" />
                <Picker.Item label="13:00" value="13:00" />
                <Picker.Item label="14:00" value="14:00" />
                <Picker.Item label="15:00" value="15:00" />
                <Picker.Item label="19:00" value="19:00" />
                <Picker.Item label="21:00" value="21:00" />
              </Picker>
              <Text style={styles.timeText}>~</Text>
              <Picker
                selectedValue={endTime}
                style={styles.inputTime}
                onValueChange={(itemValue, itemIndex) => onChangeEndTime(itemValue)}
                itemStyle={{ height: 60 }}
              >
                <Picker.Item label="10:00" value="10:00" />
                <Picker.Item label="11:00" value="11:00" />
                <Picker.Item label="12:00" value="12:00" />
                <Picker.Item label="13:00" value="13:00" />
                <Picker.Item label="14:00" value="14:00" />
                <Picker.Item label="15:00" value="15:00" />
                <Picker.Item label="16:00" value="16:00" />
                <Picker.Item label="21:00" value="21:00" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.boxInputArea}>
          <Text>◆場所</Text>
          <View style={styles.boxInputText}>
            <Picker
              selectedValue={place}
              style={styles.Picker}
              onValueChange={(itemValue, itemIndex) => setPlace(itemValue)}
              itemStyle={{ height: 60 }}
            >
              <Picker.Item label="text01" value="text01" />
              <Picker.Item label="text02" value="text02" />
              <Picker.Item label="横浜アリーナ" value="横浜アリーナ" />
            </Picker>
          </View>
        </View>
        <TextButton
          text01="登録"
          onPress01={() => {
            if (selectedDate && startTime && endTime && place) {
              dispatch(
                bookReservationItem({
                  date: selectedDate,
                  startTime: startTime,
                  endTime: endTime,
                  place: place,
                }),
              );
            }
          }}
          onPress02={() => {
            if (selectedDate) {
              dispatch(
                deleteReservationItem({
                  date: selectedDate,
                }),
              );
            }
          }}
          text02="削除"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
  },
  boxTitle: {
    fontSize: 20,
  },
  boxInputArea: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  boxInputText: {
    paddingLeft: 10,
    flexGrow: 1,
  },
  boxInputTime: {
    paddingLeft: 10,
    flexGrow: 1,
  },
  boxInputTimeFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTime: {
    flexGrow: 1,
  },
  timeText: {
    alignItems: "center",
    fontSize: 16,
  },
});
