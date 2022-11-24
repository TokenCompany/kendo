import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { Picker } from "@react-native-community/picker";
import { TextButton } from "../components/TextButton";
import { bookReservationItem, deleteReservationItem } from "../store/reservationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";
// import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state: RootState) => state.reservation);
  const places = useSelector((state: RootState) => state.subCategory.placeSubCategories);
  const showForm = () => {
    setForm(true);
  };
  let initItems = [];
  for (const place of places) {
    initItems.push({
      label: place.text,
      value: place.text
    })
  }
  initItems.push({ label: "直接入力", value: showForm },)
  // 日付の取得と表示
  const [selectedDateText, setSelectedDateText] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [place, setPlace] = useState<string>();
  const showButton: boolean = true;
  const [allReservations, setAllReservations] = useState(reservations);
  const [form, setForm] = useState(false);
  const timeErrorAlert = () => {
    if (startTime > endTime) {
      Alert.alert("終了時間は開始時間より遅い時間を入力してください", "", [{ text: "OK" }]);
    }
  };
  {
    timeErrorAlert();
  }
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(initItems);
  const onChangeValue = () => {
    setPlace(value);
    if (value !== showForm) {
      setForm(false);
    }
  };

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
            setStartTime(reservations[day].startTime);
            setEndTime(reservations[day].endTime);
            setPlace(reservations[day].place);
          } else {
            setStartTime("10:00");
            setEndTime("10:00");
            setPlace("場所を選択");
          }
        }}
      />
      {selectedDate ? (
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{selectedDateText}</Text>
          <View style={styles.boxInputArea}>
            <Text>◆時間</Text>
            <View style={styles.boxInputTime}>
              <View style={styles.boxInputTimeFlex}>
                <Picker
                  selectedValue={startTime}
                  style={styles.inputTime}
                  onValueChange={(itemValue, itemIndex) => setStartTime(itemValue.toString())}
                  itemStyle={{ height: 60 }}
                >
                  <Picker.Item label="10:00" value="1000" />
                  <Picker.Item label="11:00" value="1100" />
                  <Picker.Item label="12:00" value="1200" />
                  <Picker.Item label="13:00" value="1300" />
                  <Picker.Item label="14:00" value="1400" />
                  <Picker.Item label="15:00" value="1500" />
                  <Picker.Item label="19:00" value="1900" />
                  <Picker.Item label="21:00" value="2100" />
                </Picker>
                <Text style={styles.timeText}>~</Text>
                <Picker
                  selectedValue={endTime}
                  style={styles.inputTime}
                  onValueChange={(itemValue, itemIndex) => setEndTime(itemValue.toString())}
                  itemStyle={{ height: 60 }}
                >
                  <Picker.Item label="10:00" value="1000" />
                  <Picker.Item label="11:00" value="1100" />
                  <Picker.Item label="12:00" value="1200" />
                  <Picker.Item label="13:00" value="1300" />
                  <Picker.Item label="14:00" value="1400" />
                  <Picker.Item label="15:00" value="1500" />
                  <Picker.Item label="16:00" value="1600" />
                  <Picker.Item label="21:00" value="2100" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.boxInputArea}>
            <Text>◆場所</Text>
            <View style={styles.boxInputText}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                labelStyle={{
                  fontSize: 18,
                  textAlign: "center",
                }}
                containerStyle={{ height: 40, width: 260, marginLeft: 10 }}
                style={{ backgroundColor: "#F4F4F5", borderWidth: 0 }}
                dropDownStyle={{ backgroundColor: "#F4F4F5" }}
                onChangeValue={onChangeValue}
                placeholder={place}
                placeholderStyle={{
                  textAlign: "center",
                  fontSize: 20,
                }}
                activeLabelStyle={{ color: "red" }}
              />
            </View>
          </View>
          {form && <TextInput style={styles.form} onChangeText={place} />}
          <TextButton
            text01="登録"
            onPress01={() => {
              if (selectedDate && startTime && endTime && place) {
                if (selectedDate in allReservations) {
                  Alert.alert("稽古予定を修正しますか？", "", [
                    {
                      text: "いいえ",
                      style: "cancel",
                    },
                    {
                      text: "はい",
                      onPress: () =>
                        dispatch(
                          bookReservationItem({
                            date: selectedDate,
                            startTime: startTime,
                            endTime: endTime,
                            place: place,
                          }),
                        ),
                    },
                  ]);
                } else {
                  dispatch(
                    bookReservationItem({
                      date: selectedDate,
                      startTime: startTime,
                      endTime: endTime,
                      place: place,
                    }),
                  );
                }
              }
            }}
            onPress02={() => {
              if (selectedDate) {
                Alert.alert("稽古予定を削除しますか？", "", [
                  {
                    text: "いいえ",
                    style: "cancel",
                  },
                  {
                    text: "はい",
                    onPress: () =>
                      dispatch(
                        deleteReservationItem({
                          date: selectedDate,
                        }),
                      ),
                  },
                ]);
              }
            }}
            text02="削除"
            judge={true}
          />
        </View>
      ) : (
        ""
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    padding: 20,
    paddingTop: 5,
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
  form: {
    height: 30,
    width: "79%",
    marginLeft: "18%",
    marginTop: "5%",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    borderRadius: 5,
    paddingHorizontal: 5,
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
