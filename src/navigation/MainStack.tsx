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
import i18n from "../lang/localization";

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
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: `${i18n.t("History.title")}` }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: `${i18n.t("ScheduleScreen.title")}` }} />
      <Stack.Screen name="Setting" component={SettingScreen} options={{ title: `${i18n.t("ProfileEdit.setting")}` }} />
      <Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: `${i18n.t("Statistics.title")}` }} />
      <Stack.Screen
        name="ResultEdit"
        component={ResultEditScreen}
        options={({ navigation }) => ({
          title: `${i18n.t("ResultEdit.title")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="TaskEdit"
        component={TaskEditScreen}
        options={({ navigation }) => ({
          headerTitle: `${i18n.t("Setting.button03")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="InitEdit"
        component={InitEditScreen}
        options={({ navigation }) => ({
          headerTitle: `${i18n.t("Setting.button04")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={({ navigation }) => ({
          headerTitle: `${i18n.t("Setting.button01")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="TrainingEdit"
        component={TrainingEditScreen}
        options={({ navigation }) => ({
          title: `${i18n.t("TrainingEdit.title")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="SubCategory"
        component={SubCategoryScreen}
        options={({ route, navigation }) => ({
          title: `${i18n.t("TrainingEdit.title")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="Target"
        component={TargetScreen}
        options={({ route, navigation }) => ({
          title: `${i18n.t("Setting.button06")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={({ route, navigation }) => ({
          title: `${i18n.t("Setting.button05")}`,
          headerRight: () => renderMenuButton(navigation),
        })}
      />
    </Stack.Navigator>
  );
};
