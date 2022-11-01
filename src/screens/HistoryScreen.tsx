import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";

type Props = NativeStackScreenProps<MainStackParamList, "History">;

export const HistoryScreen: React.FC<Props> = ({}: Props) => {
  return (
    <View style={styles.container}>
      <CalendarFrame />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    height: 40,
  },
});
