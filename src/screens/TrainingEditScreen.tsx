import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  AppState,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";
import { useSubCategory } from "../hooks/useSubCategory";
import * as Notifications from "expo-notifications";
import dayjs from "dayjs";
import DateTimePicker, { AndroidNativeProps } from "@react-native-community/datetimepicker";
import { colors } from "../styles";

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const TrainingEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPressPlace = () => {
    navigation.navigate("SubCategory", {
      // 遷移先にどの小項目を編集したいかを渡す
      subCategoryType: "placeSubCategories", // 地稽古の小項目設定に遷移するとき
    });
  };
  const onPressSwing = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "suburiSubCategories",
    });
  };
  const onPressFootwork = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "ashiSabakiSubCategories",
    });
  };
  const onPressBeat = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "kihonUchiSubCategories",
    });
  };
  const onPressResponse = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "oujiwazaSubCategories",
    });
  };
  const onPressJigeiko = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "jigeikoSubCategories",
    });
  };
  const onPressTeacher = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "teacherSubCategories",
    });
  };
  const onPressKakari = () => {
    navigation.navigate("SubCategory", {
      subCategoryType: "kakarigeikoSubCategories",
    });
  };
  const onPressTarget = () => {
    showTargetSetting();
  };

  const [show, setShow] = useState(false);
  const [currentText, setCurrentText] = useState<string>("");
  const onChangeText = (text: string) => {
    setCurrentText(text);
  };
  const showTargetSetting = () => {
    setShow(!show);
  };

  const [alartShow, setAlartShow] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>();
  const [startTime, setStartTime] = useState<string>("0000");

  React.useEffect(() => {
    requestPermissionsAsync();
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  });

  // AppState.currentStateで現在の状態を取得できる
  const [appState, setAppState] = useState(AppState.currentState);

  const _handleAppStateChange = (nextAppState: string) => {
    setAppState(nextAppState);

    // ここをactiveやinactiveに変えることでそれぞれの状態の時に発火できる
    if (!nextAppState === "background") {
      requestPermissionsAsync();
    }
  };

  const [permission, setPermission] = useState(true);

  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    setPermission(granted);
  };

  const onChangeStartTime = (time) => {
    setStartTime(time);
    alartTimeChange();
  };

  const alartTimeChange = async () => {
    let notifications = await Notifications.getAllScheduledNotificationsAsync();
    let newTime = startTime;
    let newTimeHour = newTime.split(":");
    console.log(notifications);
    for (let i = 0; i < notifications.length; i++) {
      let identifier = notifications[i].identifier;
      Notifications.cancelScheduledNotificationAsync(identifier);

      let date = notifications[i].trigger.channelId.split("-");
      let alartDate = Number(date[2]) - 1;
      let alartHour = Number(newTimeHour[0]);
      let alartMinutes = Number(newTimeHour[1]);
      let unixDate = new Date(
        Number(date[0]),
        Number(date[1]),
        alartDate,
        alartHour,
        alartHour,
        alartMinutes,
      );

      await Notifications.scheduleNotificationAsync({
        content: {
          body: "test",
          title: "a",
        },
        trigger: {
          channelId: notifications[i].trigger.channelId,
          date: unixDate,
        },
      });
    }
  };

  const onPressAlart = () => {
    setAlartShow(!alartShow);
  };

  const onPressShowStartTimePicker = () => {
    setShowStartTimePicker(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <MajorItem text="稽古場所" onPress={onPressPlace} />
        <MajorItem text="素振り" onPress={onPressSwing} />
        <MajorItem text="足さばき" onPress={onPressFootwork} />
        <MajorItem text="基本打ち" onPress={onPressBeat} />
        <MajorItem text="応じ技" onPress={onPressResponse} />
        <MajorItem text="地稽古" onPress={onPressJigeiko} />
        <MajorItem text="先生との稽古" onPress={onPressTeacher} />
        <MajorItem text="掛稽古" onPress={onPressKakari} />
        <MajorItem text="年間稽古目標" onPress={onPressTarget} />

        {show && (
          <View style={styles.objectiveContainer}>
            <Text style={styles.objectiveLabel}>年間稽古目標</Text>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>合計</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>〇〇〇 先生</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>〇〇〇〇〇 先生</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
            <View style={styles.objectiveInputArea}>
              <Text style={styles.objectiveText}>〇〇〇〇 先生</Text>
              <TextInput
                style={styles.objectiveInput}
                keyboardType="numeric"
                onChangeText={onChangeText}
                // value={objectiveNum}
              ></TextInput>
              <Text style={styles.objectiveText}>回</Text>
            </View>
          </View>
        )}
        <MajorItem text="通知設定" onPress={onPressAlart} />
        {alartShow && (
          <View style={styles.alartContainer}>
            <View style={styles.alartContainerInner}>
              <View>
                <Text style={styles.objectiveLabel}>通知許可設定</Text>
                {Platform.OS === "android" && (
                  <View style={styles.buttonWrap}>
                    <TouchableOpacity
                      style={permission ? styles.button1 : styles.button2}
                      onPress={() => {
                        Linking.openSettings();
                      }}
                    >
                      <Text style={permission ? styles.text1 : styles.text2}>許可</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={!permission ? styles.button1 : styles.button2}
                      onPress={() => {
                        Linking.openSettings();
                      }}
                    >
                      <Text style={!permission ? styles.text1 : styles.text2}>不許可</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {Platform.OS === "ios" && (
                  <View style={styles.buttonWrap}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        Linking.openURL("app-settings:");
                      }}
                    >
                      <Text style={styles.text}>許可</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.color]}
                      onPress={() => {
                        Linking.openURL("app-settings:");
                      }}
                    >
                      <Text style={styles.text}>不許可</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.alartContainerInner}>
              <Text style={styles.objectiveLabel}>通知時間設定</Text>
              <View style={styles.boxInputTime}>
                <View style={styles.boxInputTimeFlex}>
                  <View style={styles.timeStart}>
                    {Platform.OS === "android" && (
                      <View>
                        <TouchableOpacity
                          style={styles.timeStartAndroid}
                          onPress={() => onPressShowStartTimePicker()}
                        >
                          <Text style={styles.timeStartTextAndroid}>
                            {dayjs(startTime).format("HH:mm").toString()}
                          </Text>
                        </TouchableOpacity>
                        {showStartTimePicker && (
                          <DateTimePicker
                            style={{ height: 60 }}
                            value={dayjs(startTime).toDate()}
                            mode="time"
                            display={"default"}
                            onChange={(event, time) => {
                              setShowStartTimePicker(false);
                              setStartTime(time.toString());
                              onChangeStartTime();
                            }}
                          />
                        )}
                      </View>
                    )}
                    {Platform.OS === "ios" && (
                      <DateTimePicker
                        style={{ height: 60 }}
                        value={dayjs(startTime).toDate()}
                        mode="time"
                        display={"default"}
                        onChange={(event, time) => {
                          setStartTime(time.toString());
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 40,
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  alartContainer: {
    marginTop: 20,
    marginBottom: 10,
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  alartContainerInner: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  objectiveContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingRight: 60,
    alignItems: "flex-start",
  },
  objectiveLabel: {
    fontSize: 18,
    color: "#000",
  },
  objectiveInputArea: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  objectiveInput: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
  objectiveText: {
    fontSize: 18,
  },
  boxInputTime: {
    paddingLeft: 10,
    flexGrow: 1,
  },
  boxInputTimeFlex: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTime: {
    flexGrow: 1,
  },
  timeText: {
    alignItems: "center",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  timeStart: {
    width: "40%",
  },
  timeStartAndroid: {
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: "#F4F4F5",
  },
  timeStartTextAndroid: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 10,
  },

  button1: {
    width: 100,
    height: 50,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    width: 100,
    height: 50,
    backgroundColor: "#F4F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  text2: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonWrap: {
    flexDirection: "row",
    padding: 10,
  },
});
