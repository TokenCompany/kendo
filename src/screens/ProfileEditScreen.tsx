import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
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
        {/* <TextForm label="生年月日" value={currentName} onChangeText={onChangeName} /> */}
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
