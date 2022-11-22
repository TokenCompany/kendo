import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { colors } from "../styles";
import { TextForm } from "../components/TextForm";
import { useProfileForm } from "../hooks/useProfileForm";

type Props = NativeStackScreenProps<MainStackParamList, "TaskEdit">;

export const TaskEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { currentTask, onChangeTask, onPressSaveTask, onPressDeleteTask } = useProfileForm();
  const onChangeDelete = () => {
    createAlert();
  };
  const onChangeSetting = () => {
    navigation.navigate("Setting");
  };
  const createAlert = () =>
    Alert.alert("本当に削除しますか？", "", [
      {
        text: "いいえ",
        style: "cancel",
      },
      {
        text: "はい",
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
      <TextForm label="自分の課題" value={currentTask} onChangeText={onChangeTask} />
      <View style={styles.display}>
        <TouchableOpacity style={styles.button} onPress={onChangeDelete}>
          <Text style={styles.text}>消去</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.color]}
          onPress={() => {
            if (numberOfLineBreaks < 5) {
              onPressSaveTask();
              onChangeSetting();
            } else {
              Alert.alert("課題は５行まででお願いします", "", [
                {
                  text: "はい",
                },
              ]);
            }
          }}
        >
          <Text style={styles.text}>設定</Text>
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
