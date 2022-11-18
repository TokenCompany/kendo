import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import i18n from "../lang/localization";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { render } from "react-dom";

type Props = NativeStackScreenProps<MainStackParamList, "Setting">;

export const SettingScreen: React.FC<Props> = ({ navigation }: Props) => {
  const profile = useSelector((state: RootState) => state.profile);

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

  // 練士、教士、範士の表示
  const [openRenshi, setOpenRenshi] = useState<boolean>(false);
  useEffect(() => {
    if (profile.passed5 !== 19900000) {
      setOpenRenshi(true);
    } else {
      setOpenRenshi(false);
    }
  });
  const [openKyoushi, setOpenKyoushi] = useState<boolean>(false);
  useEffect(() => {
    if (profile.passed6 !== 19900000) {
      setOpenKyoushi(true);
    } else {
      setOpenKyoushi(false);
    }
  });
  const [openHanshi, setOpenHanshi] = useState<boolean>(false);
  useEffect(() => {
    if (profile.passed5 !== 19900000) {
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
        changeText += i18n.t("Setting.year");
      } else if (index == 6) {
        changeText += i18n.t("Setting.month");
      }
      changeText += element;
      if (index == originDate.length - 1) {
        changeText += i18n.t("Setting.day");
      }
    });
    return changeText;
  };

  // 合格済みかどうか
  const renderPassedCheck = (passed: number) => {
    if (passed !== 19900000) {
      return <Text>〇</Text>;
    } else {
      // if () {
      // } else {
      return <Text>-</Text>;
      // }
    }
  };

  // 審査までの日数
  const renderExamDate = (exam: number) => {
    const today = dayjs().format("YYYYMMDD");
    const examDay = String(exam);
    const diffDate = dayjs(examDay).diff(today, "day");
    return diffDate;
  };

  // 合格日出力 or 審査びまでの日曹を出力
  const renderPassedDate = (passed: number, exam: number) => {
    if (passed !== 19900000) {
      return <Text>{renderChangeText(passed)}</Text>;
    } else {
      return (
        <Text>
          {renderExamDate(exam) >= 0
            ? `${i18n.t("Setting.remain")}` + `${renderExamDate(exam)}` + `${i18n.t("Setting.day")}`
            : "-"}
        </Text>
      );
    }
  };

  // 合格日抽出
  const passedObject = Object.keys(profile).filter(function (item) {
    return item.indexOf("passed") !== -1;
  });

  // 審査日抽出
  const examObject = Object.keys(profile).filter(function (item) {
    return item.indexOf("exam") !== -1;
  });

  // 階級
  const kendoLevel = ["初段", "弐段", "参段", "四段", "五段", "六段", "七段", "八段"];

  // 条件を満たした時に錬士,教士,範士の追加
  const addLevel = () => {
    if (profile.passed5 !== 19900000) {
      kendoLevel[kendoLevel.length] = "錬士";
      kendoLevel[kendoLevel.length] = "範士";
    }

    if (profile.passed6 !== 19900000) {
      kendoLevel[kendoLevel.length] = "教士";
    }
  };
  {
    addLevel();
  }

  console.log(profile);

  const renderLevelTable = () => {
    return kendoLevel.map((data, index) => (
      <View style={styles.tableRow}>
        <Text style={[styles.tableData, styles.firstColumn]}>{data}</Text>
        <Text style={[styles.tableData, styles.secondColumn]}>
          {renderPassedCheck(profile[`passed${index}`])}
        </Text>
        <Text style={[styles.tableData, styles.thirdColumn]}>
          {profile[`exam${index}`] !== 19900000
            ? renderPassedDate(profile[`passed${index}`], profile[`exam${index}`])
            : "-"}
        </Text>
      </View>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBody}>
            <Text style={styles.profileText01}>{i18n.t("Setting.name")}</Text>
            <Text style={styles.profileText02}>
              {profile.name ? profile.name : i18n.t("Setting.intoName")}
            </Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.birthday")}</Text>
            <Text style={styles.profileText02}>
              {profile.birthday !== 19900000
                ? renderChangeText(profile.birthday)
                : i18n.t("Setting.intoBirthday")}
            </Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.age")}</Text>
            <Text style={styles.profileText02}>
              {profile.age ? profile.age + `${i18n.t("Setting.old")}` : i18n.t("Setting.intoAge")}
            </Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.number")}</Text>
            <Text style={styles.profileText02}>
              {profile.kenNumber ? profile.kenNumber : i18n.t("Setting.intoNumber")}
            </Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.task")}</Text>
            <Text style={styles.profileText02}>
              {profile.task ? profile.task : i18n.t("Setting.intoTask")}
            </Text>
          </View>
          {profile.profileImage ? (
            <Image
              source={{ uri: "data:image/jpeg;base64," + profile.profileImage }}
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
            <Text style={[styles.tableData, styles.firstColumn]}>{i18n.t("Setting.th01")}</Text>
            <Text style={[styles.tableData, styles.secondColumn]}>{i18n.t("Setting.th02")}</Text>
            <Text style={[styles.tableData, styles.thirdColumn]}>{i18n.t("Setting.th03")}</Text>
          </View>
          {renderLevelTable()}
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
    paddingHorizontal: 40,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  profileBody: {
    flexGrow: 1,
    paddingLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginRight: 30,
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
    width: "55%",
  },
});
