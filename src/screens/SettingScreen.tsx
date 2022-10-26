import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";

type Props = NativeStackScreenProps<MainStackParamList, "Setting">;

export const SettingScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPressProfile = () => {
    navigation.navigate("ProfileEdit");
  };
  const onPressTraining = () => {
    navigation.navigate("TrainingEdit");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button text="プロフィール編集" onPress={onPressProfile} />
      </View>
      <View>
        <Button text="練習内容項目設定" onPress={onPressTraining} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
