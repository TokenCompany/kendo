import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../styles";
// screens
import { InitScreen } from "../screens/InitScreen";
import { MenuScreen } from "../screens/MenuScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { ProfileEditScreen } from "../screens/ProfileEditScreen";
// types
import { MainStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleStyle: {
        color: colors.primary,
      },
      headerTintColor: colors.primary,
    }}
  >
    {/* 画面を追加する時はここに追加してください */}
    <Stack.Screen name="Init" component={InitScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
    <Stack.Screen name="History" component={HistoryScreen} options={{ title: "稽古実績" }} />
    <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: "稽古予定" }} />
    <Stack.Screen name="Setting" component={SettingScreen} options={{ title: "設定" }} />
    <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: "実績表" }} />
    <Stack.Screen
      name="ProfileEdit"
      component={ProfileEditScreen}
      options={{ title: "プロフィール編集" }}
    />
  </Stack.Navigator>
);
