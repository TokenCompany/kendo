import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Setting">;

export const SettingScreen: React.FC<Props> = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
