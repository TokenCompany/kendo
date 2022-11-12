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
    navigation.navigate("TrainingEdit");
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

  // const rankTableData = [
  //   ["初段", "〇", "2006-11-20", "2006-11-20"],
  //   ["弐段", "〇", "2007年11月13日"],
  //   ["参段 ", "〇", "2009年11月12日"],
  //   ["四段 ", "〇", "2011年11月1日"],
  //   ["五段", "〇", "2015年11月17日"],
  //   ["六段 ", "〇", "2020年11月22日"],
  //   ["七段", "-", "残り1945日(5年4か月)"],
  //   ["八段", "-", "残り5596日(15年4か月)"],
  //   ["錬士", "-", "残り5596日(15年4か月)"],
  //   ["教士", "-", "残り5596日(15年4か月)"],
  // ];

  const rankTable = [
    {
      class: "初段",
      status: "〇",
      passingDate: "2006-11-20",
      ExaminationDate: "2006-11-20",
    },
    {
      class: "弐段",
      status: "〇",
      passingDate: "2007-11-13",
      ExaminationDate: "2007-11-13",
    },
    {
      class: "参段",
      status: "〇",
      passingDate: "2009-11-12",
      ExaminationDate: "2006-11-20",
    },
    {
      class: "四段",
      status: "〇",
      passingDate: "2011-11-1",
      ExaminationDate: "2011-11-1",
    },
    {
      class: "五段",
      status: "〇",
      passingDate: "2015-11-17",
      ExaminationDate: "2015-11-17",
    },
    {
      class: "六段",
      status: "〇",
      passingDate: "2022-5-22",
      ExaminationDate: "2022-4-22",
    },
    {
      class: "七段",
      status: "〇",
      passingDate: "2022-6-5",
      ExaminationDate: "2022-6-5",
    },
    {
      class: "八段",
      status: "-",
      passingDate: "",
      ExaminationDate: "2026-12-5",
    },
    {
      class: "錬士",
      status: "-",
      passingDate: "",
      ExaminationDate: "",
    },
    {
      class: "教士",
      status: "-",
      passingDate: "",
      ExaminationDate: "",
    },
  ];
  let rankTableData: any = [];
  let currentDate = new Date();
  rankTable.forEach(function (item) {
    if (item.status == "〇") {
      rankTableData.push([item.class, item.status, item.passingDate]);
    } else {
      if (item.ExaminationDate) {
        let passDay = item.ExaminationDate.split('-');
        let passYear = Number(passDay[0]);
        let passMonth = Number(passDay[1]) - 1;
        let passDate = Number(passDay[2]);
        let affterDate = new Date(passYear, passMonth, passDate);
        let termDay = (affterDate - currentDate) / 86400000;
        let scheduleText = "残り" + Math.ceil(termDay) + "日";

        rankTableData.push([item.class, item.status, scheduleText]);
      } else if (rankTable[5].status == "〇" && item.class == '錬士') {
        let passDay = rankTable[5].passingDate.split('-');
        let passYear = Number(passDay[0]) + 1;
        let passMonth = Number(passDay[1]) - 1;
        let passDate = Number(passDay[2]);
        let affterDate = new Date(passYear, passMonth, passDate);
        let termDay = (affterDate - currentDate) / 86400000;
        let scheduleText = "残り" + Math.ceil(termDay) + "日";
        rankTableData.push([item.class, item.status, scheduleText]);
      } else if (rankTable[6].status == "〇" && item.class == '教士') {
        let passDay = rankTable[6].passingDate.split('-');
        let passYear = Number(passDay[0]) + 2;
        let passMonth = Number(passDay[1]) - 1;
        let passDate = Number(passDay[2]);
        let affterDate = new Date(passYear, passMonth, passDate);
        let termDay = (affterDate - currentDate) / 86400000;
        let scheduleText = "残り" + Math.ceil(termDay) + "日";
        rankTableData.push([item.class, item.status, scheduleText]);
      }
    }
   });

  const name = useSelector((state: RootState) => state.profile.name);
  const age = useSelector((state: RootState) => state.profile.age);
  const kenNumber = useSelector((state: RootState) => state.profile.kenNumber);
  const birthday = useSelector((state: RootState) => state.profile.birthday);
  const image = useSelector((state: RootState) => state.profile.profileImage);

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
            <Text style={styles.profileText02}>テキストテキストテキスト</Text>
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
