import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../styles";
// screens
import { InitScreen } from "../screens/InitScreen";
import { MenuScreen } from "../screens/MenuScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { ResultEditScreen } from "../screens/ResultEditScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { ProfileEditScreen } from "../screens/ProfileEditScreen";
import { TrainingEditScreen } from "../screens/TrainingEditScreen";
import { PlaceScreen } from "../screens/PlaceScreen";
import { SwingScreen } from "../screens/SwingScreen";
import { FootworkScreen } from "../screens/FootworkScreen";
import { BeatScreen } from "../screens/BeatScreen";
import { ResponseScreen } from "../screens/ResponseScreen";
import { JigeikoScreen } from "../screens/JigeikoScreen";
import { TeacherScreen } from "../screens/TeacherScreen";
import { KakariScreen } from "../screens/KakariScreen";
import { TargetScreen } from "../screens/TargetScreen";
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
    <Stack.Screen name="ResultEdit" component={ResultEditScreen} options={{ title: "実績入力" }} />
    <Stack.Screen name="Setting" component={SettingScreen} options={{ title: "設定" }} />
    <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: "実績表" }} />
    <Stack.Screen
      name="ProfileEdit"
      component={ProfileEditScreen}
      options={{ title: "プロフィール編集" }}
    />
    <Stack.Screen
      name="TrainingEdit"
      component={TrainingEditScreen}
      options={{ title: "練習内容項目編集" }}
    />
    <Stack.Screen name="Place" component={PlaceScreen} options={{ title: "練習場所" }} />
    <Stack.Screen name="Swing" component={SwingScreen} options={{ title: "素振り" }} />
    <Stack.Screen name="Footwork" component={FootworkScreen} options={{ title: "足さばき" }} />
    <Stack.Screen name="Beat" component={BeatScreen} options={{ title: "基本打ち" }} />
    <Stack.Screen name="Response" component={ResponseScreen} options={{ title: "応じ技" }} />
    <Stack.Screen name="Jigeiko" component={JigeikoScreen} options={{ title: "地稽古" }} />
    <Stack.Screen name="Teacher" component={TeacherScreen} options={{ title: "先生との稽古" }} />
    <Stack.Screen name="Kakari" component={KakariScreen} options={{ title: "掛稽古" }} />
    <Stack.Screen name="Target" component={TargetScreen} options={{ title: "年間稽古目標" }} />
  </Stack.Navigator>
);
