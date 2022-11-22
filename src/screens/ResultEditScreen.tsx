import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import { KeikoTrainingInput } from "../components/KeikoTrainingInput";
import { addResults } from "../store/resultsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "ResultEdit">;
export type SubCategories = [
  {
    id: string;
    text: string;
    result: number | boolean;
  },
];
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
  // const orgPlaces = useSelector((state: RootState) => state.subCategory);

  // // console.log(orgPlaces);
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const dateText = route.params.dateText;
  const date = route.params.date;
  const place = route.params.place;
  const places = {
    placeSubCategories: [
      {
        id: "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        text: "横浜アリーナ",
      },
      {
        id: "3c8dd78b-ad72-49e2-000c-9d6663af289b",
        text: "沖縄アリーナ",
      },
      {
        id: "3c8dd78b-ad72-49e2-995c-9d6663af289b",
        text: "北谷体育館",
      },
    ],
  };
  for (const item of places.placeSubCategories) {
    if (item.text === place) {
      item.result = true;
    } else {
      item.result = false;
    }
  }
  const initAllResults = {
    trainingDate: date,
    resultsSum: {
      placeSubCategories: places["placeSubCategories"],
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
  const onPressBtn = () => {
    createAlert();
    // REDUXへの保存
    dispatch(addResults(allResults));
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

  const mainCategories = {
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
      {mainCategoriesData.map((data, index: number) => (
        <KeikoTrainingInput
          textTraining={data[0]}
          textTrainingUnit={data[1]}
          textTrainingCategories={data[2]}
          reservedPlace={place}
          key={index}
          onChangeSendInput={(changedResults, mainCategory) => {
            onChangeResults(changedResults, mainCategory);
          }}
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
