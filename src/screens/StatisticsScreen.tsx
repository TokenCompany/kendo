import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from "dayjs";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

type Props = NativeStackScreenProps<MainStackParamList, "Statistics">;

export const StatisticsScreen: React.FC<Props> = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const data = [
    { value: 50, frontColor: "#5d99c6", label: "A先生" },
    { value: 20, frontColor: "#f48fb1", barStyle: { marginLeft: -10 } },
    { value: 90, frontColor: "#5d99c6", label: "B先生" },
    { value: 40, frontColor: "#f48fb1", barStyle: { marginLeft: -10 } },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{currentDate.year()}年</Text>
      <View style={{ margin: 30 }}>
        <BarChart data={data} horizontal noOfSections={3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  yearText: {
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 20,
  },
});
