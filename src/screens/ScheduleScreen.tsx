import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { Picker } from "@react-native-community/picker";
import { TextButton } from "../components/TextButton";
import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  const [time01, onChangeTime01] = useState();
  const [time02, onChangeTime02] = useState();
  const [selectedValue, setSelectedValue] = useState();
  return (
    <ScrollView style={styles.container}>
      <CalendarFrame />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>2022年4月15日(金)</Text>
        <View style={styles.boxInputArea}>
          <Text>◆{i18n.t("Schedule.time")}</Text>
          <View style={styles.boxInputTime}>
            <View style={styles.boxInputTimeFlex}>
              <Picker
                selectedValue={time01}
                style={styles.inputTime}
                onValueChange={(itemValue, itemIndex) => onChangeTime01(itemValue)}
                itemStyle={{ height: 60 }}
              >
                <Picker.Item label="10:00" value="10:00" />
                <Picker.Item label="11:00" value="11:00" />
                <Picker.Item label="12:00" value="12:00" />
                <Picker.Item label="13:00" value="13:00" />
                <Picker.Item label="14:00" value="14:00" />
                <Picker.Item label="15:00" value="15:00" />
                <Picker.Item label="16:00" value="16:00" />
              </Picker>
              <Text style={styles.timeText}>~</Text>
              <Picker
                selectedValue={time02}
                style={styles.inputTime}
                onValueChange={(itemValue, itemIndex) => onChangeTime02(itemValue)}
                itemStyle={{ height: 60 }}
              >
                <Picker.Item label="10:00" value="10:00" />
                <Picker.Item label="11:00" value="11:00" />
                <Picker.Item label="12:00" value="12:00" />
                <Picker.Item label="13:00" value="13:00" />
                <Picker.Item label="14:00" value="14:00" />
                <Picker.Item label="15:00" value="15:00" />
                <Picker.Item label="16:00" value="16:00" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.boxInputArea}>
          <Text>◆{i18n.t("Schedule.place")}</Text>
          <View style={styles.boxInputText}>
            <Picker
              selectedValue={selectedValue}
              style={styles.Picker}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              itemStyle={{ height: 60 }}
            >
              <Picker.Item label="text01" value="text01" />
              <Picker.Item label="text02" value="text02" />
            </Picker>
          </View>
        </View>
        <TextButton text01={i18n.t("Schedule.entry")} text02={i18n.t("Schedule.delete")} />
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
    fontSize: 16,
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
