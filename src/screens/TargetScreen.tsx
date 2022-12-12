import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { addTargetCategory } from "../store/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button } from "../components/Button";
import dayjs from "dayjs";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = NativeStackScreenProps<MainStackParamList, "Target">;
export type TargetCategory = {
  id: string;
  text: string;
  goal: number;
  result: number;
};

export const TargetScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const dispatch = useDispatch();
  // 今年の取得
  const currentYear = dayjs().year().toString();
  // reduxから先生事のデータ、あるいは既に設定された目標データの取得
  let initTargets;
  let targets: any = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  let teachers = useSelector((state: RootState) => state.subCategory.teacherSubCategories);
  // REDUXをmutateしないようにコピーしてから編集
  let newTeachers = JSON.parse(JSON.stringify(teachers));
  // stateの初期値を作成
  for (const teacher of newTeachers) {
    if (currentYear in targets) {
      for (const target of targets[currentYear]) {
        if (target.id === teacher.id) {
          "goal" in target ? (teacher.goal = target.goal) : (teacher.goal = 0);
          "result" in target ? (teacher.result = target.result) : (teacher.result = 0);
          break;
        }
      }
    } else {
      teacher.result = 0;
      teacher.goal = 0;
    }
  }
  initTargets = newTeachers;
  // stateの定義
  const setInitValues = () => {
    let initValues: any = [];
    if (currentYear in targets) {
      targets[currentYear].forEach((element: any, index: number) => {
        if (element.id !== "all") {
          initValues.push(element.goal.toString());
        }
      });
    }
    return initValues;
  };

  const [currentValues, setCurrentValues] = useState<string[]>(setInitValues());

  const [currentTargets, setCurrentTargets] = useState(initTargets);
  const setInitYearGoal = () => {
    let res: string = "";
    if (currentYear in targets) {
      targets[currentYear].forEach((element: any, index: number) => {
        if (element.id === "all") {
          res = element.goal.toString();
        }
      });
    }
    return res;
  };
  const [currentYearGoal, setCurrentYearGoal] = useState<string>(setInitYearGoal());
  // 登録する前に全ての値が入ってるかチェック
  const checkAllInput = () => {
    let judge: boolean = false;
    currentTargets.forEach((element: any) => {
      if ("goal" in element === false) judge = true;
    });
    return judge;
  };
  // 各先生の値とindex番号を取得することによってcurrentTargets配列の中の値を更新
  const onChangeCountByTeacher = (count: number, id: string, index: number) => {
    let newCurrentTargets = [];
    for (const target of currentTargets) {
      if (target.id === id) {
        newCurrentTargets.push({
          ...target,
          goal: count,
          result: "result" in target ? target.result : 0,
        });
      } else {
        newCurrentTargets.push(target);
      }
    }
    setCurrentTargets(newCurrentTargets);
    let newCurrentValues: string[] = [...currentValues];
    newCurrentValues[index] = count.toString();
    setCurrentValues(newCurrentValues);
  };

  const onPressTargetSubmit = () => {
    if (Number(currentYearGoal) > 365) {
      // アラートの記述追加
      Alert.alert(`${i18n.t("TaskEdit.alert11")}`, `${i18n.t("TaskEdit.alert09")}`, [
        { text: `${i18n.t("TaskEdit.back")}` },
      ]);
    } else if (checkAllInput()) {
      Alert.alert(`${i18n.t("TaskEdit.alert12")}`, "", [{ text: `${i18n.t("TaskEdit.back")}` }]);
    } else {
      // allYearのデータも格納
      let result = 0;
      let yearGoal = 0;
      if (currentYear in targets) {
        for (const target of targets[currentYear]) {
          if (target.id === "all" && target.result !== 0) {
            result = target.result;
          }
          if (target.id === "all" && Number(currentYearGoal) === 0) {
            yearGoal = target.goal;
          } else {
            yearGoal = Number(currentYearGoal);
          }
        }
      } else {
        yearGoal = Number(currentYearGoal);
      }

      let newCurrentTargets = [
        ...currentTargets,
        {
          id: "all",
          text: `${i18n.t("TrainingEdit.training09")}`,
          goal: yearGoal,
          result: result,
        },
      ];
      // reduxへの保存
      const saveTargets = {
        year: currentYear,
        targets: newCurrentTargets,
      };
      // 登録された先生全てに目標入力を必須にする
      if (saveTargets.targets.length === teachers.length + 1) {
        dispatch(addTargetCategory(saveTargets));
        Alert.alert(`${i18n.t("TaskEdit.alert13")}`, "", [{ text: `${i18n.t("TaskEdit.back")}` }]);
      } else {
        Alert.alert(`${i18n.t("TaskEdit.alert12")}`, "", [{ text: `${i18n.t("TaskEdit.back")}` }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.objectiveLabel}>{i18n.t("TrainingEdit.training09")}</Text>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>{i18n.t("TrainingEdit.result")}</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                value={currentYearGoal.toString()}
                onChangeText={(num) => {
                  setCurrentYearGoal(num);
                }}
              ></TextInput>
              <Text style={styles.objectiveText}>{i18n.t("TrainingEdit.times")}</Text>
            </View>
            {teachers.map((teacher: any, index: number) => {
              return (
                <View style={styles.objectiveInputArea} key={index}>
                  <Text style={styles.objectiveText}>{teacher.text}{i18n.t("Statistics.teacher")}</Text>
                  <TextInput
                    style={styles.objectiveInput}
                    keyboardType="numeric"
                    onChangeText={(count) => {
                      onChangeCountByTeacher(Number(count), teacher.id, index);
                    }}
                    value={currentValues[index]}
                  ></TextInput>
                  <Text style={styles.objectiveText}>{i18n.t("ScheduleScreen.time")}</Text>
                </View>
              );
            })}
            <View style={styles.submitButtonContainer}>
              <Button
                text={i18n.t("TrainingEdit.register")}
                onPress={() => {
                  onPressTargetSubmit();
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: 40,
  },
  scrollContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  objectiveLabel: {
    fontSize: 18,
    color: "#000",
  },
  objectiveInputArea: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  objectiveInput: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
  objectiveAll: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
  objectiveText: {
    fontSize: 18,
  },
  submitButtonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
