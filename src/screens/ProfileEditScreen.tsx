import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
  // useProfileFormというカスタムフックにフォーム編集に関わるロジックを分離しています
  const {
    currentName,
    currentBirthday,
    currentAge,
    currentKenNumber,
    onChangeName,
    onChangeBirthday,
    onChangeAge,
    onChangeKenNumber,
    onPressSave,
  } = useProfileForm();

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextForm label="氏名" value={currentName} onChangeText={onChangeName} />
        <View>
          <Button onPress={showDatepicker} title="誕生日設定" />
          <Text>{currentBirthday.toLocaleString()}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={currentBirthday}
              mode={mode}
              onChangeBirthday={onChangeBirthday}
            />
          )}
        </View>
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
