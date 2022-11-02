import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";
import { SwipeListView } from "react-native-swipe-list-view";

type Props = {
  text: string; // アイテムに表示する文字を親の呼び出し側から渡す
  onPressDelete: () => void; // 親の呼び出し側で削除タップ時の処理を書く
  data: string;
};

export const SwipeItem: React.FC<Props> = ({ onPressDelete, text, data }) => {
  return (
    <SwipeListView
      data={data}
      renderItem={(renderItem) => (
        <View style={styles.item}>
          <Text style={styles.input}>{text}</Text>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <TouchableOpacity style={styles.dalete} onPress={onPressDelete}>
          <Text>消去</Text>
        </TouchableOpacity>
      )}
      leftOpenValue={75}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 25,
    borderColor: "#aaa",
    paddingHorizontal: 5,
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
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
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
