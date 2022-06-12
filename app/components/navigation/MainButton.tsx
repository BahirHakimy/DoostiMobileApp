import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../configs/colors";
import Icon from "../Icon";

type MainButtonProps = {
  onPress: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgrounColor?: string;
};

function MainButton({
  onPress,
  icon,
  backgrounColor = colors.primary,
}: MainButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={icon} size={60} backgroundColor={backgrounColor} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: colors.light,
    borderRadius: 60,
    borderWidth: 5,
    paddingBottom: 5,
  },
});

export default MainButton;
