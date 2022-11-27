import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from "dayjs";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "Statistics">;

export const StatisticsScreen: React.FC<Props> = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  // reduxからサブカテゴリ―ズの情報を取得
  const allData = useSelector((state: RootState) => state.subCategory.targetSubCategories);
  console.log(allData);
  
  const allDatas = {
    2020: {
      all: {
        times: 10,
      },
    },
    2021: {
      all: {
        times: 20,
        goal: 15,
      },
      tanaka: {
        times: 8,
        goal: 5,
      },
      luis: {
        times: 8,
        goal: 5,
      },
      megu: {
        times: 4,
        goal: 5,
      },
    },
    2022: {
      all: {
        times: 100,
        goal: 150,
      },
      tanaka: {
        times: 20,
        goal: 50,
      },
      luis: {
        times: 50,
        goal: 50,
      },
      megu: {
        times: 30,
        goal: 50,
      },
    },
  };
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
            value: element.result,
            frontColor: "#61A68A",
            label: "稽古回数",
            topLabelComponent: () => (
              <Text style={{ color: "#000", fontSize: 12, marginBottom: 6 }}>{LabelNum[0]}</Text>
            ),
          },
          {
            value: element.goal,
            frontColor: "#61A68A",
            label: "稽古目標",
            topLabelComponent: () => (
              <Text style={{ color: "#000", fontSize: 12, marginBottom: 6 }}>{LabelNum[1]}</Text>
            ),
          },
        );
      } else {
        teacherData.push(
          {
            value: element.goal,
            frontColor: "#A53010",
            label: element.text,
            topLabelComponent: () => (
              <Text style={{ color: "#000", fontSize: 12, marginBottom: 6 }}>
                {element.goal}
              </Text>
            ),
          },
          {
            value: element.result,
            frontColor: "#DE7E18",
            barStyle: { marginLeft: -20 },
            topLabelComponent: () => (
              <Text style={{ color: "#000", fontSize: 12, marginTop: -30 }}>
                {element.result}
              </Text>
            ),
          }
        )
      }
    }
  };
  if (currentDate.year().toString() in allData) {
    setData(allData[currentDate.year()], mainData, subData);
  }
  
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
            }}
          />
          <Text style={styles.yearText}>{currentDate.year()}年</Text>
          <TouchableOpacity
            style={[
              styles.yearArrow,
              {
                transform: [{ rotate: "135deg" }],
              },
            ]}
            onPress={() => {
              setCurrentDate(currentDate.add(1, "year"));
            }}
          />
        </View>
        <View style={styles.barWrap}>
          <BarChart
            data={mainData}
            horizontal
            rulesType="solid"
            initialSpacing={20}
            noOfSections={3}
          />
          <BarChart data={subData} horizontal rulesType="solid" yAxisAtTop noOfSections={3} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearWrap: {
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
  barWrap: {
    marginTop: 50,
    paddingLeft: "20%",
  },
});
