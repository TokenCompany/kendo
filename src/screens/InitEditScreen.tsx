import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "InitEdit">;

export const InitEditScreen: React.FC<Props> = ({}: Props) => {
  const [Selected, setSelected] = useState(false);
  const [initEdit, setInitEdit] = useState("");
  const onChangeStyle = () => {
    setSelected(true);
    setInitEdit("");
    setInitEdit(initEditText[0]);
  };
  const initEditText = [
    "八段への道",
    "全国大会への道",
    "流汗悟道",
    "交剣知愛",
    "不動心",
    "切磋琢磨",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.initEditButton} onPress={onChangeStyle}>
          <Text style={Selected ? styles.selectedStyle : styles.notSelectedStyle}>
            {initEditText[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditButton} onPress={onChangeStyle}>
          <Text style={Selected ? styles.selectedStyle : styles.notSelectedStyle}>
            {initEditText[1]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditButton} onPress={onChangeStyle}>
          <Text style={Selected ? styles.selectedStyle : styles.notSelectedStyle}>
            {initEditText[2]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditButton} onPress={onChangeStyle}>
          <Text style={Selected ? styles.selectedStyle : styles.notSelectedStyle}>
            {initEditText[3]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditButton} onPress={onChangeStyle}>
          <Text style={Selected ? styles.selectedStyle : styles.notSelectedStyle}>
            {initEditText[4]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditButton} onPress={onChangeStyle}>
          <Text style={Selected ? styles.selectedStyle : styles.notSelectedStyle}>
            {initEditText[5]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// isSelectedというフラグがあるとして
{
  /* <View style={isSelected ? styles.selectedStyle : styles.notSelectedStyle } ></View> */
}

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
