import { View, TextInput as NativeTextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React from "react";
import colors from "../configs/colors";

type TextInputProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  width: string | number;
};

function TextInput({ icon, width = "100%", ...otherProps }: TextInputProps) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={20}
          color={colors.medium}
        />
      )}
      <NativeTextInput
        placeholderTextColor={colors.medium}
        style={styles.input}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
  },
  icon: { marginRight: 10 },
  input: { color: colors.dark, flex: 1, fontSize: 18 },
});

export default TextInput;
