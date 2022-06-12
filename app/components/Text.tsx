import React from "react";
import {
  Text as NativeText,
  Platform,
  StyleSheet,
  TextStyle,
} from "react-native";

type TextProps = {
  children: any;
  style: TextStyle;
};

function Text({ children, style, ...other }: TextProps) {
  return (
    <NativeText style={[styles.text, style]} {...other}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default Text;
