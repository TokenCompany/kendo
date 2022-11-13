import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import { ItemInputForm } from "../components/ItemInputForm";
import { SwipeItem } from "../components/SwipeItem";
import uuid from "react-native-uuid";
import { addSubCategory, deleteSubCategory } from "../store/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "SubCategory">;

export type SubCategory = {
  mainCategoryName: string;
  id: string;
  text: string;
};

export const SubCategoryScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const subCategoryData: any = useSelector((state: RootState) => state.subCategory);
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const subCategoryType = route.params.subCategoryType;
  // 登録できる数をsubCategoryTypeで制限
  const max = subCategoryType == "placeSubCategories" ? 5 - 1: 30 -1;
  console.log(max);
   
  // 小項目の出し分け
  const renderSubCategoryEditor = () => {
    if (subCategoryType === "placeSubCategories") {
      return <Text style={styles.MajorText}>稽古場所</Text>;
    } else if (subCategoryType === "suburiSubCategories") {
      return <Text style={styles.MajorText}>素振り</Text>;
    } else if (subCategoryType === "ashiSabakiSubCategories") {
      return <Text style={styles.MajorText}>足さばき</Text>;
    } else if (subCategoryType === "kihonUchiSubCategories") {
      return <Text style={styles.MajorText}>基本打ち</Text>;
    } else if (subCategoryType === "oujiwazaSubCategories") {
      return <Text style={styles.MajorText}>応じ技</Text>;
    } else if (subCategoryType === "jigeikoSubCategories") {
      return <Text style={styles.MajorText}>地稽古</Text>;
    } else if (subCategoryType === "teacherSubCategories") {
      return <Text style={styles.MajorText}>先生との稽古</Text>;
    } else if (subCategoryType === "kakarigeikoSubCategories") {
      return <Text style={styles.MajorText}>掛稽古</Text>;
    }
  };
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState<string>("");
  // REDUXの中身を取り出して表示
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    subCategoryData[subCategoryType],
  );
  const [plusButton,setPlussButton] = useState(()=>{
    if (subCategories.length > max) {
      return styles.offFab;
    }else{
      return styles.fab;
    }
  })
  // 項目消去
  const onPressDelete = (id: string, mainCategoryName: string) => {
    const newSubCategory: SubCategory[] = subCategories.filter((item) => item.id !== id);
    const deleteObj = {
      categoryName: mainCategoryName,
      id: id,
    };
    dispatch(deleteSubCategory(deleteObj));
    if (newSubCategory.length > max) {
      setPlussButton(styles.offFab)
    }else{
      setPlussButton(styles.fab)
    }
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
        mainCategoryName: subCategoryType,
        text: currentText,
        id: uuid.v4().toString(),
      } as SubCategory,
    ];
    setSubCategories(newSubCategories);
    setCurrentText("");
    // 一番最後(最新)のものを取得
    let lastNum: number = newSubCategories.length - 1;
    // TODO: reduxに保存,newSubCategoriesのmainCategoryNameによってredux保存先を切り替える
    dispatch(addSubCategory(newSubCategories[lastNum]));
    // TODO:
  };

  return (
    <View style={styles.container}>
      <View style={styles.MajorTitle}>
        {renderSubCategoryEditor()}
        <FAB style={plusButton} small icon="plus" onPress={() => {
    
          if (subCategories.length > max) {
            setVisible(false);
            setPlussButton(styles.offFab)
          }else{
            setVisible(true);
            setPlussButton(styles.fab)
          }
          }} />
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
    
          if (subCategories.length > max) {
            setPlussButton(styles.offFab);
          } else {
            setPlussButton(styles.fab);
          }
          setVisible(false);
        }}
      />

      {/* フォーム入力後に表示される練習項目 */}
      <SwipeItem
        subCategories={subCategories}
        onPressDelete={(id: string, mainCategoryName: string) => {
          onPressDelete(id, subCategoryType);
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
  offFab: {
    position: "absolute",
    right: 0,
    backgroundColor: "grey",
    color: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  }
});
