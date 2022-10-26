import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Jigeiko">;

export const JigeikoScreen: React.FC<Props> = ({}: Props) => {
  return <View style={styles.container}></View>;
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
