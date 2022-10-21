import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
  const { currentName, onChangeName } = useProfileForm();

  return (
    <View style={styles.container}>
      <TextForm label="氏名" value={currentName} onChangeText={onChangeName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
