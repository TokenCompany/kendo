import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import dayjs from "dayjs";

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
  console.log(allData[2022].luis.times);
  
  return (
    <React.Fragment>
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
      <Text>test</Text>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  yearWrap: {
    marginTop: 30,
    flex: 1,
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
