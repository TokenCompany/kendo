import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { SwipeListView } from "react-native-swipe-list-view";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import { ItemInputForm } from "../components/ItemInputForm";
import { SwipeItem } from "../components/SwipeItem";

type Props = NativeStackScreenProps<MainStackParamList, "Response">;

export const ResponseScreen: React.FC<Props> = ({}: Props) => {
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState([]);

  // 項目消去
  const onPressDalete = (key: number) => {
    const newcurrentText = currentText.filter((item) => item.key !== key);
    setCurrentText(newcurrentText);
  };
  return (
    <View style={styles.container}>
      <View style={styles.MajorTitle}>
        <Text style={styles.MajorText}>応じ技</Text>
        <FAB style={styles.fab} small icon="plus" onPress={() => setVisible(true)} />
      </View>

      {/* プラスボタン押したら出でくるフォーム */}
      <ItemInputForm
        text={currentText}
        visible={visible}
        onChangeText={(text) => {
          setCurrentText(text);
        }}
        onPressSubmit={() => {
          console.log("Pressed", currentText);
          // TODO: ここでreduxにdispatchする
        }}
      />

      {/* フォーム入力後に表示される練習項目 */}
      <SwipeItem
        text={currentText}
        data={currentText}
        onPressDelete={() => {
          console.log("Pressed", onPressDalete);
        }}
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
    height: 25,
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
