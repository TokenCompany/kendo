import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

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
  // useStateで型を指定しておく
  // なにも指定しないと初期値"date"から推論してstring型になってしまう
  const [show, setShow] = useState(false);
  const showDatepicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = () => {
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextForm label="氏名" value={currentName} onChangeText={onChangeName} />
        <View>
          <Button onPress={showDatepicker} text="誕生日設定" />
          <Text>{currentBirthday}</Text>
          {show && (
            <DateTimePicker
              onCancel={hideDatePicker}
              onConfirm={handleConfirm}
              testID="dateTimePicker"
              // currentBirthdayはYYYYMMDD形式で入っている
              // それをdayjsを用いて読み込んでDate型に変換
              // valueはDate型なので
              value={dayjs(currentBirthday.toString(), "YYYYMMDD").toDate()}
              mode="date"
              onChange={(event, date) => {
                if (date) {
                  // birthdayはYYYYMMDDのnumber型で入れたい
                  // onChangeで渡されるdateはDate型なのでそれをYYYYMMDDのnumberに変換する
                  const birthday = Number(dayjs(date).format("YYYYMMDD"));
                  onChangeBirthday(birthday);
                }
              }}
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
