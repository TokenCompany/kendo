import React from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import i18n from "../lang/localization";
import { RootState } from "../store";
import { useSelector } from "react-redux";

type Props = NativeStackScreenProps<MainStackParamList, "Setting">;

export const SettingScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPressTask = () => {
    navigation.navigate("TaskEdit");
  };
  const onPressInitial = () => {
    navigation.navigate("InitEdit");
  };
  const onPressProfile = () => {
    navigation.navigate("ProfileEdit");
  };
  const onPressTraining = () => {
    navigation.navigate("TrainingEdit");
  };
  const onPressLanguage = () => {
    navigation.navigate("TrainingEdit");
  };

  const rankTableData = [
    ["初段", "〇", "2006年11月20日"],
    ["弐段", "〇", "2007年11月13日"],
    ["参段 ", "〇", "2009年11月12日"],
    ["四段 ", "〇", "2011年11月1日"],
    ["五段", "〇", "2015年11月17日"],
    ["六段 ", "〇", "2020年11月22日"],
    ["七段", "-", "残り1945日(5年4か月)"],
    ["八段", "-", "残り5596日(15年4か月)"],
  ];

  const name = useSelector((state: RootState) => state.profile.name);
  const age = useSelector((state: RootState) => state.profile.age);
  const kenNumber = useSelector((state: RootState) => state.profile.kenNumber);
  const birthday = useSelector((state: RootState) => state.profile.birthday);
  const image = useSelector((state: RootState) => state.profile.profileImage);
  const task = useSelector((state: RootState) => state.profile.task);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBody}>
            <Text style={styles.profileText01}>{i18n.t("Setting.name")}</Text>
            <Text style={styles.profileText02}>{name ? name : "名前が入ります"}</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.birthday")}</Text>
            <Text style={styles.profileText02}>{birthday ? birthday : "生年月日が入ります"}</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.age")}</Text>
            <Text style={styles.profileText02}>{age ? age : "年齢が入ります"}</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.number")}</Text>
            <Text style={styles.profileText02}>
              {kenNumber ? kenNumber : "全剣連番号が入ります"}
            </Text>
            <Text style={styles.profileText01}>課題</Text>
            {task ? <Text style={styles.profileText02}>{task}</Text> : ""}
          </View>
          {image ? (
            <Image
              source={{ uri: "data:image/jpeg;base64," + image }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={require("../../assets/images/profile.png")}
            />
          )}
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>階級</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>合格</Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>合格日/審査までの日数</Text>
          </View>
          {rankTableData.map((rankData) => (
            <View style={styles.tableRow}>
              <Text style={[styles.tableData, styles.firstColumn]}>{rankData[0]}</Text>
              <Text style={[styles.tableData, styles.secondColumn]}>{rankData[1]}</Text>
              <Text style={[styles.tableData, styles.thirdColumn]}>{rankData[2]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button text={i18n.t("Setting.button03")} onPress={onPressTask} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={i18n.t("Setting.button04")} onPress={onPressInitial} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={i18n.t("Setting.button01")} onPress={onPressProfile} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={i18n.t("Setting.button02")} onPress={onPressTraining} />
        </View>
        <View>
          <Button text={i18n.t("Setting.button05")} onPress={onPressLanguage} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileBody: {
    flexGrow: 1,
    paddingRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  profileText01: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: "bold",
  },
  profileText02: {
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableData: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#F0E8E7",
    padding: 10,
    textAlign: "center",
  },
  firstColumn: {
    width: "20%",
  },
  secondColumn: {
    width: "25%",
  },
  thirdColumn: {
    width: "50%",
  },
});
