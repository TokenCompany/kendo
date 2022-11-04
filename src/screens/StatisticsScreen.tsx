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
        times:100,
        goal:150,
      },
      tanaka:{
        times:20,
        goal:50,
      },
      luis:{
        times:50,
        goal:50,
      },
      megu:{
        times:30,
        goal:50,
      },
    },
  };
  // 一番上のグラフのデータ
  let mainData:any = [];
  // それ以降のグラフのデータ
  let subData:any = [];
  // 関数の定義
  let setData = (yearData:any,data:any,teacherData:any)=>{
    for (const key in yearData) {
      let LabelNum:any = [];
      if (key === 'all') {
        data.push({ value:0, frontColor: "#61A68A", label: "稽古回数", topLabelComponent: () => (
          <Text style={{color: '#000', fontSize: 12, marginBottom: 6}}>{LabelNum[0]}</Text>
        ) },{ value: 0, frontColor: "#61A68A", label: "稽古目標", topLabelComponent: () => (
          <Text style={{color: '#000', fontSize: 12, marginBottom: 6}}>{LabelNum[1]}</Text>
        ), });
        for (const k in yearData[key]) {
          if (k === 'goal') {
            data[1].value = yearData[key][k]; 
            LabelNum[1] = yearData[key][k];
          }else if (k === 'times') {
            data[0].value = yearData[key][k]; 
            LabelNum[0] = yearData[key][k];
          }
        }
      }else{
        let array:any = [];
        for (const k in yearData[key]) {
          let obj:any = {};
          if (k === 'goal') {
            obj = { value:0, frontColor: "#A53010", label: key, topLabelComponent: () => (
              <Text style={{color: '#000', fontSize: 12, marginBottom: 6}}>{yearData[key][k]}</Text>
            ), }
            obj.value = yearData[key][k]; 
          }else if (k === 'times') {
            obj = { value: 0, frontColor: "#DE7E18",barStyle: { marginLeft: -20 }, topLabelComponent: () => (
              <Text style={{color: '#000', fontSize: 12, marginTop:-30}}>{yearData[key][k]}</Text>
            ), }
            obj.value = yearData[key][k]; 
          }
          array.push(obj);
        }
        teacherData.push(array[1]);
        teacherData.push(array[0]);
      }
    }
  }
  setData(allData[currentDate.year()],mainData,subData);
  
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
        <View style={styles.barWrap}>
          <BarChart data={mainData} horizontal rulesType='solid' initialSpacing={20} noOfSections={3} />
          <BarChart data={subData} horizontal rulesType='solid' yAxisAtTop noOfSections={3} />
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
    marginTop:10,
  },
  barWrap: {
    marginTop: 100,
  }
});
