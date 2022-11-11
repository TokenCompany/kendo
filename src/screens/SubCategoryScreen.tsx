import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import { ItemInputForm } from "../components/ItemInputForm";
import { SwipeItem } from "../components/SwipeItem";
import uuid from "react-native-uuid";

type Props = NativeStackScreenProps<MainStackParamList, "SubCategory">;

export type SubCategory = {
  text: string;
  id: string; // uuid
};

export const SubCategoryScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const subCategoryType = route.params.subCategoryType;

  // 小項目の出し分け
  const renderSubCategoryEditor = () => {
    if (subCategoryType === "place") {
      return <Text style={styles.MajorText}>稽古場所</Text>;
    } else if (subCategoryType === "swing") {
      return <Text style={styles.MajorText}>素振り</Text>;
    } else if (subCategoryType === "footwork") {
      return <Text style={styles.MajorText}>足さばき</Text>;
    } else if (subCategoryType === "beat") {
      return <Text style={styles.MajorText}>基本打ち</Text>;
    } else if (subCategoryType === "response") {
      return <Text style={styles.MajorText}>応じ技</Text>;
    } else if (subCategoryType === "jigeiko") {
      return <Text style={styles.MajorText}>地稽古</Text>;
    } else if (subCategoryType === "teacher") {
      return <Text style={styles.MajorText}>先生との稽古</Text>;
    } else if (subCategoryType === "kakari") {
      return <Text style={styles.MajorText}>掛稽古</Text>;
    }
  };

  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState<string>("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  // 項目消去
  const onPressDelete = (id: string) => {
    const newSubCategory = subCategories.filter((item) => item.id !== id);
    setSubCategories(newSubCategory);
  };

  // 項目入力
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };

  // 項目登録
  const onPressSubmit = () => {
    const newSubCategories: SubCategory[] = [
      ...subCategories,
      {
        text: currentText,
        id: uuid.v4(),
      } as SubCategory,
    ];
    setSubCategories(newSubCategories);
    setCurrentText("");
    // TODO: reduxに保存
    // TODO: subCategoryTypeによってredux保存先を切り替える
  };

  return (
    <View style={styles.container}>
      <View style={styles.MajorTitle}>
        {renderSubCategoryEditor()}
        <FAB style={styles.fab} small icon="plus" onPress={() => setVisible(true)} />
      </View>

      {/* プラスボタン押したら出でくるフォーム */}
      <ItemInputForm
        text={currentText}
        visible={visible}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        onPressSubmit={() => {
          onPressSubmit();
          setVisible(false);
          // TODO: ここでreduxにdispatchする
        }}
      />

      {/* フォーム入力後に表示される練習項目 */}
      <SwipeItem
        subCategories={subCategories}
        onPressDelete={(id: string) => {
          onPressDelete(id);
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
  fab: {
    position: "absolute",
    right: 0,
    backgroundColor: "#fff",
    color: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
});
