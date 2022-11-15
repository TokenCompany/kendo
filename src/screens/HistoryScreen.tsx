import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { CalendarFrame } from "../components/CalendarFrame";
import { TextButton } from "../components/TextButton";
import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "History">;

export const HistoryScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPress = () => {
    navigation.navigate("ResultEdit");
  };

  return (
    <ScrollView style={styles.container}>
      <CalendarFrame />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>2022年4月15日(金)</Text>
        <View style={styles.boxInputArea}>
          <Text>◆{i18n.t("History.time")}</Text>
          <View style={styles.boxInputTime}>
            <Text>13:00 ~ 16:00</Text>
          </View>
        </View>
        <View style={styles.boxInputArea}>
          <Text>◆{i18n.t("History.place")}</Text>
          <View style={styles.boxInputText}>
            <Text>スポーツ会館</Text>
          </View>
        </View>
        <TextButton
          text01={i18n.t("History.input")}
          text02={i18n.t("History.ncw")}
          onPress01={onPress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
  },
  boxTitle: {
    fontSize: 16,
  },
  boxInputArea: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  boxInputText: {
    paddingLeft: 10,
    flexGrow: 1,
  },
  boxInputTime: {
    paddingLeft: 10,
    flexGrow: 1,
  },
});
