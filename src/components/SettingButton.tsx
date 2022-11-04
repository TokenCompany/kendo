import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

// type Props = {
//   onPress: () => void;
// };

// export const SettingButton: React.FC<Props> = ({ onPress }) => {
export const SettingButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={require("../../assets/images/topButton.jpg")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
});
