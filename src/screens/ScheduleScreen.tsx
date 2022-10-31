import React, { useState } from "react";
import { View, StyleSheet, Text ,TouchableOpacity,TextInput} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import {Picker} from '@react-native-community/picker';
// import CalendarList from "react-native-calendars/src/calendar-list/new";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  // const [currentDate, setCurrentDate] = useState(dayjs());
  const [time01, onChangeTime01] = React.useState("");
  const [time02, onChangeTime02] = React.useState("");
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <View style={styles.container}>
      <CalendarFrame />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>2022年4月15日(金)</Text>
        <View style={styles.boxInputArea}>
          <Text>◆時間</Text>
          <View style={styles.boxInputTime}>
            <View style={styles.boxInputTimeFlex}>
              <TextInput style={styles.inputTime} onChangeText={onChangeTime01} value={time01}></TextInput>
              <Text> ~ </Text>
              <TextInput style={styles.inputTime} onChangeText={onChangeTime02} value={time02}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.boxInputArea}>
          <Text>◆場所</Text>
          <View style={styles.boxInputText}>
            <Picker
                selectedValue={selectedValue}
                style={styles.Picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                itemStyle={{ backgroundColor: '#fff',}}
              >
                <Picker.Item label="text01" value="text01" />
                <Picker.Item label="text02" value="text02" />
              </Picker>
          </View>
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity style={styles.boxButtonItem}>
            <Text style={styles.buttonText01}>登録</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxButtonItem}>
            <Text style={styles.buttonText02}>削除</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    height: 40,
  },
  box: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
  },
  boxTitle: {
    fontSize: 16,
  },
  boxInputArea: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTime: {
    height: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  boxButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxButtonItem: {
    flexGrow: 1,
  },
  buttonText01: {
    color: "blue",
    textAlign: 'center',
  },
  buttonText02: {
    color: "red",
    textAlign: 'center',
  },
  picker:{
    height: 30,
    width: '100%',
  },
});
