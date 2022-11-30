import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";
import { addTargetCategory } from "../store/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button } from "../components/Button";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;
export type TargetCategory = {
  id: string;
  text: string;
  goal: number;
  result: number;
};

export const TrainingEditScreen: React.FC<Props> = ({ navigation }: Props) => {
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
    if(currentYear in targets){
      for (const target of targets[currentYear]) {
        if (target.id === teacher.id) {
          "goal" in target ? teacher.goal = target.goal : teacher.goal = 0;
          "result" in target ? teacher.result = target.result : teacher.result = 0;
          break;
        }
      }
    }else{
      teacher.result = 0;
      teacher.goal = 0;
    }
  }
  initTargets = newTeachers;
  let test = initTargets
  // console.log(initTargets);
  // refの定義
  const scrollViewRef = useRef<ScrollView>(null);
  // stateの定義
  const [currentValues, setCurrentValues] = useState<string[]>([""]);
  const [currentTargets, setCurrentTargets] = useState(test);
  console.log(targets);
  
  const [show, setShow] = useState(false);
  const [currentYearGoal, setCurrentYearGoal] = useState<number>(0);
  // 各先生の値とindex番号を取得することによってcurrentTargets配列の中の値を更新
  const onChangeCountByTeacher = (count: number, id: string, index: number) => {
    let newCurrentTargets = [];
    for (const target of currentTargets) {
      if (target.id === id) {
        newCurrentTargets.push({
          ...target,
          goal: count,
          result: "result" in target ? target.result : 0
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

  const onPressPlace = () => {
    navigation.navigate("SubCategory", {
      // 遷移先にどの小項目を編集したいかを渡す
      subCategoryType: "placeSubCategories", // 地稽古の小項目設定に遷移するとき
    });
  };
  const onPressSwing = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "suburiSubCategories",
    });
  };
  const onPressFootwork = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "ashiSabakiSubCategories",
    });
  };
  const onPressBeat = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "kihonUchiSubCategories",
    });
  };
  const onPressResponse = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "oujiwazaSubCategories",
    });
  };
  const onPressJigeiko = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "jigeikoSubCategories",
    });
  };
  const onPressTeacher = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "teacherSubCategories",
    });
  };
  const onPressKakari = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "kakarigeikoSubCategories",
    });
  };
  // 年間目標の入力UIが出てから自動スクロールさせるための記述
  const goToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  };
  const onPressTarget = () => {
    showTargetSetting();
  };

  const showTargetSetting = () => {
    setShow(true);
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
      if (currentYear in targets) {
        for (const target of targets[currentYear]) {
          if (target.id === "all" && target.result !== 0) {
            result = target.result;
          }
        }
      }
      
      let newCurrentTargets = [
        ...currentTargets,
        {
          id: "all",
          text: "年間稽古目標",
          goal: currentYearGoal,
          result: result,
        },
      ];
      // reduxへの保存
      
      
      const saveTargets = {
        year: currentYear,
        targets: newCurrentTargets,
      };
      // 登録された先生全てに目標入力を必須にする
      // console.log(saveTargets);
      
      if (saveTargets.targets.length === teachers.length + 1) {
        dispatch(addTargetCategory(saveTargets));
        Alert.alert("稽古目標が登録されました", "", [{ text: "戻る" }]);
      }else{
        Alert.alert("設定された全ての先生の目標を設定してください。", "", [{ text: "戻る" }]);
      }
      
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
        <View style={styles.buttonContainer}>
          <MajorItem text="稽古場所" onPress={onPressPlace} />
          <MajorItem text="素振り" onPress={onPressSwing} />
          <MajorItem text="足さばき" onPress={onPressFootwork} />
          <MajorItem text="基本打ち" onPress={onPressBeat} />
          <MajorItem text="応じ技" onPress={onPressResponse} />
          <MajorItem text="地稽古" onPress={onPressJigeiko} />
          <MajorItem text="先生との稽古" onPress={onPressTeacher} />
          <MajorItem text="掛稽古" onPress={onPressKakari} />
          <MajorItem
            text="年間稽古目標"
            onPress={() => {
              onPressTarget();
              setTimeout(goToBottom, 100);
            }}
          />

          {show && (
            <KeyboardAvoidingView>
              <View style={styles.objectiveContainer}>
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
                  {/* <Text style={styles.objectiveAll}>{currentYearGoal}</Text> */}
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
          )}
        </View>
      </ScrollView>
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
  objectiveContainer: {
    marginTop: 30,
    marginBottom: 200,
    // flex:3,
    // paddingRight: 60,
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
    // height: '30%',
    // justifyContent: 'center',
    alignItems: "center",
  },
});
