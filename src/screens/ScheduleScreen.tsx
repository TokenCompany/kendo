import React, { useState } from "react";
import { View, StyleSheet, Text ,TouchableOpacity} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";

type Props = NativeStackScreenProps<MainStackParamList, "Schedule">;

export const ScheduleScreen: React.FC<Props> = ({}: Props) => {
  // const [currentDate, setCurrentDate] = useState(dayjs());
  return (
    <View style={styles.container}>
      <CalendarFrame />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    height: 40,
  },
});
