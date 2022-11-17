import React, {useState} from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { TextButton } from "../components/TextButton";
import i18n from "../lang/localization";
import { useSelector} from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "History">;

export const HistoryScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPress = () => {
    navigation.navigate("ResultEdit",{
      date: selectedDateText,
      place:place,
    });
  };
  // reduxからの情報取得
  const reservations = useSelector((state: RootState) => state.reservation);
  
  console.log(reservations);
  // ステートの定義
  const [selectedDateText, setSelectedDateText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [place, setPlace] = useState<string>();
  const [showBox, setshowBox] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const showingBox = (judge:boolean) => {
    setshowBox(judge);
  };
  const showingButton = (judge:boolean) => {
    setShowButton(judge);
  }
  return (
    <ScrollView style={styles.container}>
      <CalendarFrame 
        onPressDay={(day)=>{
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
           showingBox(true);
         }else{
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
            <Text style={styles.timeText}>{startTime}</Text><Text style={styles.timeText}>~{endTime}</Text>
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
          onPress01={onPress}
          onPress02={()=>{
            showingButton(false)
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
  }
});
