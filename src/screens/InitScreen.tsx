import React from "react";
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainStackParamList, "Init">;

export const InitScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [fontsLoaded] = useFonts({
    KouzanGyousho: require("../../assets/fonts/KouzanGyoushoOTF.otf"),
  });

  const onPress = () => {
    navigation.navigate("Menu");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {fontsLoaded ? (
        <View>
          <Text style={styles.text}>八</Text>
          <Text style={styles.text}>段</Text>
          <Text style={styles.text}>へ</Text>
          <Text style={styles.text}>の</Text>
          <Text style={styles.text}>道</Text>
        </View>
      ) : (
        <ActivityIndicator size={"large"} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "KouzanGyousho",
    fontSize: 64,
  },
});
