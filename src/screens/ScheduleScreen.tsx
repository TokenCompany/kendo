import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { TextButton } from "../components/TextButton";
import { bookReservationItem, deleteReservationItem } from "../store/reservationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import i18n from "../lang/localization";
import dayjs from "dayjs";

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
      value: place.text,
    });
  }
  initItems.push({ label: "直接入力", value: showForm });

  // 日付の取得と表示
  const [selectedDateText, setSelectedDateText] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [showSelectedDate, setShowSelectedDate] = useState<boolean>();
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>();
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>();
  const [startTime, setStartTime] = useState<string>("0000");
  const [endTime, setEndTime] = useState<string>("0000");
  const [place, setPlace] = useState<string>("場所を選択");
  const [form, setForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [newPlaceFlag, setNewPlaceFlag] = useState<boolean>(false);

  const [items, setItems] = useState(initItems);
  const onChangeValue = () => {
    setPlace(value);
    if (value !== showForm) {
      setForm(false);
    }
  };

  // 時間分解
  const renderChangeText = (date: string) => {
    let originDate = date.toString().split("");
    originDate.splice(2, 1);
    let changeText = "";
    originDate.forEach((element) => {
      changeText += element;
    });
    return changeText;
  };

  const onPressShowStartTimePicker = () => {
    setShowStartTimePicker(true);
  };

  const onPressShowEndTimePicker = () => {
    setShowEndTimePicker(true);
  };

  const onPressSelected = () => {
    setShowSelectedDate(false);
    setValue(place);
    setForm(false);
    setOpen(false);

    dispatch(
      bookReservationItem({
        date: selectedDate,
        startTime: startTime,
        endTime: endTime,
        place: place,
      }),
    );
  };

  const onPressDelete = () => {
    setShowSelectedDate(false);
    dispatch(
      deleteReservationItem({
        date: selectedDate,
      }),
    );
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
          setShowSelectedDate(true);
          setSelectedDateText(dateText);
          // 選択された日付が既に存在する場合
          if (day in reservations) {
            setStartTime(reservations[day].startTime);
            setEndTime(reservations[day].endTime);
            setPlace(reservations[day].place);
          } else {
            setStartTime("0000");
            setEndTime("0000");
            setPlace("場所を選択");
          }
        }}
      />
      {showSelectedDate && (
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{selectedDateText}</Text>
          <View style={styles.boxInputArea}>
            <Text>◆ 時間</Text>
            <View style={styles.boxInputTime}>
              <View style={styles.boxInputTimeFlex}>
                <View style={styles.timeStart}>
                  {Platform.OS === "android" && (
                    <View>
                      <TouchableOpacity
                        style={styles.timeStartAndroid}
                        onPress={() => onPressShowStartTimePicker()}
                      >
                        <Text style={styles.timeStartTextAndroid}>
                          {dayjs(startTime).format("HH:mm").toString()}
                        </Text>
                      </TouchableOpacity>
                      {showStartTimePicker && (
                        <DateTimePicker
                          style={{ height: 60 }}
                          value={dayjs(startTime).toDate()}
                          mode="time"
                          display={"default"}
                          onChange={(event, date1) => {
                            setShowStartTimePicker(false);
                            setStartTime(date1.toString());
                          }}
                        />
                      )}
                    </View>
                  )}
                  {Platform.OS === "ios" && (
                    <DateTimePicker
                      style={{ height: 60 }}
                      value={dayjs(startTime).toDate()}
                      mode="time"
                      display={"default"}
                      onChange={(event, date1) => {
                        setStartTime(date1.toString());
                      }}
                    />
                  )}
                </View>
                <Text style={styles.timeText}>~</Text>
                <View style={styles.timeEnd}>
                  {Platform.OS === "android" && (
                    <View>
                      <TouchableOpacity
                        style={styles.timeStartAndroid}
                        onPress={() => onPressShowEndTimePicker()}
                      >
                        <Text style={styles.timeStartTextAndroid}>
                          {dayjs(endTime).format("HH:mm").toString()}
                        </Text>
                      </TouchableOpacity>
                      {showEndTimePicker && (
                        <DateTimePicker
                          style={{ height: 60 }}
                          value={dayjs(endTime).toDate()}
                          mode="time"
                          display={"default"}
                          onChange={(event, date2) => {
                            setShowEndTimePicker(false);
                            setEndTime(date2.toString());
                          }}
                        />
                      )}
                    </View>
                  )}
                  {Platform.OS === "ios" && (
                    <DateTimePicker
                      style={{ height: 60 }}
                      value={dayjs(endTime).toDate()}
                      mode="time"
                      display={"default"}
                      onChange={(event, date2) => {
                        setEndTime(date2.toString());
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.boxInputArea}>
            <Text>◆ 場所</Text>
            <View style={styles.boxInputText}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                max={6}
                maxHeight={300}
                zIndex={1000}
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
          {form && (
            <TextInput
              style={styles.form}
              onChangeText={(text) => {
                setPlace(text);
                setNewPlaceFlag(true);
              }}
            />
          )}
          <TextButton
            text01="登録"
            onPress01={() => {
              if (
                Number(renderChangeText(dayjs(startTime).format("HH:mm").toString())) -
                  Number(renderChangeText(dayjs(endTime).format("HH:mm").toString())) >
                0
              ) {
                Alert.alert("終了時間は開始時間より遅い時間を入力してください", "", [
                  { text: "OK" },
                ]);
              } else if (startTime == "0000" || endTime == "0000") {
                Alert.alert("時間が選択されていません", "", [{ text: "OK" }]);
              } else if (place == "場所を選択") {
                Alert.alert("場所が選択されていません", "", [{ text: "OK" }]);
              } else {
                if (selectedDate && startTime && endTime && place) {
                  if (selectedDate in reservations) {
                    Alert.alert("稽古予定を修正しますか？", "", [
                      {
                        text: "いいえ",
                        style: "cancel",
                      },
                      {
                        text: "はい",
                        onPress: () => onPressSelected(),
                      },
                    ]);
                  } else {
                    Alert.alert("稽古予定が登録されました。", "", [
                      {
                        text: "戻る",
                        style: "cancel",
                        onPress: () => {
                          onPressSelected();
                        },
                      },
                    ]);
                  }
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
                    onPress: () => onPressDelete(),
                  },
                ]);
              }
            }}
            text02="削除"
            judge={true}
          />
        </View>
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
  timeStart: {
    width: "40%",
  },
  timeEnd: {
    width: "40%",
    position: "relative",
    right: "10%",
  },
  timeStartAndroid: {
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: "#F4F4F5",
  },
  timeStartTextAndroid: {
    fontSize: 16,
    padding: 5,
    paddingLeft: 10,
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
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
