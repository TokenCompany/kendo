import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;

export const TrainingEditScreen: React.FC<Props> = ({ navigation }: Props) => {
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
  const onPressTarget = () => {
    navigation.navigate("Target");
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <MajorItem text="稽古場所" onPress={onPressPlace} />
          <MajorItem text="素振り" onPress={onPressSwing} />
          <MajorItem text="足さばき" onPress={onPressFootwork} />
          <MajorItem text="基本打ち" onPress={onPressBeat} />
          <MajorItem text="応じ技" onPress={onPressResponse} />
          <MajorItem text="地稽古" onPress={onPressJigeiko} />
          <MajorItem text="先生との稽古" onPress={onPressTeacher} />
          <MajorItem text="掛稽古" onPress={onPressKakari} />
          <MajorItem text="年間稽古目標" onPress={onPressTarget} />
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
