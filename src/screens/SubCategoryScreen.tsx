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
  mainCategoryName:string;
  id:string;
  text: string;
};



export const SubCategoryScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();
  const subCategoryData = useSelector((state: RootState) => state.subCategory);
  // console.log(subCategoryData);
  const mainCategories = {
    placeSubCategories: {
      text:'稽古場所',
      unit:'本'
    },
    suburiSubCategories: {
      text:'素振り',
      unit:'本'
    },
    ashiSabakiSubCategories: {
      text:'足さばき',
      unit:'本'
    },
    kihonUchiSubCategories: {
      text:'基本打ち',
      unit:'本'
    },
    oujiwazaSubCategories: {
      text:'応じ技',
      unit:'本'
    },
    jigeikoSubCategories: {
      text:'地稽古',
      unit:'回'
    },
    teacherSubCategories: {
      text:'先生との稽古',
      unit:'分',
    },
    kakarigeikoSubCategories: {
      text:'掛稽古',
      unit:'分',
    },
    targetSubCategories: {
      text:'目標',
      unit:'回',
    },
  }
  /* 2. Get the param */
  // ここで遷移元から渡されたパラメータを取得する
  const subCategoryType = route.params.subCategoryType;
  
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
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  // 項目消去
  const onPressDelete = (id: string) => {
    // const newSubCategory = subCategories.filter((item) => item.id !== id);
    // setSubCategories(newSubCategory);
  };

  // 項目入力
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };

  // 項目登録
  const onPressSubmit = () => {
    const newSubCategories: SubCategory[] = [{
      mainCategoryName: subCategoryType,
      text: currentText,
      id: uuid.v4().toString(),
      } as SubCategory
    ];
    setSubCategories(newSubCategories);
    setCurrentText("");
    console.log(newSubCategories);
    
    // TODO: reduxに保存
    // console.log(newSubCategories);
    
    // dispatch(addSubCategory(newSubCategories))
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
