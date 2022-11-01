import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from 'dayjs';

type Props = NativeStackScreenProps<MainStackParamList, "Statistics">;

export const StatisticsScreen: React.FC<Props> = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{currentDate.year()}年</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  yearText: {
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 20,
  }
});
