import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";
import { useSubCategory } from "../hooks/useSubCategory";

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
    showTargetSetting();
  };

  const [show, setShow] = useState(false);
  const [currentText, setCurrentText] = useState<string>("");
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };
  const showTargetSetting = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
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

        {show && (
          <View style={styles.objectiveContainer}>
            <Text style={styles.objectiveLabel}>年間稽古目標</Text>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>合計</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>〇〇〇 先生</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>〇〇〇〇〇 先生</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>〇〇〇〇 先生</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
          </View>
        )}
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
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  objectiveContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingRight: 60,
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
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
  objectiveText: {
    fontSize: 18,
  },
});
