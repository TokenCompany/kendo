import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import { ItemInputForm } from "../components/ItemInputForm";
import { SwipeItem } from "../components/SwipeItem";
import uuid from "react-native-uuid";

type Props = NativeStackScreenProps<MainStackParamList, "SubCategory">;

export type Place = {
  text: string;
  id: string; // uuid
};

// export const SubCategoryScreen: React.FC<Props> = ({}: Props) => {
export const SubCategoryScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const subCategoryType = route.params;
  const [visible, setVisible] = useState(false);

  const { currentPlace, Place, setPlace, setCurrentPlace } = useSubCategory();
  // 小項目の出し分け
  const renderSubCategoryEditor = () => {
    if (subCategoryType === "place") {
      // 項目消去
      const onPressDelete = (id: string) => {
        const newSubCategory = Place.filter((item) => item.id !== id);
        setPlace(newSubCategory);
      };
      // 項目入力
      const onChangePlace = (text: string) => {
        setCurrentPlace(text);
      };
      // 項目登録
      const onPressSubmit = () => {
        const newSubCategories: Place[] = [
          ...Place,
          {
            text: currentPlace,
            id: uuid.v4(),
          } as Place,
        ];
        setPlace(newSubCategories);
        setCurrentPlace("");
      };
      return (
        <View style={styles.container}>
          <View style={styles.MajorTitle}>
            {/* TODO: subCategoryTypeによって文字を切り替える  */}
            <Text style={styles.MajorText}>稽古場所</Text>
            <FAB style={styles.fab} small icon="plus" onPress={() => setVisible(true)} />
          </View>

          {/* プラスボタン押したら出でくるフォーム */}
          <ItemInputForm
            text={currentPlace}
            visible={visible}
            onChangeText={(text) => {
              onChangePlace(text);
            }}
            onPressSubmit={() => {
              onPressSubmit();
              setVisible(false);
              // TODO: ここでreduxにdispatchする
            }}
          />

          {/* フォーム入力後に表示される練習項目 */}
          <SwipeItem
            subCategories={Place}
            onPressDelete={(id: string) => {
              onPressDelete(id);
            }}
          />
        </View>
      );
    } else if (subCategoryType === "swing") {
      return <View>素振り</View>;
    } else if (subCategoryType === "footwork") {
      return <View>足さばき</View>;
    } else if (subCategoryType === "beat") {
      return <View>基本打ち</View>;
    } else if (subCategoryType === "response") {
      return <View>応じ技</View>;
    } else if (subCategoryType === "jigeiko") {
      return <View>地稽古</View>;
    } else if (subCategoryType === "teacher") {
      return <View>先生との稽古</View>;
    } else if (subCategoryType === "kakari") {
      return <View>掛稽古</View>;
    } else if (subCategoryType === "target") {
      return <View>年間稽古目標</View>;
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {renderSubCategoryEditor()}
      </View>
    );
  };

  // 項目消去
  // const onPressDelete = (id: string) => {
  //   const newSubCategory = subCategories.filter((item) => item.id !== id);
  //   setSubCategories(newSubCategory);
  // };

  // 項目入力
  // const onChangeText = (text: string) => {
  //   setCurrentText(text);
  // };

  // 項目登録
  // const onPressSubmit = () => {
  //   const newSubCategories: SubCategory[] = [
  //     ...subCategories,
  //     {
  //       text: currentText,
  //       id: uuid.v4(),
  //     } as SubCategory,
  //   ];
  //   setSubCategories(newSubCategories);
  //   setCurrentText("");
  // TODO: reduxに保存
  // TODO: subCategoryTypeによってredux保存先を切り替える
  // };

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.MajorTitle}>
  {
    /* TODO: subCategoryTypeによって文字を切り替える  */
  }
  {
    /* <Text style={styles.MajorText}>応じ技</Text>
        <FAB style={styles.fab} small icon="plus" onPress={() => setVisible(true)} />
      </View> */
  }

  {
    /* プラスボタン押したら出でくるフォーム */
  }
  {
    /* <ItemInputForm
        text={currentText}
        visible={visible}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        onPressSubmit={() => {
          onPressSubmit();
          setVisible(false); */
  }
  // TODO: ここでreduxにdispatchする
  //   }}
  // />

  {
    /* フォーム入力後に表示される練習項目 */
  }
  //     <SwipeItem
  //       subCategories={subCategories}
  //       onPressDelete={(id: string) => {
  //         onPressDelete(id);
  //       }}
  //     />
  //   </View>
  // );
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
