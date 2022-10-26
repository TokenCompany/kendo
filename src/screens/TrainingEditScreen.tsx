import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
// import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
// import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;

export const TrainingEditScreen: React.FC<Props> = ({}: Props) => {
  // useProfileFormというカスタムフックにフォーム編集に関わるロジックを分離しています
  const {
    currentName,
    currentAge,
    currentKenNumber,
    onChangeName,
    onChangeAge,
    onChangeKenNumber,
    onPressSave,
  } = useProfileForm();
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextForm label="氏名" value={currentName} onChangeText={onChangeName} />
        <TextForm label="年齢" value={currentAge} onChangeText={onChangeAge} />
        <TextForm label="全剣連番号" value={currentKenNumber} onChangeText={onChangeKenNumber} />
      </View>
      <View style={styles.buttonContainer}>
        <Button text="プロフィール登録" onPress={onPressSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  formContainer: {},
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
});
