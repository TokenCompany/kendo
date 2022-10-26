import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;

export const TrainingEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPressPlace = () => {
    navigation.navigate("Place");
  };
  const onPressSwing = () => {
    navigation.navigate("Swing");
  };
  const onPressFootwork = () => {
    navigation.navigate("Footwork");
  };
  const onPressBeat = () => {
    navigation.navigate("Beat");
  };
  const onPressResponse = () => {
    navigation.navigate("Response");
  };
  const onPressJigeiko = () => {
    navigation.navigate("Jigeiko");
  };
  const onPressTeacher = () => {
    navigation.navigate("Teacher");
  };
  const onPressKakari = () => {
    navigation.navigate("Kakari");
  };
  const onPressTarget = () => {
    navigation.navigate("Target");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <MajorItem text="練習場所" onPress={onPressPlace} />
        <MajorItem text="素振り" onPress={onPressSwing} />
        <MajorItem text="足さばき" onPress={onPressFootwork} />
        <MajorItem text="基本打ち" onPress={onPressBeat} />
        <MajorItem text="応じ技" onPress={onPressResponse} />
        <MajorItem text="地稽古" onPress={onPressJigeiko} />
        <MajorItem text="先生との稽古" onPress={onPressTeacher} />
        <MajorItem text="掛稽古" onPress={onPressKakari} />
        <MajorItem text="年間稽古目標" onPress={onPressTarget} />
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
});
