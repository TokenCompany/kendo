import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";
import i18n from "../lang/localization";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = {
  textTraining: string;
  textTrainingUnit: string;
  textTrainingCategories: string;
  reservedPlace: string;
  newPlaceJudge: boolean;
  onChangeSendInput: (changedResults: SubCategories[], mainCategory: string) => void;
  onCheckedSend: (mainCategory: string, judge: boolean) => void;
  resultsDate: any;
};

export type SubCategories = {
  id: string;
  text: string;
  result: number | boolean;
};

export type Results = {
  placeSubCategories: SubCategories[];
  trainingTime: SubCategories[];
  suburiSubCategories: SubCategories[];
  ashiSabakiSubCategories: SubCategories[];
  kihonUchiSubCategories: SubCategories[];
  oujiwazaSubCategories: SubCategories[];
  jigeikoSubCategories: SubCategories[];
  teacherSubCategories: SubCategories[];
  kakarigeikoSubCategories: SubCategories[];
};

export const KeikoTrainingInput: React.FC<Props> = ({
  textTraining,
  textTrainingUnit,
  textTrainingCategories,
  reservedPlace,
  resultsDate,
  newPlaceJudge,
  onChangeSendInput,
  onCheckedSend,
}) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;
  // 既に実績を入力した場合に結果をvaluesに表示をする
  const resultsData: any = useSelector((state: RootState) => state.results);
  const setInitValues = () => {
    let initValues: string[] = [];
    if (resultsDate in resultsData) {
      for (const result of resultsData[resultsDate][textTrainingCategories]) {
        if(result.result)initValues.push(result.result.toString());
      }
    }
    return initValues;
  };

  const [values, setValues] = useState<string[]>(setInitValues());
  const [directValue, setDirectValue] = useState<string>("");
  // ローカルのstateでinputの入力情報を保持
  const onChangeValues = (text: string, index: number) => {
    let newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };

  const confirmCheck = () => {
    let judgeCheck = false;
    if (resultsDate in resultsData) {
      if(resultsData[resultsDate][textTrainingCategories].length !== 0){
        judgeCheck = true;
      }
    }
    return judgeCheck;
  }
  const [checked, setChecked] = useState(confirmCheck);
  const [checked2, setChecked2] = useState(false);
  const [place, setPlace] = useState<string>(reservedPlace);
  const subCategories: any = useSelector((state: RootState) => state.subCategory);
  // reduxからの情報を複製し、設定小項目を表示するために活用
  let initResults = JSON.parse(JSON.stringify(subCategories));
  const [results, setResults] = useState<Results>(initResults);
  // 入力された実績をstateに保存するための関数
  const onChangeCountResults = (count: number, id: string, mainCategory: string) => {
    let newResults: any = { ...results };
    // 時間がsubcategoryの中にないため条件分岐で時間の処理を書いてます。
    if (mainCategory in newResults) {
      for (const subCategory of newResults[mainCategory]) {
        if (subCategory.id === id) {
          subCategory.result = count;
        }
      }
    } else {
      newResults[mainCategory] = [
        {
          id: "none",
          text: "",
          result: count,
        },
      ];
    }
    setResults(newResults);
    onChangeSendInput(newResults[mainCategory], mainCategory);
  };

  // サブカテゴリ―によって出すinput形式を変更
  let input1: boolean = false;
  let input2: boolean = false;
  let input3: boolean = false;
  // 地稽古、掛稽古サブカテゴリ―がない時に表示させないための記述
  let specialCategory: boolean = true;
  if (
    textTrainingCategories in subCategories &&
    subCategories[textTrainingCategories].length === 0
  ) {
    specialCategory = false;
  }

  if (textTraining === `${i18n.t("TrainingEdit.training01")}`) {
    input3 = true;
  } else if (textTraining === `${i18n.t("TrainingEdit.training06")}` || textTraining === `${i18n.t("TrainingEdit.training08")}`) {
    input2 = true;
  } else {
    input1 = true;
  }


  let subCategoriesData: any = [];

  // subcategoriesに登録がない稽古時間の条件分岐
  if (textTrainingCategories in results) {
    for (const data of results[textTrainingCategories as keyof Results]) {
      subCategoriesData.push({
        id: data.id,
        text: data.text,
        mainCategory: textTrainingCategories,
      });
    }
  } else {
    // ここが稽古時間の表示
    subCategoriesData.push({
      id: "none",
      text: "",
      mainCategory: textTrainingCategories,
    });
  }
  // 稽古場所の入力欄表示・非表示をするための変数
  const places = useSelector((state: RootState) => state.subCategory.placeSubCategories);
  const [placeInputSelected, setPlaceInputSelected] = useState<boolean>(false);

  const showForm: any = () => {
    setPlaceInputSelected(true);
  }
  let initItems = [];
  for (const place of places) {
    initItems.push({
      label: place.text,
      value: place.text,
    });
  }
  initItems.push({ label: `${i18n.t("ScheduleScreen.input")}`, value: showForm.toString() });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(`${i18n.t("ScheduleScreen.selectPlace")}`);
  const [items, setItems] = useState(initItems);
  const onSelectItem = (itemIndex: number) => {
    if(itemIndex === items.length -1) {
      setPlaceInputSelected(true);
    } else {
      setPlaceInputSelected(false);
    }
    if (value !== "") {
      let newResults = { ...results };
      for (const place of newResults["placeSubCategories"]) {
        place["result"] = false;
      }
      if (newResults["placeSubCategories"][itemIndex]) {
        newResults["placeSubCategories"][itemIndex]["result"] = true;

      }else{
        newResults["placeSubCategories"].push({
          id: "new",
          result: true,
          text: directValue.toString(),
        });
      }

      setResults(newResults);
    } else {
      setPlaceInputSelected(true);
    }

    setPlace(value.toString());
    onChangeSendInput(results["placeSubCategories"], "placeSubCategories");
  }

  return (
    <View style={styles.inputWrap}>
      <View style={styles.check}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
            onCheckedSend(textTrainingCategories, !checked);
          }}
        />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.label}>{textTraining}</Text>
        {!!checked && (
          <View>
            {!!input1 && (
              <View>
                {subCategoriesData.map((data: any, index: number) => (
                  <View style={styles.inputGroup} key={index}>
                    <Text style={styles.inputText}>{data.text}{data.mainCategory==="teacherSubCategories"?`${i18n.t("Statistics.teacher")}`:""}</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        let result = text.match(/[^0-9]/);
                        if(result){
                          Alert.alert(`${i18n.t("TaskEdit.alert16")}`, "", [
                            { text: `${i18n.t("TaskEdit.back")}` },
                          ]);
                        } else {
                          onChangeCountResults(Number(text), data.id, data.mainCategory);
                          onChangeValues(text, index);
                        }
                      }}
                      value={values[index] ? values[index].toString() : ""}
                    />
                    <Text style={styles.inputText}>{textTrainingUnit}</Text>
                  </View>
                ))}
              </View>
            )}
            {!!input2 && (
              <View>
                <View style={styles.inputGroup}>
                  {!!specialCategory && (
                    <View style={styles.inputGroup}>
                      <View style={styles.checkInside}>
                        <Checkbox
                          status={checked2 ? "checked" : "unchecked"}
                          onPress={() => {
                            setChecked2(!checked2);
                          }}
                        />
                      </View>
                      <Text style={styles.inputText}>{i18n.t("ResultEdit.ari")}</Text>
                    </View>
                  )}
                  {!!checked2 &&
                    subCategoriesData.map((data: any, index: number) => (
                      <View style={styles.inputGroup} key={index}>
                        <TextInput
                          style={styles.input}
                          keyboardType="numeric"
                          onChangeText={(text) => {
                            let result = text.match(/[^0-9]/);
                            if(result){
                              Alert.alert(`${i18n.t("TaskEdit.alert16")}`, "", [
                                { text: `${i18n.t("TaskEdit.back")}` },
                              ]);
                            } else {
                            onChangeCountResults(Number(text), data.id, data.mainCategory);
                            onChangeValues(text, index);
                            }
                          }}
                          value={values[index] ? values[index].toString() : ""}
                        />
                        <Text style={styles.inputText}>{textTrainingUnit}</Text>
                      </View>
                    ))}
                </View>
              </View>
            )}
            {!!input3 && (
              <View>
                <View style={styles.inputpicker}>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  labelStyle={{
                    fontSize: 18,
                    textAlign: "center",
                  }}
                  containerStyle={{ height: 40, width: 260, marginLeft: 10 }}
                  style={{ backgroundColor: "#F4F4F5", borderWidth: 0 }}
                  dropDownContainerStyle={{ backgroundColor: "#fff", height:100 }}
                  onSelectItem={(item: any) => {
                    onSelectItem(items.indexOf(item))
                  }}
                  placeholder={place}
                  placeholderStyle={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                />
                  {placeInputSelected && (
                    <TextInput
                      style={styles.inputFull}
                      onChangeText={(text) => {
                        setDirectValue(text);
                        let newResults = { ...results };
                        for (const place of newResults["placeSubCategories"]) {
                          if(place.id === "new"){
                            place.text = text
                          }
                        }
                        setResults(newResults)
                      }}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },

  inputWrap: {
    margin: 10,
    flexDirection: "row",
  },

  check: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
    marginRight: 10,
    borderColor: "#aaa",
    borderWidth: 1,
  },
  checkInside: {
    height: 35,
    width: 35,
    marginRight: 10,
    borderColor: "#aaa",
    borderWidth: 1,
  },
  inputArea: {
    flex: 1,
    marginTop: 6,
  },

  inputGroup: {
    flexDirection: "row",
  },

  inputText: {
    fontSize: 18,
    color: "#000",
    margin: 5,
    marginTop: 7,
    width: 108,
    zIndex: -10,
  },

  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 5,
  },

  labelWrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: 30,
    width: 54,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    margin: 5,
  },

  inputLarge: {
    height: 30,
    width: 108,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    margin: 5,
  },

  inputFull: {
    height: 30,
    width: "60%",
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 5,
  },
  inputpicker: {
    flexGrow: 1,
    marginBottom:100,
  },
});
