import React from "react";
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "../components/Button";
import { KeikoPlaceInput } from "../components/KeikoPlaceInput";
import { KeikoTimeInput } from "../components/KeikoTimeInput";
import { KeikoTrainingInput } from "../components/KeikoTrainingInput";
import { KeikoKakariInput } from "../components/KeikoKakariInput";

type Props = NativeStackScreenProps<MainStackParamList, "ResultEdit">;

export const ResultEditScreen: React.FC<Props> = ({}: Props) => {
  const { onPressSave } = useProfileForm();

  const mainCategories = {
    placeSubCategories: {
      text:'稽古場所',
      unit:''
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
    console.log(keyX);
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateWrap}>
        <Text style={styles.date}>2022年4月22日(金)</Text>
      </View>
      {mainCategoriesData.map((data) =>(
        <KeikoTrainingInput textTraining={data[0]} textTrainingUnit={data[1]} textTrainingCategories={data[2]}/>
      ))}
      <View style={styles.buttonContainer}>
        <Button text="稽古実績登録" onPress={onPressSave} />
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
