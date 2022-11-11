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
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "ResultEdit">;

export const ResultEditScreen: React.FC<Props> = ({}: Props) => {
  const { onPressSave } = useProfileForm();
  
  let mainCategoriesArray = [];
  let mainCategorieskeys:any = [];
  for (const key in mainCategories) {
    mainCategoriesArray.push(mainCategories[key]);
    mainCategorieskeys.push(key);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateWrap}>
        <Text style={styles.date}>2022年4月22日(金)</Text>
      </View>
      <KeikoPlaceInput textPlace="稽古場所" />
      <KeikoTimeInput textTime="稽古時間" />
      {/* {mainCategoriesArray.map((category,index)=> (<KeikoTrainingInput textTraining={category} trainingKey={mainCategorieskeys[index]}/>))} */}
      <KeikoTrainingInput textTraining="素振り" />
      <KeikoTrainingInput textTraining="足さばき" />
      <KeikoTrainingInput textTraining="基本打ち" />
      <KeikoTrainingInput textTraining="先生との稽古" />
      <KeikoKakariInput textTeacher="地稽古" />
      <KeikoKakariInput textTeacher="掛稽古" />
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
