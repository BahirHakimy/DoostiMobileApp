import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from "react-native";

import colors from "../configs/colors";

export type ButtonWithIconProps = {
  color?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: (event: any) => void;
  style?: ViewStyle;
  textColor?: string;
  title: string;
};

function ButtonWithIcon({
  color = colors.info,
  icon = null,
  onPress,
  style = {},
  textColor = colors.white,
  title,
}: ButtonWithIconProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: color, ...style }]}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={25} color={textColor} />
      )}
      <Text ellipsizeMode="tail" numberOfLines={1} style={{ color: textColor }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 50,
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 150,
  },
});

export default ButtonWithIcon;
