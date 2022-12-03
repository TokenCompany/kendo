import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { addTargetCategory } from "../store/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button } from "../components/Button";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "Target">;
export type TargetCategory = {
  id: string;
  text: string;
  goal: number;
  result: number;
};

export const TargetScreen: React.FC<Props> = ({ navigation }: Props) => {
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
  let test = initTargets;
  // stateの定義
  const [currentValues, setCurrentValues] = useState<string[]>([""]);
  const [currentTargets, setCurrentTargets] = useState(test);
  const [currentYearGoal, setCurrentYearGoal] = useState<number>(0);
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
    if (currentYearGoal > 365) {
      // アラートの記述追加
      Alert.alert("登録された内容が1年の制限を超えています。", "もう一度入力し直してください", [
        { text: "戻る" },
      ]);
    } else {
      // allYearのデータも格納
      let result = 0;
      let yearGoal = 0;
      if (currentYear in targets) {
        for (const target of targets[currentYear]) {
          if (target.id === "all" && target.result !== 0) {
            result = target.result;
          }
          if (target.id === "all" && currentYearGoal === 0) {
            yearGoal = target.goal;
          }else{
            yearGoal = currentYearGoal
          }
        }
      }

      let newCurrentTargets = [
        ...currentTargets,
        {
          id: "all",
          text: "年間稽古目標",
          goal: yearGoal,
          result: result,
        },
      ];
      // reduxへの保存
      const saveTargets = {
        year: currentYear,
        targets: newCurrentTargets,
      };
      console.log(saveTargets);
      
      // 登録された先生全てに目標入力を必須にする
      if (saveTargets.targets.length === teachers.length + 1) {
        dispatch(addTargetCategory(saveTargets));
        Alert.alert("稽古目標が登録されました", "", [{ text: "戻る" }]);
      } else {
        Alert.alert("設定された全ての先生の目標を設定してください。", "", [{ text: "戻る" }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <KeyboardAvoidingView>
          <View>
            <Text style={styles.objectiveLabel}>年間稽古目標</Text>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>合計</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={(num) => {
                  setCurrentYearGoal(Number(num));
                }}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            {teachers.map((teacher: any, index: number) => {
              return (
                <View style={styles.objectiveInputArea} key={index}>
                  <Text style={styles.objectiveText}>{teacher.text}先生</Text>
                  <TextInput
                    style={styles.objectiveInput}
                    keyboardType="numeric"
                    onChangeText={(count) => {
                      onChangeCountByTeacher(Number(count), teacher.id, index);
                    }}
                    value={currentValues[index]}
                  ></TextInput>
                  <Text style={styles.objectiveText}>時間</Text>
                </View>
              );
            })}
            <View style={styles.submitButtonContainer}>
              <Button
                text="目標登録"
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
