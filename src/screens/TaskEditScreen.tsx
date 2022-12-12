import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { colors } from "../styles";
import { TaskTextForm } from "../components/TaskTextForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = NativeStackScreenProps<MainStackParamList, "TaskEdit">;

export const TaskEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const { currentTask, onChangeTask, onPressSaveTask, onPressDeleteTask } = useProfileForm();
  const onChangeDelete = () => {
    createAlert();
  };
  const onChangeSetting = () => {
    navigation.navigate("Setting");
  };
  const createAlert = () =>
    Alert.alert("", i18n.t("TaskEdit.alert04"), [
      {
        text: i18n.t("TaskEdit.cancel"),
        style: "cancel",
      },
      {
        text: i18n.t("TaskEdit.ok"),
        onPress: () => onSettingDelete(),
      },
    ]);
  const onSettingDelete = () => {
    onChangeTask("");
    onPressDeleteTask();
    navigation.navigate("Setting");
  };

  // 5行まで制限
  const numberOfLineBreaks = (currentTask.match(/\n/g) || []).length;

  return (
    <View style={styles.container}>
      <TaskTextForm
        label={i18n.t("TaskEdit.myTask")}
        value={currentTask}
        onChangeText={onChangeTask}
      />
      <View style={styles.display}>
        <TouchableOpacity style={styles.button} onPress={onChangeDelete}>
          <Text style={styles.text}>{i18n.t("TaskEdit.delete")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.color]}
          onPress={() => {
            if (numberOfLineBreaks < 5) {
              onPressSaveTask();
              onChangeSetting();
            } else {
              Alert.alert(`${i18n.t("TaskEdit.alert14")}`, "", [
                {
                  text: `${i18n.t("TaskEdit.ok")}`,
                },
              ]);
            }
          }}
        >
          <Text style={styles.text}>{i18n.t("TaskEdit.setting")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  display: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    width: 100,
    height: 50,
    marginLeft: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  color: {
    backgroundColor: "#e4715d",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
