import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { SwipeListView } from "react-native-swipe-list-view";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import { TextInput } from "react-native";

type Props = NativeStackScreenProps<MainStackParamList, "Response">;

const MinorItems = [{ id: 1, name: "item1" }];

export const ResponseScreen: React.FC<Props> = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.MajorTitle}>
        <Text style={styles.MajorText}>応じ技</Text>
        <FAB style={styles.fab} small icon="plus" onPress={() => console.log("Pressed")} />
      </View>

      <SwipeListView
        data={MinorItems}
        renderItem={(date) => (
          <View style={styles.item}>
            <TextInput style={styles.input} placeholder={"テキスト入力"} />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity style={styles.dalete} onPress={() => console.log("Pressed")}>
            <Text>消去</Text>
          </TouchableOpacity>
        )}
        leftOpenValue={75}
      />
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
  MajorTitle: {
    marginBottom: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#FCCDCD",
    alignItems: "center",
    justifyContent: "center",
  },
  MajorText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
  item: {
    position: "relative",
    marginBottom: 3,
    width: "100%",
    height: 50,
    backgroundColor: "#def3d7",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 0,
    backgroundColor: "#fff",
    color: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  input: {
    height: 40,
    borderColor: "#aaa",
    paddingHorizontal: 5,
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
  text: {
    color: "#000",
    fontWeight: "600",
    fontSize: 20,
  },
  dalete: {
    marginBottom: 3,
    width: 75,
    height: 50,
    fontSize: 20,
    backgroundColor: "#e4715d",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
