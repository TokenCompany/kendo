import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "InitEdit">;

export const InitEditScreen: React.FC<Props> = ({}: Props) => {
  const initEditText = [
    { text: "八段への道", id: 1 },
    { text: "全国大会への道", id: 2 },
    { text: "流汗悟道", id: 3 },
    { text: "交剣知愛", id: 4 },
    { text: "不動心", id: 5 },
    { text: "切磋琢磨", id: 6 },
  ];

  const renderItem = ({ item }) => {
    // const [Selected, setSelected] = useState();
    // const SelectedStyle = item.id === Selected ? styles.selectedStyle : styles.notSelectedStyle;

    return (
      <TouchableOpacity style={styles.initEditButton} onPress={() => setSelected(item.id)}>
        {/* <Text style={SelectedStyle}>{item.text}</Text> */}
        <Text>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <FlatList data={initEditText} renderItem={renderItem} />
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
    flex: 1,
    marginBottom: 50,
  },
  initEditButton: {
    marginBottom: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#FCCDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedStyle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
  notSelectedStyle: {
    color: "#000",
    fontSize: 20,
  },
});
