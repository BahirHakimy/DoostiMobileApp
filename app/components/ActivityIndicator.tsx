import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = { visible: boolean };

function ActivityIndicator({ visible = false }: Props) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        loop
        autoPlay
        source={require("../assets/animations/loading.json")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "white",
    height: "100%",
    opacity: 0.8,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
