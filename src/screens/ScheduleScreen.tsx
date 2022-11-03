import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { Picker } from "@react-native-community/picker";
import { TextButton } from "../components/TextButton";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
// import { i18n } from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  // const [currentDate, setCurrentDate] = useState(dayjs());
  const [time01, onChangeTime01] = React.useState();
  const [time02, onChangeTime02] = React.useState();
  const [selectedValue, setSelectedValue] = useState();
  const translations = {
    en: { time: "Time", place: "Place" },
    ja: { time: "時間", place: "場所" },
  };
  const i18n = new I18n(translations);
  i18n.locale = Localization.locale;
  i18n.enableFallback = true;
  return (
    <ScrollView style={styles.container}>
      <CalendarFrame />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>2022年4月15日(金)</Text>
        <View style={styles.boxInputArea}>
          <Text>◆{i18n.t("time")}</Text>
          <View style={styles.boxInputTime}>
            <View style={styles.boxInputTimeFlex}>
              <TextInput
                style={styles.inputTime}
                onChangeText={onChangeTime01}
                value={time01}
              ></TextInput>
              <Text> ~ </Text>
              <TextInput
                style={styles.inputTime}
                onChangeText={onChangeTime02}
                value={time02}
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.boxInputArea}>
          <Text>◆{i18n.t("place")}</Text>
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
        <TextButton text01="登録" text02="削除" />
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
    height: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  picker: {
    height: 30,
    width: "100%",
  },
});
