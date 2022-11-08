import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "InitEdit">;

export const InitEditScreen: React.FC<Props> = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.initEditContainer}>
          <Text style={styles.initEditText}>八段への道</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditContainer}>
          <Text style={styles.initEditText}>全国大会への道</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditContainer}>
          <Text style={styles.initEditText}>流汗悟道</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditContainer}>
          <Text style={styles.initEditText}>交剣知愛</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditContainer}>
          <Text style={styles.initEditText}>不動心</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.initEditContainer}>
          <Text style={styles.initEditText}>切磋琢磨</Text>
        </TouchableOpacity>
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
  initEditContainer: {
    marginBottom: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#FCCDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  initEditText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
});
