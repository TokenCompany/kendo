import React from "react";
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import { KeikoPlaceInput } from "../components/KeikoPlaceInput";
import { KeikoTimeInput } from "../components/KeikoTimeInput";
import { KeikoTrainingInput } from "../components/KeikoTrainingInput";
import { KeikoTeacherInput } from "../components/KeikoTeacherInput";

type Props = NativeStackScreenProps<MainStackParamList, "ResultEdit">;

export const ResultEditScreen: React.FC<Props> = ({}: Props) => {
  const { onPressSave } = useProfileForm();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateWrap}>
        <Text style={styles.date}>2022年4月22日(金)</Text>
      </View>
      <KeikoPlaceInput textPlace="稽古場所" />
      <KeikoTimeInput textTime="稽古時間" />
      <KeikoTrainingInput textTraining="素振り" textTrainingUnit="本" />
      <KeikoTrainingInput textTraining="足さばき" textTrainingUnit="分" />
      <KeikoTrainingInput textTraining="基本打ち" textTrainingUnit="本" />
      <KeikoTrainingInput textTraining="地稽古" textTrainingUnit="本" />
      <KeikoTeacherInput textTeacher="先生との稽古" />
      <View style={styles.buttonContainer}>
        <Button text="稽古実績登録" onPress={onPressSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  dateWrap: {
    width: "100%",
    alignItems: "center",
  },

  date: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
});
