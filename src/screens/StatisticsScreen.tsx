import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity ,ScrollView} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from "dayjs";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

type Props = NativeStackScreenProps<MainStackParamList, "Statistics">;

export const StatisticsScreen: React.FC<Props> = ({}: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const allData = {
    2020:{
      all:{
        times:10
      }
    },
    2021:{
      all:{
        times:20,
        goal:15,
      },
      tanaka:{
        times:8,
        goal:5,
      },
      luis:{
        times:8,
        goal:5,
      },
      megu:{
        times:4,
        goal:5,
      },
    },
    2022:{
      all:{
        times:10,
        goal:15,
      },
      tanaka:{
        times:2,
        goal:5,
      },
      luis:{
        times:5,
        goal:5,
      },
      megu:{
        times:3,
        goal:5,
      },
    },
  };
  // 一番上のグラフのデータ
  let passData = [{ value: 0, frontColor: "#5d99c6", label: "稽古回数" },{ value: 0, frontColor: "#f48fb1", label: "稽古回数" }];
  let passData2 = [{ value: 0, frontColor: "#5d99c6", label: "稽古回数" },{ value: 0, frontColor: "#f48fb1", label: "稽古回数" }];
  let passData3 = [{ value: 0, frontColor: "#5d99c6", label: "稽古回数" },{ value: 0, frontColor: "#f48fb1", label: "稽古回数" }];
  // 関数の定義
  let setData = (yearData,data)=>{
    
    for (const key in yearData) {
      if (key === 'goal') {
        data[1].value = yearData[key]
      }else if (key === 'times') {
        data[0].value = yearData[key]
      }
    }
  }
  // 関数の実行
  // ①
  setData(allData[currentDate.year()].all,passData);
  // ②
  setData(allData[currentDate.year()].tanaka,passData2);
  // ③
  setData(allData[currentDate.year()].luis,passData3);
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
          ></TouchableOpacity>
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
          ></TouchableOpacity>
        </View>
        <View style={{ margin: 30 }}>
          <BarChart data={passData} horizontal noOfSections={3} />
          <BarChart data={passData2} horizontal noOfSections={3} />
          <BarChart data={passData3} horizontal noOfSections={3} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  yearWrap: {
    marginTop: 30,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  yearArrow: {
    width: 10,
    height: 10,
    borderColor: "#A53010",
    borderTopWidth: 3,
    borderLeftWidth: 3,
    marginTop: 10,
  },
  yearText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    height: 30,
  },
});
