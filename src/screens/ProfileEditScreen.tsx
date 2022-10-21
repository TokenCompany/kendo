import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
  const { currentName, onChangeName, onPressSave } = useProfileForm();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextForm label="氏名" value={currentName} onChangeText={onChangeName} />
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
