import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "../styles";
// screens
import { InitScreen } from "../screens/InitScreen";
import { MenuScreen } from "../screens/MenuScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { ResultEditScreen } from "../screens/ResultEditScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { TaskEditScreen } from "../screens/TaskEditScreen";
import { InitEditScreen } from "../screens/InitEditScreen";
import { ProfileEditScreen } from "../screens/ProfileEditScreen";
import { TrainingEditScreen } from "../screens/TrainingEditScreen";
import { SubCategoryScreen } from "../screens/SubCategoryScreen";
import { TargetScreen } from "../screens/TargetScreen";
import { LanguageScreen } from "../screens/LanguageScreen";
import { SettingButton } from "../components/SettingButton";
// types
import { MainStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<MainStackParamList>();
type Props = NativeStackScreenProps<MainStackParamList, "Setting">;
const renderMenuButton = (navigation: any) => {
  return <SettingButton onPress={() => navigation.navigate("Menu")} />;
};

export const MainStack: React.FC<Props> = () => {
  return (
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
        name="ResultEdit"
        component={ResultEditScreen}
        options={({ navigation }) => ({
          title: "実績入力",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="TaskEdit"
        component={TaskEditScreen}
        options={({ navigation }) => ({
          headerTitle: "課題設定",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="InitEdit"
        component={InitEditScreen}
        options={({ navigation }) => ({
          headerTitle: "初期画面設定",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={({ navigation }) => ({
          headerTitle: "プロフィール編集",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="TrainingEdit"
        component={TrainingEditScreen}
        options={({ navigation }) => ({
          title: "練習内容項目編集",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="SubCategory"
        component={SubCategoryScreen}
        options={({ route, navigation }) => ({
          title: "練習内容項目編集",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="Target"
        component={TargetScreen}
        options={({ route, navigation }) => ({
          title: "年間稽古目標編集",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={({ route, navigation }) => ({
          title: "表示言語切り替え",
          headerRight: () => renderMenuButton(navigation),
        })}
      />
    </Stack.Navigator>
  );
};
