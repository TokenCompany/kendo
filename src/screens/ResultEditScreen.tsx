import React from "react";
import { View, ScrollView, Text, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import { KeikoTrainingInput } from "../components/KeikoTrainingInput";
import { KeikoKakariInput } from "../components/KeikoKakariInput";
import { useSelector} from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "ResultEdit">;

export const ResultEditScreen: React.FC<Props> = ({ route,navigation }: Props) => {
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const date = route.params.date;
  const onPressBtn = () => {
    createAlert();
  };
  
  const createAlert = () =>
    Alert.alert("", "登録しました", [
      { text: "OK", onPress: () => {
        navigation.navigate("History");
      } },
    ]);

  const mainCategories = {
    placeSubCategories: {
      text:'稽古場所',
      unit:''
    },
    trainingTime: {
      text:'稽古時間',
      unit: '時間'
    },
    suburiSubCategories: {
      text:'素振り',
      unit:'本'
    },
    ashiSabakiSubCategories: {
      text:'足さばき',
      unit:'本'
    },
    kihonUchiSubCategories: {
      text:'基本打ち',
      unit:'本'
    },
    oujiwazaSubCategories: {
      text:'応じ技',
      unit:'本'
    },
    jigeikoSubCategories: {
      text:'地稽古',
      unit:'回'
    },
    teacherSubCategories: {
      text:'先生との稽古',
      unit:'分'
    },
  }

  let mainCategoriesData: any = [];

  Object.keys(mainCategories).forEach(keyX => {
    mainCategoriesData.push([mainCategories[keyX].text, mainCategories[keyX].unit, keyX]);
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateWrap}>
        <Text style={styles.date}>{date}</Text>
      </View>
      {mainCategoriesData.map((data) =>(
        <KeikoTrainingInput textTraining={data[0]} textTrainingUnit={data[1]} textTrainingCategories={data[2]}/>
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
