import { useNetInfo, configure } from "@react-native-community/netinfo";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import colors from "../configs/colors";
import Text from "./Text";

function OfflineNotice(props: any) {
  const netinfo = useNetInfo();
  return netinfo.type !== "unknown" && netinfo.isInternetReachable === false ? (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: StatusBar.currentHeight,
    width: "100%",
  },
  text: {
    color: colors.white,
  },
});

export default OfflineNotice;
