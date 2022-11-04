import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import { ItemInputForm } from "../components/ItemInputForm";
import { SwipeItem } from "../components/SwipeItem";
import { MajorItem } from "../components/MajorItem";
import uuid from "react-native-uuid";

type Props = NativeStackScreenProps<MainStackParamList, "SubCategory">;

export const SubCategoryScreen: React.FC<Props> = ({}: Props) => {
  // export const SubCategoryScreen: React.FC<Props> = ({ route, navigation }: Props) => {

  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  // const subCateogoryType = route.params;

  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  // 小項目の出し分け
  // const renderSubCategoryEditor = () => {
  //   if (subCateogoryType === "place") {
  //     return <View>練習場所</View>;
  //   } else if (subCateogoryType === "swing") {
  //     return <View>素振り</View>;
  //   } else if (subCateogoryType === "footwork") {
  //     return <View>足さばき</View>;
  //   } else if (subCateogoryType === "beat") {
  //     return <View>基本打ち</View>;
  //   } else if (subCateogoryType === "response") {
  //     return <View>応じ技</View>;
  //   } else if (subCateogoryType === "jigeiko") {
  //     return <View>地稽古</View>;
  //   } else if (subCateogoryType === "teacher") {
  //     return <View>先生との稽古</View>;
  //   } else if (subCateogoryType === "kakari") {
  //     return <View>掛稽古</View>;
  //   } else if (subCateogoryType === "target") {
  //     return <View>年間稽古目標</View>;
  //   }

  //   return (
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       {renderSubCategoryEditor()}
  //     </View>
  //   );
  // };

  // 項目消去
  const onPressDalete = (id: string) => {
    const newSubCategory = subCategory.filter((item) => item.id !== id);
    console.log(newSubCategory);
    setSubCategory(newSubCategory);
  };

  // 項目入力
  const onChangeText = (text: string) => {
    setCurrentText(text);
    console.log(text);
  };

  // 項目登録
  const onPressSubmit = () => {
    const newSubCategory = [
      ...subCategory,
      {
        text: currentText,
        id: uuid.v4(),
      },
    ];
    console.log(newSubCategory);
    setCurrentText([]);
    setSubCategory(newSubCategory);
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
        onChangeText={(value: string) => {
          onChangeText();
        }}
        onPressSubmit={() => {
          onPressSubmit();
          setVisible(false);
          // TODO: ここでreduxにdispatchする
        }}
      />

      {/* フォーム入力後に表示される練習項目 */}
      <SwipeItem
        data={subCategory}
        text={subCategory.text}
        onPressDelete={() => {
          onPressDalete(subCategory.id);
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
