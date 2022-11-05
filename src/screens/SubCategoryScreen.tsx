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
  const {
    setPlace,
    setSwing,
    setFootwork,
    setBeat,
    setResponse,
    setJigeiko,
    setTeacher,
    setKakari,
    setTarget,
    place,
    swing,
    footwork,
    beat,
    response,
    jigeiko,
    teacher,
    kakari,
    target,
    onPressSave,
  } = useSubCategory();
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const subCategoryType = route.params;

  // 小項目の出し分け
  const renderSubCategoryEditor = () => {
    if (subCategoryType === "place") {
      return <Text style={styles.MajorText}>練習場所</Text>;
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
    } else if (subCategoryType === "target") {
      return <Text style={styles.MajorText}>年間稽古目標</Text>;
    }
  };

  const renderSubCategoryDelete = () => {
    if (subCategoryType === "place") {
      const newSubCategory = place.filter((item: SubCategory[]) => item.id !== id);
      setPlace(newSubCategory);
    } else if (subCategoryType === "swing") {
      const newSubCategory = swing.filter((item: SubCategory[]) => item.id !== id);
      setSwing(newSubCategory);
    } else if (subCategoryType === "footwork") {
      const newSubCategory = footwork.filter((item: SubCategory[]) => item.id !== id);
      setFootwork(newSubCategory);
    } else if (subCategoryType === "beat") {
      const newSubCategory = beat.filter((item: SubCategory[]) => item.id !== id);
      setBeat(newSubCategory);
    } else if (subCategoryType === "response") {
      const newSubCategory = response.filter((item: SubCategory[]) => item.id !== id);
      setResponse(newSubCategory);
    } else if (subCategoryType === "jigeiko") {
      const newSubCategory = jigeiko.filter((item: SubCategory[]) => item.id !== id);
      setJigeiko(newSubCategory);
    } else if (subCategoryType === "teacher") {
      const newSubCategory = teacher.filter((item: SubCategory[]) => item.id !== id);
      setTeacher(newSubCategory);
    } else if (subCategoryType === "kakari") {
      const newSubCategory = kakari.filter((item: SubCategory[]) => item.id !== id);
      setKakari(newSubCategory);
    } else if (subCategoryType === "target") {
      const newSubCategory = target.filter((item: SubCategory[]) => item.id !== id);
      setTarget(newSubCategory);
    }
  };

  const renderSubCategorySubmit = () => {
    if (subCategoryType === "place") {
      const newSubCategories: SubCategory[] = [
        ...place,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setPlace(newSubCategories);
    } else if (subCategoryType === "swing") {
      const newSubCategories: SubCategory[] = [
        ...swing,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setSwing(newSubCategories);
    } else if (subCategoryType === "footwork") {
      const newSubCategories: SubCategory[] = [
        ...footwork,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setFootwork(newSubCategories);
    } else if (subCategoryType === "beat") {
      const newSubCategories: SubCategory[] = [
        ...beat,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setBeat(newSubCategories);
    } else if (subCategoryType === "response") {
      const newSubCategories: SubCategory[] = [
        ...response,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setResponse(newSubCategories);
    } else if (subCategoryType === "jigeiko") {
      const newSubCategories: SubCategory[] = [
        ...jigeiko,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setJigeiko(newSubCategories);
    } else if (subCategoryType === "teacher") {
      const newSubCategories: SubCategory[] = [
        ...teacher,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setTeacher(newSubCategories);
    } else if (subCategoryType === "kakari") {
      const newSubCategories: SubCategory[] = [
        ...kakari,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setKakari(newSubCategories);
    } else if (subCategoryType === "target") {
      const newSubCategories: SubCategory[] = [
        ...target,
        {
          text: currentText,
          id: uuid.v4(),
        } as SubCategory,
      ];
      setTarget(newSubCategories);
    }
  };

  const renderSubCategoryData = () => {
    if (subCategoryType === "place") {
      place;
    } else if (subCategoryType === "swing") {
      swing;
    } else if (subCategoryType === "footwork") {
      footwork;
    } else if (subCategoryType === "beat") {
      beat;
    } else if (subCategoryType === "response") {
      response;
    } else if (subCategoryType === "jigeiko") {
      jigeiko;
    } else if (subCategoryType === "teacher") {
      teacher;
    } else if (subCategoryType === "kakari") {
      kakari;
    } else if (subCategoryType === "target") {
      target;
    }
  };

  // フォームの表示
  const [visible, setVisible] = useState(false);

  // 項目消去
  const onPressDelete = (id: string) => {
    {
      renderSubCategoryDelete();
    }
  };

  // フォームの文字が変更されたときに呼ばれます
  const [currentText, setCurrentText] = useState<string>("");
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };

  // 項目登録
  const onPressSubmit = () => {
    {
      renderSubCategorySubmit;
    }
    setCurrentText("");
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
          onPressSave();
          // TODO: ここでreduxにdispatchする
        }}
      />

      {/* フォーム入力後に表示される練習項目 */}
      <SwipeItem
        subCategories={renderSubCategoryData()}
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
