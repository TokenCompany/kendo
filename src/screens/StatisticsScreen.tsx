import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from "dayjs";
import { BarChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = NativeStackScreenProps<MainStackParamList, "Statistics">;

export const StatisticsScreen: React.FC<Props> = ({}: Props) => {
  const { currentLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const [currentDate, setCurrentDate] = useState(dayjs());
  // reduxからサブカテゴリ―ズの情報を取得
  const allData = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  let minAxisValue = 5;
  const getMaxValue = () => {
    let scaleBuffer = 1.1;
    let allMaxArray: number[] = [];
    let teacherMaxArray: number[] = [];
    if (currentDate.year().toString() in allData) {
      allData[currentDate.year().toString()].forEach((element: any) => {
        if (element.id === "all") {
          allMaxArray.push(element.goal);
          allMaxArray.push(element.result);
        } else {
          teacherMaxArray.push(element.goal);
          teacherMaxArray.push(element.result);
        }
      });
    }
    let allMax = Math.max(...allMaxArray) * scaleBuffer;
    let teacherMax = Math.max(...teacherMaxArray);
    // 値が小さすぎるか確認
    if (allMax < minAxisValue) {
      allMax = minAxisValue;
    }
    if (teacherMax < minAxisValue) {
      teacherMax = minAxisValue;
    }
    // スケールを5で割り切れるように調整
    if (allMax % minAxisValue !== 0) {
      allMax = Math.ceil(allMax / 10) * 10;
    }
    if (teacherMax % minAxisValue !== 0) {
      teacherMax = Math.ceil(teacherMax / 10) * 10;
    }

    return [allMax, teacherMax];
  };
  let maxValues = getMaxValue();

  // 一番上のグラフのデータ
  let mainData: any = [];
  // それ以降のグラフのデータ
  let subData: any = [];
  // 関数の定義
  let setData = (yearData: any, data: any, teacherData: any) => {
    for (const element of yearData) {
      // let LabelNum: any = [];
      if (element.id === "all") {
        data.push(
          {
            value: element.goal,
            frontColor: "#61A68A",
            label: `${i18n.t("Statistics.label02")}`,
            // eslint-disable-next-line react/no-unstable-nested-components
            topLabelComponent: () => <Text style={styles.labelTextStyle1}>{element.goal}</Text>,
          },
          {
            value: element.result,
            frontColor: "#61A68A",
            label: `${i18n.t("Statistics.label01")}`,
            // eslint-disable-next-line react/no-unstable-nested-components
            topLabelComponent: () => <Text style={styles.labelTextStyle1}>{element.result}</Text>,
          },
        );
      } else {
        teacherData.push(
          {
            value: element.goal,
            frontColor: "#A53010",
            barStyle: { marginLeft: -15 },
            label: element.text + `${i18n.t("ResultEdit.teacher")}`,
            // eslint-disable-next-line react/no-unstable-nested-components
            topLabelComponent: () => <Text style={styles.labelTextStyle2}>{element.goal}</Text>,
          },
          {
            value: element.result,
            frontColor: "#DE7E18",
            barStyle: { marginLeft: -35 },
            // eslint-disable-next-line react/no-unstable-nested-components
            topLabelComponent: () => <Text style={styles.labelTextStyle3}>{element.result}</Text>,
          },
        );
      }
    }
  };
  if (currentDate.year().toString() in allData) {
    setData(allData[currentDate.year().toString()], mainData, subData);
  }

  const dates = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  let dateItems = [];
  for (const key in dates) {
    dateItems.push({
      label: `${key}` + `${i18n.t("Statistics.year")}`,
      value: dayjs(key),
    });
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(dayjs());
  const [items, setItems] = useState<any>(dateItems);
  const onChangeValue = (value: any) => {
    setCurrentDate(value);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.yearWrap}>
          <TouchableOpacity
            style={[
              styles.yearArrow,
              {
                transform: [{ rotate: "-45deg" }],
              },
            ]}
            onPress={() => {
              setCurrentDate(currentDate.add(-1, "year"));
              setValue(value.add(-1, "year"));
            }}
          />
          <Text style={styles.yearText}>
            {currentDate.year()}
            {i18n.t("Statistics.year")}
          </Text>
          <View style={styles.scrollWrap}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              maxHeight={300}
              zIndex={1000}
              labelStyle={{
                color: "transparent",
              }}
              containerStyle={{ height: 40, width: 150 }}
              style={{ backgroundColor: "transparent", borderWidth: 0 }}
              dropDownContainerStyle={{ backgroundColor: "#ffffff" }}
              onChangeValue={(value: any) => {
                onChangeValue(value);
              }}
              placeholder={`${currentDate.year().toString()}` + `${i18n.t("Statistics.year")}`}
              placeholderStyle={{
                color: "transparent",
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.yearArrow,
              {
                transform: [{ rotate: "135deg" }],
              },
            ]}
            onPress={() => {
              setCurrentDate(currentDate.add(1, "year"));
              setValue(value.add(1, "year"));
            }}
          />
        </View>
        <View style={styles.MainBarWrap}>
          <BarChart
            data={mainData}
            horizontal
            maxValue={isNaN(Number(maxValues[0])) ? 5 : Number(maxValues[0])}
            rulesType="solid"
            initialSpacing={20}
            noOfSections={5}
            xAxisLabelTextStyle={{
              transform: [{ translateX: -15 }, { translateY: -10 }],
            }}
            yAxisTextStyle={{
              transform: [{ rotate: "-90deg" }],
            }}
            labelWidth={50}
          />
        </View>
        <View style={styles.subBarWrap}>
          <BarChart
            data={subData}
            rulesType="solid"
            maxValue={isNaN(Number(maxValues[1])) ? 5 : Number(maxValues[1])}
            noOfSections={5}
            labelsExtraHeight={100}
            labelWidth={70}
            xAxisLabelTextStyle={{
              transform: [{ translateX: -5 }],
            //先生との稽古目標グラフの縦棒グラフバージョンのバックアップ
            /*      horizontal
            maxValue={isNaN(Number(maxValues[1])) ? 5 : Number(maxValues[1])}
            rulesType="solid"
            noOfSections={5}
            labelWidth={70}
            xAxisLabelTextStyle={{
              transform: [{ translateX: -5 }, { translateY: -17 }],
            }}
            yAxisTextStyle={{
              transform: [{ rotate: "-90deg" }], */
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollWrap: {
    position: "absolute",
    right: "27%",
    top: "-5%",
  },
  yearWrap: {
    zIndex: 1000,
    marginTop: 30,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  yearArrow: {
    width: 18,
    height: 18,
    borderColor: "#A53010",
    borderTopWidth: 5,
    borderLeftWidth: 5,
    marginTop: 10,
  },
  yearText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    height: 30,
    marginTop: 10,
  },
  MainBarWrap: {
    zIndex: -100,
    marginRight: "100%",
    transform: [{ translateX: 220 }, { translateY: -100 }],
  },
  subBarWrap: {
    //marginTop: 50,
    //marginLeft: 10,
    marginTop: -30,
    marginLeft: 10,
  },
  /*labelTextStyle1: {
    fontSize: 12,
    marginBottom: 6,
  },
  labelTextStyle2: {
    fontSize: 12,
    transform: [{ translateY: -15 }],
  },
  labelTextStyle3: {
    fontSize: 12,
    transform: [{ translateY: -35 }],
  }, */
});
