import { StyleSheet, View, StatusBar, ViewStyle } from "react-native";

type ScreenProps = {
  style: ViewStyle;
};

function Screen({ style, ...props }: ScreenProps) {
  return <View style={[styles.screen, style]} {...props} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
