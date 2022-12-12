import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from "dayjs";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DropDownPicker from "react-native-dropdown-picker";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";

type Props = NativeStackScreenProps<MainStackParamList, "Statistics">;

export const StatisticsScreen: React.FC<Props> = ({}: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;

  const [currentDate, setCurrentDate] = useState(dayjs());
  // reduxからサブカテゴリ―ズの情報を取得
  const allData = useSelector((state: RootState) => state.subCategory.targetSubCategories);

  // 一番上のグラフのデータ
  let mainData: any = [];
  // それ以降のグラフのデータ
  let subData: any = [];
  // 関数の定義
  let setData = (yearData: any, data: any, teacherData: any) => {
    for (const element of yearData) {
      let LabelNum: any = [];
      if (element.id === "all") {
        data.push(
          {
            value: element.goal,
            frontColor: "#61A68A",
            label: `${i18n.t("Statistics.label02")}`,
            topLabelComponent: () => (
              <Text style={{ color: "#000", fontSize: 12, marginBottom: 6 }}>{element.goal}</Text>
            ),
          },
          {
            value: element.result,
            frontColor: "#61A68A",
            label: `${i18n.t("Statistics.label01")}`,
            topLabelComponent: () => (
              <Text style={{ color: "#000", fontSize: 12, marginBottom: 6 }}>{element.result}</Text>
            ),
          },
        );
      } else {
        teacherData.push(
          {
            value: element.goal,
            frontColor: "#A53010",
            label: element.text + `${i18n.t("ResultEdit.teacher")}`,
          },
          {
            value: element.result,
            frontColor: "#DE7E18",
            barStyle: { marginLeft: -20 },
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
              dropDownContainerStyle={{ backgroundColor: "#fff" }}
              activeItemStyle={{ alignItems: "center" }}
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
            rulesType="solid"
            initialSpacing={20}
            noOfSections={3}
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
            noOfSections={3}
            labelsExtraHeight={100}
            labelWidth={70}
            xAxisLabelTextStyle={{
              transform: [{ translateX: -5 }],
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
    marginTop: 30,
    marginLeft: "30%",
  },
  subBarWrap: {
    marginTop: -30,
    marginLeft: 10,
  },
});
