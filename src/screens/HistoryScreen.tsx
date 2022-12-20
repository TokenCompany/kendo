import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { TextButton } from "../components/TextButton";
import { useSelector } from "react-redux";
import { deleteResults } from "../store/resultsSlice";
import { addTargetCategory } from "../store/subCategorySlice";
import { bookReservationItem} from "../store/reservationSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import dayjs from "dayjs";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = NativeStackScreenProps<MainStackParamList, "History">;

export const HistoryScreen: React.FC<Props> = ({ navigation }: Props) => {
  // 言語の設定
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const dispatch = useDispatch();
  const onPress = () => {
    navigation.navigate("ResultEdit", {
      dateText: selectedDateText,
      date: selectedDate!,
      place: place,
    });
    setshowBox(false);
  };
  // reduxからの予約情報取得
  const reservations = useSelector((state: RootState) => state.reservation);
  // reduxからの実績情報取得
  const results = useSelector((state: RootState) => state.results);

  const resultChangePlace = (day: string) => {
    if (day in results) {
      results[day].placeSubCategories.forEach((element) => {
        if (element.result === true) setPlace(element.text);
      });
    } else {
      setPlace(reservations[day].place);
    }
  };
  const targets: any = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  // ステートの定義
  const [selectedDateText, setSelectedDateText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [place, setPlace] = useState<string>("");
  const [showBox, setshowBox] = useState(false);
  const [showButton, setShowButton] = useState(true);
  // 何回押したかどうかを確認するため変数
  const showingBox = (judge: boolean) => {
    setshowBox(judge);
  };
  const showingButton = () => {
    if (showButton) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };

  const changeToHours = (num: number) => {
    let parsedHours = Math.floor((num / 60) * 100) / 100;
    return parsedHours;
  };

  let dateTextArray;
  return (
    <ScrollView style={styles.container}>
      <CalendarFrame
        onPressDay={(day) => {
          // 文字列型日付を日本語に変換
          let dateTextArray = day.split("-");
          let dateText =
            dateTextArray[0] +
            `${i18n.t("ScheduleScreen.year")}` +
            dateTextArray[1] +
            `${i18n.t("ScheduleScreen.month")}` +
            dateTextArray[2] +
            `${i18n.t("ScheduleScreen.day")}`;
          // 文字の変更
          setSelectedDate(day);
          setSelectedDateText(dateText);
          // 選択された日付が既に存在する場合
          if (day in reservations) {
            setShowButton(reservations[day].resultStatus);
            setStartTime(reservations[day].startTime);
            setEndTime(reservations[day].endTime);
            resultChangePlace(day);
            showingBox(true);
          } else {
            showingBox(false);
          }
        }}
        onChangeDay={(day) => {
          if (day in reservations) {
            setStartTime(reservations[day].startTime);
            setEndTime(reservations[day].endTime);
            setPlace(reservations[day].place);
            showingBox(true);
            dateTextArray = day.split("-");
            let dateText =
              dateTextArray[0] +
              `${i18n.t("ScheduleScreen.year")}` +
              dateTextArray[1] +
              `${i18n.t("ScheduleScreen.month")}` +
              dateTextArray[2] +
              `${i18n.t("ScheduleScreen.day")}`;
            setSelectedDate(day);
            setSelectedDateText(dateText);
          } else {
            showingBox(false);
          }
        }}
      />

      {showBox && (
        <View style={styles.box}>
          <Text style={styles.boxTitle}>{selectedDateText}</Text>
          <View style={styles.boxInputArea}>
            <Text style={styles.timeText}>◆{i18n.t("History.time")}</Text>
            <View style={styles.boxInputTime}>
              <Text style={styles.timeText}>{dayjs(startTime).format("HH:mm")}</Text>
              <Text style={styles.timeText}> 〜 {dayjs(endTime).format("HH:mm")}</Text>
            </View>
          </View>
          <View style={styles.boxInputArea}>
            <Text style={styles.timeText}>◆{i18n.t("History.place")}</Text>
            <View style={styles.boxInputText}>
              <Text style={styles.timeText}>{place}</Text>
            </View>
          </View>
          <TextButton
            text01={i18n.t("History.input")}
            text02={i18n.t("History.ncw")}
            onPress01={()=>{
              onPress();
            }}
            onPress02={() => {
              //実績が入力されている場合
              if (selectedDate! in results) {
                Alert.alert(`${i18n.t("TaskEdit.alert04")}`, "", [
                  {
                    text: `${i18n.t("TaskEdit.ok")}`,
                    onPress: () => {
                      let newTargets = JSON.parse(JSON.stringify(targets));
                      let selectedYear = dayjs(selectedDate).year().toString();
                      let newResults = JSON.parse(JSON.stringify(results));
                      let teachersResults = newResults[selectedDate!].teacherSubCategories;
                      teachersResults.forEach((teacher: any) => {
                        newTargets[selectedYear].forEach((target: any) => {
                          if (teacher.id === target.id) {
                            target.result -= changeToHours(Number(teacher.result));
                          }
                        });
                      });
                      // 全ての合計の処理も追加
                      newTargets[selectedYear].forEach((target: any) => {
                        if (target.id === "all") {
                          target.result -= 1;
                        }
                      });
                      // REDUXへ保存
                      const saveAllTargets = {
                        year: selectedYear,
                        targets: newTargets[selectedYear],
                      };
                      dispatch(addTargetCategory(saveAllTargets));
                      dispatch(deleteResults(selectedDate));
                      showingButton();
                      // 未実施ボタンのステータス保持
                      dispatch(
                        bookReservationItem({
                          date: selectedDate!,
                          startTime: reservations[selectedDate!].startTime,
                          endTime: reservations[selectedDate!].endTime,
                          place: reservations[selectedDate!].place,
                          resultStatus: false,
                        }),
                      );
                    },
                  },
                  { text: `${i18n.t("TaskEdit.cancel")}` },
                ]);
              } else {
                showingButton();
                if (reservations[selectedDate!].resultStatus) {
                  dispatch(
                    bookReservationItem({
                      date: selectedDate!,
                      startTime: reservations[selectedDate!].startTime,
                      endTime: reservations[selectedDate!].endTime,
                      place: reservations[selectedDate!].place,
                      resultStatus: false,
                    }),
                  );  
                }else{
                  dispatch(
                    bookReservationItem({
                      date: selectedDate!,
                      startTime: reservations[selectedDate!].startTime,
                      endTime: reservations[selectedDate!].endTime,
                      place: reservations[selectedDate!].place,
                      resultStatus: true,
                    }),
                  );  
                }
                
              }
            }}
            judge={showButton}
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
    marginTop: 10,
    marginBottom: 30,
    padding: 20,
    borderWidth: 1,
  },
  boxTitle: {
    fontSize: 18,
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
    flexDirection: "row",
  },
  timeText: {
    fontSize: 18,
  },
});
