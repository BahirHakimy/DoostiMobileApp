import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../configs/colors";

type InfoFieldProps = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  iconSize?: number;
  iconColor?: string;
};

function InfoField({
  title,
  icon,
  iconSize = 20,
  iconColor = colors.medium,
}: InfoFieldProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flexDirection: "row",
  },
  text: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: "400",
    paddingLeft: 5,
  },
});

export default InfoField;
