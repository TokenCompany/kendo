import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-community/picker";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
  textTraining: string;
  textTrainingUnit: string;
  textTrainingCategories: string;
  reservedPlace: string;
  newPlaceJudge: boolean;
  onChangeSendInput: (changedResults: SubCategories[], mainCategory: string) => void;
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
}) => {
  // 既に実績を入力した場合にvaluesに表示をする
  const resultsData = useSelector((state: RootState) => state.results);
  let initValues: string[] = [];
  if (resultsDate in resultsData) {
    for (const result of resultsData[resultsDate][textTrainingCategories]) {
      initValues.push(result.result);
    }
  }

  const [values, setValues] = useState<string[]>(initValues);
  // const [directValue, setDirectValue] = useState<string>("");
  // ローカルのstateでinputの入力情報を保持
  const onChangeValues = (text: string, index: number) => {
    let newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const subCategories = useSelector((state: RootState) => state.subCategory);
  // reduxからの情報を複製し、設定小項目を表示するために活用
  const initResults = JSON.parse(JSON.stringify(subCategories));
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
    onChangeSendInput(newResults[mainCategory], mainCategory,checked);
  };

  // サブカテゴリ―によって出すinput形式を変更
  let input1: boolean = false;
  let input2: boolean = false;
  let input3: boolean = false;
  // 地稽古、掛稽古サブカテゴリ―がない時に表示させないための記述
  let specialCategory: boolean = true;
  // let specialCategory: boolean = subCategories[textTrainingCategories].length
  if (
    textTrainingCategories in subCategories &&
    subCategories[textTrainingCategories].length === 0
  ) {
    specialCategory = false;
  }

  if (textTraining === "稽古場所") {
    input3 = true;
  } else if (textTraining === "地稽古" || textTraining === "掛稽古") {
    input2 = true;
  } else {
    input1 = true;
  }

  let subCategoriesData: any = [];

  // subcategoriesに登録がない稽古時間の条件分岐
  if (textTrainingCategories in initResults) {
    for (const data of initResults[textTrainingCategories as keyof Results]) {
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

  // 稽古場所の入力
  const places = useSelector((state: RootState) => state.subCategory.placeSubCategories);
  let initItems = [];
  for (const place of places) {
    initItems.push({
      label: place.text,
      value: place.text,
    });
  }

  const showForm = () => {
    setForm(true);
  };
  initItems.push({ label: "直接入力", value: showForm });

  const [form, setForm] = useState(true);
  const [items, setItems] = useState(initItems);
  const [open, setOpen] = useState(false);
  const [newPlaceFlag, setNewPlaceFlag] = useState<boolean>(false);
  const [value, setValue] = useState<string>(reservedPlace);
  const [place, setPlace] = useState<string>(reservedPlace);
  const onChangeValue = () => {
    setPlace(value);
    if (value !== showForm.toString()) {
      setForm(false);
    }
  };

  console.log(initItems);


  if (input1 === true) {
    return (
    <View style={styles.inputWrap}>
      <View style={styles.check}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.label}>{textTraining}</Text>
        {!!checked && (
          <View>
            <View>
                {subCategoriesData.map((data: any, index: number) => (
                  <View style={styles.inputGroup} key={index}>
                    <Text style={styles.inputText}>{data.text}</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        onChangeCountResults(Number(text), data.id, data.mainCategory);
                        onChangeValues(text, index);
                      }}
                      value={values[index]}
                    />
                    <Text style={styles.inputText}>{textTrainingUnit}</Text>
                  </View>
                ))}
              </View>
          </View>
        )}
      </View>
    </View>
    )
  }
  if (input2 === true) {
    return(
    <View style={styles.inputWrap}>
      <View style={styles.check}>
        <Checkbox
          status={checked2 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked2(!checked);
          }}
        />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.label}>{textTraining}</Text>
        {!!checked2 &&
          subCategoriesData.map((data: any, index: number) => (
          <View style={styles.inputGroup} key={index}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => {
                onChangeCountResults(Number(text), data.id, data.mainCategory);
                onChangeValues(text, index);
              }}
              value={values[index]}
            />
            <Text style={styles.inputText}>{textTrainingUnit}</Text>
          </View>
        ))}
      </View>
    </View>
    )
  }
  if (input3 === true) {
    return (
      <View style={styles.inputWrap}>
        <View style={styles.check}>
          <Checkbox
            status={checked3 ? "checked" : "unchecked"}
            onPress={() => {
              setChecked3(!checked);
            }}
          />
        </View>
        <View style={styles.inputArea}>
        <Text style={styles.label}>{textTraining}</Text>
          {!!checked3 &&
            <View>
              <View style={styles.inputpicker}>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  open={open}
                  value={value}
                  items={initItems}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  max={6}

                  maxHeight={300}
                  labelStyle={{
                    fontSize: 18,
                    textAlign: "center",
                  }}
                  containerStyle={{backgroundColor: "#fff", height: 50, width: 260, marginTop:20, }}
                  style={{ backgroundColor: "#F4F4F5", borderWidth: 0 }}
                  dropDownContainerStyle={{ backgroundColor: "#fff" }}
                  onChangeValue={onChangeValue}
                  placeholder={place}
                  placeholderStyle={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  activeLabelStyle={{ color: "red" }}
                />
              </View>
              {form && (
                <TextInput
                  style={styles.form}
                  onChangeText={(text) => {
                    setPlace(text);
                    setNewPlaceFlag(true);
                  }}
                />
              )}
            </View>
          }
        </View>
      </View>
    )
  }
}

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
    width: "100%",
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    paddingHorizontal: 5,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  inputpicker: {
    flexGrow: 1,
  },
  form: {
    height: 40,
    width: "79%",
    marginTop: "5%",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    borderRadius: 5,
    paddingHorizontal: 5,
  }
});
