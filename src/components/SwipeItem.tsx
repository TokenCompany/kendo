import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { colors } from "../styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { SubCategory } from "../screens/SubCategoryScreen";
import i18n from "../lang/localization";
type Props = {
  onPressDelete: (id: string, mainCategoryName: string) => void; // 親の呼び出し側で削除タップ時の処理を書く
  subCategories: SubCategory[];
  mainCategoryName: string;
};

export const SwipeItem: React.FC<Props> = ({ onPressDelete, subCategories, mainCategoryName }) => {
  return (
    <SwipeListView
      data={subCategories}
      renderItem={(data) => (
        <View style={styles.item}>
          <Text style={styles.input}>{data.item.text}</Text>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => {

        return (
          <TouchableOpacity style={styles.delete} onPress={() => onPressDelete(data.item.id, data.item.mainCategoryName)}>
            <Text>{i18n.t("TaskEdit.delete")}</Text>
          </TouchableOpacity>
        );
      }}
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
  delete: {
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
