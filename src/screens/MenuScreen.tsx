import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Menu">;

export const MenuScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPressSchedule = () => {
    navigation.navigate("Schedule");
  };
  const onPressHistory = () => {
    navigation.navigate("History");
  };
  const onPressStatistics = () => {
    navigation.navigate("Statistics");
  };
  const onPressSetting = () => {
    navigation.navigate("Setting");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressSchedule} style={styles.button}>
        <Image style={styles.image} source={require("../../assets/images/note.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressHistory} style={styles.button}>
        <Image style={styles.image} source={require("../../assets/images/kendo.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressStatistics} style={styles.button}>
        <Image style={styles.image} source={require("../../assets/images/graph.png")} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSetting} style={styles.button}>
        <Image style={styles.image} source={require("../../assets/images/gear.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    marginVertical: 20,
  },
});
