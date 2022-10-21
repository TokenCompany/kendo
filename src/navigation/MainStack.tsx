import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screens
import { HistoryScreen } from "../screens/HistoryScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
// types
import { MainStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="History" component={HistoryScreen} options={{ title: "稽古実績" }} />
    <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: "稽古予定" }} />
    <Stack.Screen name="Setting" component={SettingScreen} options={{ title: "設定" }} />
    <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: "実績表" }} />
  </Stack.Navigator>
);
