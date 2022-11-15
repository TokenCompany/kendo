import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView, Alert,KeyboardAvoidingView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";
import { addTargetCategory } from "../store/subCategorySlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Button } from "../components/Button";
import dayjs from "dayjs";

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;
export type SubCategory = {
  id: string;
  text: string;
  times: number;
};


export const TrainingEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  // reduxからデータの取得
  const subCategoryData: any = useSelector((state: RootState) => state.subCategory);
  console.log(subCategoryData);
  
  // reduxのデータにtimesのキー名追加
  let initSubCategory = [...subCategoryData.teacherSubCategories];
  initSubCategory.forEach((element)=>{
    element.times = 0;
  }) 
  // refの定義
  const scrollViewRef = useRef<ScrollView>(null);
  // stateの定義
  const [currentTargets, setCurrentTargets] = useState<SubCategory[]>(initSubCategory);
  const [currentYear, setCurrentDate] = useState(dayjs().year());
  const [show, setShow] = useState(false);
  const [currentYearGoal, setCurrentYearGoal] = useState<number>(0);
  // 各先生の値とindex番号を取得することによってcurrentTargets配列の中の値を更新
  const onChangeCountByTeacher = (count:number, index:number) => {
    const newCurrentTargets = [...currentTargets];
    newCurrentTargets[index].times = count;
    setCurrentTargets(newCurrentTargets)
  }

  const onPressPlace = () => {
    navigation.navigate("SubCategory", {
      // 遷移先にどの小項目を編集したいかを渡す
      subCategoryType: "placeSubCategories", // 地稽古の小項目設定に遷移するとき
    });
  };
  const onPressSwing = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "suburiSubCategories",
    });
  };
  const onPressFootwork = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "ashiSabakiSubCategories",
    });
  };
  const onPressBeat = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "kihonUchiSubCategories",
    });
  };
  const onPressResponse = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "oujiwazaSubCategories",
    });
  };
  const onPressJigeiko = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "jigeikoSubCategories",
    });
  };
  const onPressTeacher = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "teacherSubCategories",
    });
  };
  const onPressKakari = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "kakarigeikoSubCategories",
    });
  };
  // 年間目標の入力UIが出てから自動スクロールさせるための記述
  const goToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  };
  const onPressTarget = () => {
    showTargetSetting();
  };

  // 合計数を出すための関数
  const sumAllYearGoal = (num: string) => {
    // setCurrentYearGoal(text);
  };

  const showTargetSetting = () => {
    setShow(true);
  };

  const onPressTargetSubmit = () => {
    if (Number(currentYearGoal) > 365) {
       // アラートの記述追加
       Alert.alert("登録された内容が1年の制限を超えています。", "もう一度入力し直してください", [
        {text: "戻る",}
      ]);
    }else{
      console.log(currentTargets);
    }
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} ref={scrollViewRef}>
        <View style={styles.buttonContainer}>
          <MajorItem text="稽古場所" onPress={onPressPlace} />
          <MajorItem text="素振り" onPress={onPressSwing} />
          <MajorItem text="足さばき" onPress={onPressFootwork} />
          <MajorItem text="基本打ち" onPress={onPressBeat} />
          <MajorItem text="応じ技" onPress={onPressResponse} />
          <MajorItem text="地稽古" onPress={onPressJigeiko} />
          <MajorItem text="先生との稽古" onPress={onPressTeacher} />
          <MajorItem text="掛稽古" onPress={onPressKakari} />
          <MajorItem
            text="年間稽古目標"
            onPress={() => {
              onPressTarget();
              setTimeout(goToBottom, 100);
            }}
          />

          {show && (
            <KeyboardAvoidingView  behavior="padding">
              <View style={styles.objectiveContainer}>
                <Text style={styles.objectiveLabel}>年間稽古目標</Text>
                <View style={styles.objectiveInputArea}>
                  <Text style={styles.objectiveText}>合計</Text>
                  <Text style={styles.objectiveAll}>{currentYearGoal}</Text>
                  <Text style={styles.objectiveText}>回</Text>
                </View>
                {currentTargets.map((currentTarget: any, index:number) => {
                  return (
                    <View style={styles.objectiveInputArea}>
                      <Text style={styles.objectiveText}>{currentTarget.text}先生</Text>
                      <TextInput
                        style={styles.objectiveInput}
                        keyboardType="numeric"
                        onChangeText={(count)=>{
                          onChangeCountByTeacher(Number(count),index);
                        }}
                        // value={currentTarget[index].times}
                        key={index}
                      ></TextInput>
                      <Text style={styles.objectiveText}>回</Text>
                    </View>
                  );
                })}
                <View style={styles.submitButtonContainer}>
                  <Button text="目標登録" onPress={()=>{
                    onPressTargetSubmit()
                  }} />
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: 40,
  },
  scrollContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  objectiveContainer: {
    marginTop: 30,
    marginBottom: 20,
    // flex:3,
    // paddingRight: 60,
  },
  objectiveLabel: {
    fontSize: 18,
    color: "#000",
  },
  objectiveInputArea: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  objectiveInput: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
  objectiveAll: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  objectiveText: {
    fontSize: 18,
  },
  submitButtonContainer: {
    marginTop: 20,
    width: '100%',
    // height: '30%',
    // justifyContent: 'center',
    alignItems: 'center'
  }
});
