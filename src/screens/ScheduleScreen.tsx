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
  Modal,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { TextButton } from "../components/TextButton";
import { bookReservationItem, deleteReservationItem } from "../store/reservationSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";
import * as Notifications from "expo-notifications";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import i18n from "../lang/localization";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
  const [value, setValue] = useState<string>("場所を選択");
  const [newPlaceFlag, setNewPlaceFlag] = useState<boolean>(false);
  const [showStart, setStartShow] = useState(false);
  const [showEnd, setEndShow] = useState(false);

  const hideDatePicker = () => {
    setStartShow(false);
    setEndShow(false);
  };

  const showStartDatepicker = () => {
    setStartShow(true);
  };

  const showEndDatepicker = () => {
    setEndShow(true);
  };

  const [items, setItems] = useState(initItems);
  const onChangeValue = () => {
    setPlace(value);
    if (value !== showForm.toString()) {
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
  const scheduleNotificationAsync = async () => {
    let notifications = await Notifications.getAllScheduledNotificationsAsync();
    for (let i = 0; i < notifications.length; i++) {
      let channelId = notifications[i].trigger.channelId;
      let identifier = notifications[i].identifier;
      if (channelId == selectedDate) {
        Notifications.cancelScheduledNotificationAsync(identifier);
      }
    }
    let date = selectedDate.split("-");
    let alartDate = Number(date[2]) - 1;
    let alartHour = 12;
    let alartMinutes = 0;
    let unixDate = new Date(Number(date[0]), Number(date[1]), alartDate, alartHour, alartMinutes);

    await Notifications.scheduleNotificationAsync({
      content: {
        body: "test",
        title: "a",
      },
      trigger: {
        channelId: selectedDate,
        date: unixDate,
      },
    });
  };

  const scheduledelete = async () => {
    let notifications = await Notifications.getAllScheduledNotificationsAsync();
    for (let i = 0; i < notifications.length; i++) {
      let channelId = notifications[i].trigger.channelId;
      let identifier = notifications[i].identifier;
      if (channelId === selectedDate) {
        Notifications.cancelScheduledNotificationAsync(identifier);
      }
    }
  };
  let dateTextArray;

  return (
    <ScrollView style={styles.container}>
      <CalendarFrame
        onPressDay={(day) => {
          // 文字列型日付を日本語に変換
          dateTextArray = day.split("-");
          let dateText =
            dateTextArray[0] + "年" + dateTextArray[1] + "月" + dateTextArray[2] + "日";
          // 文字の変更
          setSelectedDate(day);
          setShowSelectedDate(true);
          setSelectedDateText(dateText);
          setStartTime("0000");
          setEndTime("0000");
          setPlace("場所を選択");
          setValue("場所を選択")
          // 選択された日付が既に存在する場合
          if (day in reservations) {
            setStartTime(reservations[day].startTime);
            setEndTime(reservations[day].endTime);
            setPlace(reservations[day].place);
          }
        }}
        onChangeDay={(day) => {
          dateTextArray = day.split("-");
          let dateText =
            dateTextArray[0] + "年" + dateTextArray[1] + "月" + dateTextArray[2] + "日";
          setSelectedDate(day);
          setShowSelectedDate(true);
          setSelectedDateText(dateText);
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
                          locale={i18n.t("Lang.lang")}
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
                    <View>
                      <View style={styles.dayInput}>
                        <TouchableOpacity style={styles.dateButton} onPress={showStartDatepicker}>
                          <Text style={styles.buttonText}>
                            {dayjs(startTime).format("HH:mm").toString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Modal
                        animationType="fade"
                        visible={showStart}
                        transparent={true}
                        onRequestClose={() => {
                          setStartShow(false);
                        }}
                      >
                        <View style={styles.modalView}>
                          <DateTimePicker
                            locale={i18n.t("Lang.lang")}
                            value={dayjs(startTime).toDate()}
                            mode="time"
                            display={"spinner"}
                            onChange={(event, date2) => {
                              setStartTime(date2.toString());
                            }}
                          />
                          <TouchableOpacity style={styles.modalButton} onPress={hideDatePicker}>
                            <Text style={styles.textStyle}>×</Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </View>
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
                          locale={i18n.t("Lang.lang")}
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
                    <View>
                      <View style={styles.dayInput}>
                        <TouchableOpacity style={styles.dateButton} onPress={showEndDatepicker}>
                          <Text style={styles.buttonText}>
                            {dayjs(endTime).format("HH:mm").toString()}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Modal
                        animationType="fade"
                        visible={showEnd}
                        transparent={true}
                        onRequestClose={() => {
                          setEndShow(false);
                        }}
                      >
                        <View style={styles.modalView}>
                          <DateTimePicker
                            locale={i18n.t("Lang.lang")}
                            value={dayjs(endTime).toDate()}
                            mode="time"
                            display={"spinner"}
                            onChange={(event, date2) => {
                              setEndTime(date2.toString());
                            }}
                          />
                          <TouchableOpacity style={styles.modalButton} onPress={hideDatePicker}>
                            <Text style={styles.textStyle}>×</Text>
                          </TouchableOpacity>
                        </View>
                      </Modal>
                    </View>
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
                onChangeValue={onChangeValue}
                placeholder={place}

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
                        onPress: () => {
                          onPressSelected();
                          scheduleNotificationAsync();
                        },
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
                    scheduleNotificationAsync();
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
                    onPress: () => {
                      onPressDelete();
                      scheduledelete();
                    },
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
    paddingLeft: 20,
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
  dateButton: {
    paddingHorizontal: 30,
    height: 35,
  },
  dayInput: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F4F4F5",
  },
  buttonText: {
    paddingVertical: 8,
    fontSize: 18,
  },
});
