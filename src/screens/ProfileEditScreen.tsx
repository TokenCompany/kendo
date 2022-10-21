import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { TextForm } from "../components/TextForm";

type Props = NativeStackScreenProps<MainStackParamList, "ProfileEdit">;

export const ProfileEditScreen: React.FC<Props> = ({}: Props) => {
  return (
    <View style={styles.container}>
      <TextForm label="氏名" value="" onChangeText={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
