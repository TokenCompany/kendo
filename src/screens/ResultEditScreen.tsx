import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import { KeikoTrainingInput } from "../components/KeikoTrainingInput";
import { addResults } from "../store/resultsSlice";
import { addTargetCategory } from "../store/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import dayjs from "dayjs";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = NativeStackScreenProps<MainStackParamList, "ResultEdit">;
export type SubCategories = [
  {
    id: string;
    text: string;
    result: number | boolean;
  },
];
export type TargetCategory = {
  id: string;
  text: string;
  goal: number;
  result: number;
};
export type Results = {
  trainingDate: string;
  resultsSum: {
    placeSubCategories: SubCategories[];
    trainingTime: SubCategories[];
    suburiSubCategories: SubCategories[];
    ashiSabakiSubCategories: SubCategories[];
    kihonUchiSubCategories: SubCategories[];
    oujiwazaSubCategories: SubCategories[];
    jigeikoSubCategories: SubCategories[];
    teacherSubCategories: SubCategories[];
    kakarigeikoSubCategories: SubCategories[];
  };
};

export const ResultEditScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const dispatch = useDispatch();
  // reduxからサブカテゴリ―ズの情報を取得
  const subCategories = useSelector((state: RootState) => state.subCategory);
  const resultsData = useSelector((state: RootState) => state.results);

  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const dateText = route.params.dateText;
  const date = route.params.date;
  const selectedYear = dayjs(date).year().toString();
  const place = route.params.place;
  // 稽古場所の情報をコピーし、予約場所で選択された場所にtrueを代入,それ以外にはfalseを指定
  const places = JSON.parse(JSON.stringify(subCategories.placeSubCategories));
  let newPlaceFlag = true;
  for (const item of places) {
    if (item.text === place) {
      item.result = true;
      newPlaceFlag = false;
    } else {
      item.result = false;
    }
  }
  // 練習結果の初期化
  const setInitAllResults = () => {
    let initAllResults: Results;
    if (date in resultsData) {
      const copyResultsData = JSON.parse(JSON.stringify(resultsData[date]));
      initAllResults = {
        trainingDate: date,
        resultsSum: {
          placeSubCategories: places,
          trainingTime: copyResultsData.trainingTime,
          suburiSubCategories: copyResultsData.suburiSubCategories,
          ashiSabakiSubCategories: copyResultsData.ashiSabakiSubCategories,
          kihonUchiSubCategories: copyResultsData.kihonUchiSubCategories,
          oujiwazaSubCategories: copyResultsData.oujiwazaSubCategories,
          jigeikoSubCategories: copyResultsData.jigeikoSubCategories,
          teacherSubCategories: copyResultsData.teacherSubCategories,
          kakarigeikoSubCategories: copyResultsData.kakarigeikoSubCategories,
        },
      };
    } else {
      initAllResults = {
        trainingDate: date,
        resultsSum: {
          placeSubCategories: places,
          trainingTime: [],
          suburiSubCategories: [],
          ashiSabakiSubCategories: [],
          kihonUchiSubCategories: [],
          oujiwazaSubCategories: [],
          jigeikoSubCategories: [],
          teacherSubCategories: [],
          kakarigeikoSubCategories: [],
        },
      };
    }
    return initAllResults;
  };

  const [allResults, setAllResults] = useState<any>(setInitAllResults());
  // 実績表の合計データのための操作
  // reduxから先生事のデータ、あるいは既に設定された目標データの取得
  let targetRecords: TargetCategory[];
  let targets: any = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  let teachers = useSelector((state: RootState) => state.subCategory.teacherSubCategories);
  // 新しい先生が後から追加された時にターゲットにも追加する
  const addNewTeacherToTargets = (teachers: SubCategories[], newTargets: TargetCategory[]) => {
    teachers.forEach((teacher: SubCategories) => {
      let found = newTargets.find((e: TargetCategory) => e.id === teacher.id);
      if (!found) {
        newTargets.push({
          id: teacher.id,
          result: 0,
          goal: 0,
          text: teacher.text,
        });
      }
    });
  };
  // 目標データがある時とない時の処理
  if (selectedYear in targets === false) {
    let newTeachers = JSON.parse(JSON.stringify(teachers));
    for (const teacher of newTeachers) {
      teacher.result = 0;
      teacher.goal = 0;
    }
    newTeachers.push({
      goal: 0,
      id: "all",
      result: 0,
      text: `${i18n.t("TrainingEdit.training09")}`,
    });
    targetRecords = newTeachers;
  } else {
    let newTargets = JSON.parse(JSON.stringify(targets));
    let newTeachers = JSON.parse(JSON.stringify(teachers));
    // 新しい先生が入った時に追加
    addNewTeacherToTargets(newTeachers, newTargets[selectedYear]);
    targetRecords = newTargets[selectedYear];
  }

  // 実績合計が重複しないための予約情報取得
  const resultsRecords = useSelector((state: RootState) => state.results);

  let resultsFlag = false;
  if (date in resultsRecords) {
    resultsFlag = true;
  }

  const changeToHours = (num: number) => {
    let parsedHours = Math.floor((num / 60) * 100) / 100;
    return parsedHours;
  };

  const onPressBtn = () => {
    for (const check of checkArray) {
      if (allResults.resultsSum[check].length === 0) {
        Alert.alert(`${i18n.t("TaskEdit.alert15")}`, "", [
          {
            text: `${i18n.t("TaskEdit.ok")}`,
            onPress: () => {},
          },
        ]);
        return false;
      }
    }

    createAlert();
    // targetCategoriesの一つ一つに累計を足す

    let newAllResults = JSON.parse(JSON.stringify(allResults));
    for (const targetObj of newAllResults.resultsSum.teacherSubCategories) {
      for (const targetRecord of targetRecords) {
        if (targetObj.id === targetRecord.id) {
          if ("result" in targetObj === false) targetObj.result = 0;
          targetRecord.result += 1;
          //targetRecord.result += changeToHours(Number(targetObj.result));
        }
      }
    }
    // 既に実績が登録されている場合重複しないように処理が必要
    if (!resultsFlag) {
      targetRecords.forEach((element) => {
        if (element.id === "all") {
          element.result += 1;
        }
      });
    } else {
      let pastData = resultsRecords[date].teacherSubCategories;
      targetRecords.forEach((targetRecord) => {
        pastData.forEach((element) => {
          if (targetRecord.id === element.id) {
            targetRecord.result -= 1;
            //targetRecord.result -= changeToHours(Number(element.result));
          }
        });
      });
    }

    setAllResults(newAllResults);
    const saveAllTargets = {
      year: selectedYear,
      targets: targetRecords,
    };

    // REDUXへの保存
    dispatch(addResults(newAllResults));
    dispatch(addTargetCategory(saveAllTargets));
  };

  const checkNewTeacher = (results: SubCategories[], allResults: SubCategories[]) => {
    results.forEach((teacher: SubCategories) => {
      let found = allResults.find((e: SubCategories) => e.id === teacher.id);
      if (!found) {
        allResults.push({
          id: teacher.id,
          result: "result" in teacher ? teacher.result : 0,
          text: teacher.text,
        });
      }
    });
  };

  const onChangeResults = (results: SubCategories[], mainCategory: string) => {
    // resultsステートを複製し、値を入力された値に書き換える

    let newAllResults: any = JSON.parse(JSON.stringify(allResults));

    // 既に登録内容があるかないかで出し分けが必要
    // ①既にある情報を探し上書き

    if (newAllResults["resultsSum"][mainCategory].length !== 0) {
      newAllResults["resultsSum"][mainCategory].forEach((element: any) => {
        results.forEach((element2: any) => {
          if (element.id === element2.id && "result" in element2) {
            element.result = element2.result;
          }
        });
      });
      // 後から新しい先生追加した場合の記述
      checkNewTeacher(results, newAllResults["resultsSum"][mainCategory]);
    } else {
      // ②新しい入力値をそのまま追加
      newAllResults["resultsSum"][mainCategory] = results;
    }
    if (mainCategory === "placeSubCategories"){
      newAllResults["resultsSum"][mainCategory].forEach((element: any) => {
        if(element.id === "new" && element.result){
          newAllResults["resultsSum"][mainCategory] = results;
        }
      });
    }

    setAllResults(newAllResults);
  };

  let checkArray: string[] = [];

  const onCheckedBoolean = (textTrainingCategories: string, checked: boolean) => {
    if (checked === true) {
      checkArray.push(textTrainingCategories);
    } else {
      let idx = checkArray.indexOf(textTrainingCategories);
      if (idx >= 0) {
        checkArray.splice(idx, 1);
      }
    }
  };

  const createAlert = () =>
    Alert.alert("", `${i18n.t("Modal.registered")}`, [
      {
        text: `${i18n.t("TaskEdit.ok")}`,
        onPress: () => {
          navigation.navigate("History");
        },
      },
    ]);

  const mainCategories: any = {
    placeSubCategories: {
      text: `${i18n.t("TrainingEdit.training01")}`,
      unit: "",
    },
    trainingTime: {
      text: `${i18n.t("ResultEdit.textTime")}`,
      unit: `${i18n.t("ResultEdit.textUnit03")}`,
    },
    suburiSubCategories: {
      text: `${i18n.t("TrainingEdit.training02")}`,
      unit: `${i18n.t("ResultEdit.textUnit01")}`,
    },
    ashiSabakiSubCategories: {
      text: `${i18n.t("TrainingEdit.training03")}`,
      unit: `${i18n.t("ResultEdit.textUnit01")}`,
    },
    kihonUchiSubCategories: {
      text: `${i18n.t("TrainingEdit.training04")}`,
      unit: `${i18n.t("ResultEdit.textUnit01")}`,
    },
    oujiwazaSubCategories: {
      text: `${i18n.t("TrainingEdit.training05")}`,
      unit: `${i18n.t("ResultEdit.textUnit01")}`,
    },
    jigeikoSubCategories: {
      text: `${i18n.t("TrainingEdit.training06")}`,
      unit: `${i18n.t("ResultEdit.textUnit01")}`,
    },
    teacherSubCategories: {
      text: `${i18n.t("TrainingEdit.training07")}`,
      unit: `${i18n.t("ResultEdit.textUnit02")}`,
    },
    kakarigeikoSubCategories: {
      text: `${i18n.t("TrainingEdit.training08")}`,
      unit: `${i18n.t("ResultEdit.textUnit01")}`,
    },
  };

  let mainCategoriesData: any = [];

  Object.keys(mainCategories).forEach((keyX) => {
    mainCategoriesData.push([mainCategories[keyX].text, mainCategories[keyX].unit, keyX]);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateWrap}>
        <Text style={styles.date}>{dateText}</Text>
      </View>
      {mainCategoriesData.map((data: any, index: number) => (
        <KeikoTrainingInput
          textTraining={data[0]}
          textTrainingUnit={data[1]}
          textTrainingCategories={data[2]}
          reservedPlace={place}
          key={index}
          newPlaceJudge={newPlaceFlag}
          onChangeSendInput={(changedResults: any, mainCategory) => {
            onChangeResults(changedResults, mainCategory);
          }}
          onChangeSendPlace={(changedResults: any) => {
            onChangeResults(changedResults,"placeSubCategories")
          }}
          onCheckedSend={(textTrainingCategories, checked) => {
            onCheckedBoolean(textTrainingCategories, checked);
          }}
          resultsDate={date}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button text={i18n.t("ResultEdit.textButton")} onPress={onPressBtn} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  dateWrap: {
    width: "100%",
    alignItems: "center",
  },

  date: {
    fontSize: 22,
    fontWeight: "bold",
    padding: 10,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 300,
  },
});
