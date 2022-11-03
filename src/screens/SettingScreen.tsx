import React from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { Button } from "../components/Button";
import i18n from "../lang/localization";

type Props = NativeStackScreenProps<MainStackParamList, "Setting">;

export const SettingScreen: React.FC<Props> = ({ navigation }: Props) => {
  const onPressProfile = () => {
    navigation.navigate("ProfileEdit");
  };
  const onPressTraining = () => {
    navigation.navigate("TrainingEdit");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileBody}>
            <Text style={styles.profileText01}>{i18n.t("Setting.name")}</Text>
            <Text style={styles.profileText02}>山田 太郎</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.birthday")}</Text>
            <Text style={styles.profileText02}>1988年4月27日</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.age")}</Text>
            <Text style={styles.profileText02}>34歳</Text>
            <Text style={styles.profileText01}>{i18n.t("Setting.number")}</Text>
            <Text style={styles.profileText02}>12345678</Text>
          </View>
          <Image style={styles.profileImage} source={require("../../assets/images/profile.png")} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={i18n.t("Setting.button01")} onPress={onPressProfile} />
        </View>
        <View>
          <Button text={i18n.t("Setting.button02")} onPress={onPressTraining} />
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
});
