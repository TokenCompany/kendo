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
  const dispatch = useDispatch();
  // reduxからサブカテゴリ―ズの情報を取得
  const subCategories = useSelector((state: RootState) => state.subCategory);
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const dateText = route.params.dateText;
  const date = route.params.date;
  const selectedYear = dayjs(date).year().toString();
  const resultsData = useSelector((state: RootState) => state.results);
  const place = route.params.place;
  // 稽古場所の情報をコピーし、予約場所で選択された場所にtrueを代入,それ以外にはfalseを指定
  const places = JSON.parse(JSON.stringify(subCategories.placeSubCategories));
  for (const item of places) {
    if (item.text === place) {
      item.result = true;
    } else {
      item.result = false;
    }
  }
  // 練習結果の初期化
  const initAllResults = {
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

  const [allResults, setAllResults] = useState<Results>(initAllResults);
  // 実績表の合計データのための操作
  // reduxから先生事のデータ、あるいは既に設定された目標データの取得
  let targetRecords: TargetCategory[];
  let targets: any = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  let teachers = useSelector((state: RootState) => state.subCategory.teacherSubCategories);
  // 既に目標データの登録があった場合の処理
  if (selectedYear in targets === false) {
    let newTeachers = JSON.parse(JSON.stringify(teachers));
    for (const teacher of newTeachers) {
      teacher.result = 0;
      teacher.goal = 0;
    }
    targetRecords = newTeachers;
  } else {
    let newTargets = JSON.parse(JSON.stringify(targets));
    targetRecords = newTargets[selectedYear];
  }

  // 実績合計が重複しないための予約情報取得
  const resultsRecords = useSelector((state: RootState) => state.results);
  // console.log(resultsRecords);

  let resultsFlag = false;
  if (date in resultsRecords) {
    resultsFlag = true;
  }

  const changeToHours = (num: number) => {
    let hours = num / 60;
    return hours;
  };

  const onPressBtn = () => {
    createAlert();
    // REDUXへの保存
    dispatch(addResults(allResults));
    if (!resultsFlag) {
      targetRecords.forEach((element) => {
        if (element.id === "all") {
          element.result++;
        }
      });
    } else {
      let pastData = resultsRecords[date].teacherSubCategories;
      targetRecords.forEach((targetRecord) => {
        pastData.forEach((element) => {
          if (targetRecord.id === element.id) {
            targetRecord.result -= changeToHours(Number(element.result));
          }
        });
      });
    }
    // targetCategoriesの一つ一つに累計を足す
    for (const targetObj of allResults.resultsSum.teacherSubCategories) {
      for (const targetRecord of targetRecords) {
        if (targetObj.id === targetRecord.id) {
          targetRecord.result += changeToHours(Number(targetObj.result));
        }
      }
    }
    const saveAllTargets = {
      year: selectedYear,
      targets: targetRecords,
    };
    dispatch(addTargetCategory(saveAllTargets));
  };

  const onChangeResults = (results: SubCategories[], mainCategory: string) => {
    let newAllResults = { ...allResults };
    newAllResults["resultsSum"][mainCategory] = results;
    setAllResults(newAllResults);
  };

  const createAlert = () =>
    Alert.alert("", "登録しました", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("History");
        },
      },
    ]);

  const mainCategories: any = {
    placeSubCategories: {
      text: "稽古場所",
      unit: "",
    },
    trainingTime: {
      text: "稽古時間",
      unit: "時間",
    },
    suburiSubCategories: {
      text: "素振り",
      unit: "本",
    },
    ashiSabakiSubCategories: {
      text: "足さばき",
      unit: "本",
    },
    kihonUchiSubCategories: {
      text: "基本打ち",
      unit: "本",
    },
    oujiwazaSubCategories: {
      text: "応じ技",
      unit: "本",
    },
    jigeikoSubCategories: {
      text: "地稽古",
      unit: "回",
    },
    teacherSubCategories: {
      text: "先生との稽古",
      unit: "分",
    },
    kakarigeikoSubCategories: {
      text: "掛稽古",
      unit: "回",
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
          onChangeSendInput={(changedResults: any, mainCategory) => {
            onChangeResults(changedResults, mainCategory);
          }}
          resultsDate={date}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button text="稽古実績登録" onPress={onPressBtn} />
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
  },
});
