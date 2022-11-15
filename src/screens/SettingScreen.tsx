import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import i18n from "../lang/localization";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

type Props = NativeStackScreenProps<MainStackParamList, "Setting">;

export const SettingScreen: React.FC<Props> = ({ navigation }: Props) => {
  const profile = useSelector((state: RootState) => state.profile);
  console.log(profile);

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

  // 練士、教士、範士の表示
  const [openRenshi, setOpenRenshi] = useState<boolean>(false);
  useEffect(() => {
    if (profile.passed06 !== 19900000) {
      setOpenRenshi(true);
    } else {
      setOpenRenshi(false);
    }
  });
  const [openKyoushi, setOpenKyoushi] = useState<boolean>(false);
  useEffect(() => {
    if (profile.passed07 !== 19900000) {
      setOpenKyoushi(true);
    } else {
      setOpenKyoushi(false);
    }
  });
  const [openHanshi, setOpenHanshi] = useState<boolean>(false);
  useEffect(() => {
    if (profile.passed06 !== 19900000) {
      setOpenHanshi(true);
    } else {
      setOpenHanshi(false);
    }
  });

  // 日付表示変換
  const renderChangeText = (date: number) => {
    let originDate = date.toString().split("");
    let changeText = "";
    originDate.forEach((element, index) => {
      if (index == 4) {
        changeText += "年";
      } else if (index == 6) {
        changeText += "月";
      }
      changeText += element;
      if (index == originDate.length - 1) {
        changeText += "日";
      }
    });
    return changeText;
  };

  // 合格済みかどうか
  const renderPassedCheck = (date: number) => {
    if (date !== 19900000) {
      return <Text>〇</Text>;
    } else {
      return <Text>-</Text>;
    }
  };

  // 審査までの日数
  const renderExamDate = (exam: number) => {
    const examDate = exam;
    const today = Number(dayjs().format("YYYYMMDD"));
    let diffDate = (examDate - today) / 27.3972603;
    let diffRoundDate = Math.round(diffDate);
    return diffRoundDate;
  };

  // 合格日出力 or 審査びまでの日曹を出力
  const renderPassedDate = (date: number, exam: number) => {
    if (date !== 19900000) {
      return <Text>{renderChangeText(date)}</Text>;
    } else {
      return <Text>{`${"残り"}` + `${renderExamDate(exam)}` + `${"日"}`}</Text>;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBody}>
            <Text style={styles.profileText01}>{i18n.t("Setting.name")}</Text>
            <Text style={styles.profileText02}>{profile.name}</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.birthday")}</Text>
            <Text style={styles.profileText02}>{renderChangeText(profile.birthday)}</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.age")}</Text>
            <Text style={styles.profileText02}>{profile.age}</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.number")}</Text>
            <Text style={styles.profileText02}>{profile.kenNumber}</Text>
          </View>
          <Image style={styles.profileImage} source={require("../../assets/images/profile.png")} />
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>階級</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>合格</Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>合格日/審査までの日数</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>初段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed01)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed01, profile.exam01)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>弐段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed02)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed02, profile.exam02)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>三段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed03)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed03, profile.exam03)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>四段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed04)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed04, profile.exam04)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>五段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed05)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed05, profile.exam05)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>六段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed06)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed06, profile.exam06)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>七段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed07)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed07, profile.exam07)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableData, styles.firstColumn]}>八段</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>
              {renderPassedCheck(profile.passed08)}
            </Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>
              {renderPassedDate(profile.passed08, profile.exam08)}
            </Text>
          </View>
          {openRenshi && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableData, styles.firstColumn]}>錬士</Text>
              <Text style={[styles.tableData, styles.secondColumn]}>
                {renderPassedCheck(profile.passed09)}
              </Text>
              <Text style={[styles.tableData, styles.thirdColumn]}>
                {renderPassedDate(profile.passed09, profile.exam09)}
              </Text>
            </View>
          )}
          {openKyoushi && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableData, styles.firstColumn]}>教士</Text>
              <Text style={[styles.tableData, styles.secondColumn]}>
                {renderPassedCheck(profile.passed10)}
              </Text>
              <Text style={[styles.tableData, styles.thirdColumn]}>
                {renderPassedDate(profile.passed10, profile.exam10)}
              </Text>
            </View>
          )}
          {openHanshi && (
            <View style={styles.tableRow}>
              <Text style={[styles.tableData, styles.firstColumn]}>範士</Text>
              <Text style={[styles.tableData, styles.secondColumn]}>-</Text>
              <Text style={[styles.tableData, styles.thirdColumn]}>-</Text>
            </View>
          )}
          {/* {renderCategory()} */}
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
