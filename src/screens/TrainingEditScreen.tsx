import React, { useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  AppState,
  Text,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MajorItem } from "../components/MajorItem";
import * as Notifications from "expo-notifications";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../styles";
import { I18n } from "i18n-js";
import en from "../lang/en.json";
import ja from "../lang/ja.json";
import { useLang } from "../hooks/useLang";
import { addReminder } from "../store/reminderSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import * as Device from 'expo-device';

type Props = NativeStackScreenProps<MainStackParamList, "TrainingEdit">;

export type NotificationContent = {
  title: string | null;
  subtitle: string | null;
  body: string | null;
  data: { [key: string]: unknown };
  badge: number | null;
  sound: 'default' | 'defaultCritical' | 'custom' | null;
  categoryIdentifier: string | null;
} & (
  | {
      attachments: {
        identifier: string | null;
        url: string | null;
        type: string | null;
      }[];
      summaryArgument?: string | null;
      summaryArgumentCount?: number;
      threadIdentifier: string | null;
      targetContentIdentifier?: string;
    }
  | {
      priority?: AndroidNotificationPriority;
      vibrationPattern?: number[];
      color?: string;
    }
);

export enum AndroidNotificationPriority {
  MIN = 'min',
  LOW = 'low',
  DEFAULT = 'default',
  HIGH = 'high',
  MAX = 'max',
}

export type DateTriggerInput = Date | number | { channelId?: string; date: Date | number };

export type NotificationTrigger =
  | SchedulableNotificationTriggerInput

export type SchedulableNotificationTriggerInput =
  | DateTriggerInput

export interface NotificationRequest {
  identifier: string;
  content: NotificationContent;
  trigger: NotificationTrigger;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const TrainingEditScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { currentLang, onChangeLang } = useLang();
  const i18n = new I18n({ en, ja });
  i18n.locale = currentLang;
  i18n.enableFallback = true;
  const dispatch = useDispatch();
  const reminder = useSelector((state: RootState) => state.reminder);
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
    navigation.navigate("Target");
  };

  const [alartShow, setAlartShow] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>();
  const [startTime, setStartTime] = useState<string>("0000");
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');



  useEffect(() => {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    requestPermissionsAsync();
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.addEventListener("change", _handleAppStateChange).remove();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }
    return token;
  }

  // AppState.currentStateで現在の状態を取得できる
  const [appState, setAppState] = useState(AppState.currentState);

  const _handleAppStateChange = (nextAppState: any) => {
    setAppState(nextAppState);

    // ここをactiveやinactiveに変えることでそれぞれの状態の時に発火できる
    if (nextAppState !== "background") {
      requestPermissionsAsync();
    }
  };

  const [permission, setPermission] = useState(true);

  const requestPermissionsAsync = async () => {
    const { granted } = await Notifications.getPermissionsAsync();
    setPermission(granted);
  };

  const alartTimeChange = async () => {
    let notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    let newTime = dayjs(startTime).format("HH:mm").toString();
    let newTimeHour = newTime.split(":");
    for (let i = 0; i < notifications.length; i++) {
      let identifier = notifications[i].identifier;
      let alartBody = notifications[i].content.body;
      let alartTitle = notifications[i].content.title;

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
        alartMinutes,
      );
      console.log(unixDate);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        // body: alartBody,
        // title: alartTitle,
        body: "aaaa",
        title: "aaaa",
        badge: 1,
      },
      trigger: {
        // channelId: notifications[i].trigger.channelId,
        // date: unixDate,
        year: 2022,
        month: 12,
        day: 15,
        hour: 18,
        minute: 50,
      },
    });
  };

  const onPressAlart = () => {
    setAlartShow(!alartShow);
    setStartTime(dayjs(reminder.reminderTimer).toString());
  };

  const onPressShowStartTimePicker = () => {
    setShowStartTimePicker(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <MajorItem text={i18n.t("TrainingEdit.training01")} onPress={onPressPlace} />
          <MajorItem text={i18n.t("TrainingEdit.training02")} onPress={onPressSwing} />
          <MajorItem text={i18n.t("TrainingEdit.training03")} onPress={onPressFootwork} />
          <MajorItem text={i18n.t("TrainingEdit.training04")} onPress={onPressBeat} />
          <MajorItem text={i18n.t("TrainingEdit.training05")} onPress={onPressResponse} />
          <MajorItem text={i18n.t("TrainingEdit.training06")} onPress={onPressJigeiko} />
          <MajorItem text={i18n.t("TrainingEdit.training07")} onPress={onPressTeacher} />
          <MajorItem text={i18n.t("TrainingEdit.training08")} onPress={onPressKakari} />
          <MajorItem text={i18n.t("TrainingEdit.training09")} onPress={onPressTarget} />
          <MajorItem text={i18n.t("TrainingEdit.training10")} onPress={onPressAlart} />
          {alartShow && (
            <View style={styles.alartContainer}>
              <View style={styles.alartContainerInner}>
                <View>
                  <Text style={styles.objectiveLabel}>{i18n.t("TrainingEdit.editAlert")}</Text>
                  {Platform.OS === "android" && (
                    <View style={styles.buttonWrap}>
                      <TouchableOpacity
                        style={permission ? styles.button1 : styles.button2}
                        onPress={() => {
                          Linking.openSettings();
                        }}
                      >
                        <Text style={permission ? styles.text1 : styles.text2}>
                          {i18n.t("TrainingEdit.true")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={!permission ? styles.button1 : styles.button2}
                        onPress={() => {
                          Linking.openSettings();
                        }}
                      >
                        <Text style={!permission ? styles.text1 : styles.text2}>
                          {i18n.t("TrainingEdit.false")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {Platform.OS === "ios" && (
                    <View style={styles.buttonWrap}>
                      <TouchableOpacity
                        style={permission ? styles.button1 : styles.button2}
                        onPress={() => {
                          Linking.openURL("app-settings:");
                        }}
                      >
                        <Text style={permission ? styles.text1 : styles.text2}>
                          {i18n.t("TrainingEdit.true")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={!permission ? styles.button1 : styles.button2}
                        onPress={() => {
                          Linking.openURL("app-settings:");
                        }}
                      >
                        <Text style={!permission ? styles.text1 : styles.text2}>
                          {i18n.t("TrainingEdit.false")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.alartContainerInner}>
                <Text style={styles.objectiveLabel}>{i18n.t("TrainingEdit.editAlertTime")}</Text>
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
                              locale={i18n.t("Lang.lang")}
                              value={dayjs(startTime).toDate()}
                              mode="time"
                              display={"default"}
                              onChange={(event, time: any) => {
                                setShowStartTimePicker(false);
                                setStartTime(time!.toString());
                                alartTimeChange();
                                dispatch(addReminder(time!.toString()))}}
                            />
                          )}
                        </View>
                      )}
                      {Platform.OS === "ios" && (
                        <DateTimePicker
                          locale={i18n.t("Lang.lang")}
                          value={dayjs(startTime).toDate()}
                          mode="time"
                          display={"default"}
                          onChange={(event, time: any) => {
                            setStartTime(time.toString());
                            alartTimeChange();
                          }}
                        />
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.setting}
                      onPress={() => {
                        dispatch(addReminder(startTime));
                      }}
                    >
                      <Text>
                      {i18n.t("ProfileEdit.setting")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 40,
  },
  scrollContainer: {
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
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#aaa",
  },
  objectiveAll: {
    width: 100,
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 18,
    textAlign: "center",
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
  submitButtonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  setting:{
    paddingHorizontal:20,
    marginLeft:10,
    height: 35,
    borderRadius:10,
    backgroundColor: "#F4F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
});
