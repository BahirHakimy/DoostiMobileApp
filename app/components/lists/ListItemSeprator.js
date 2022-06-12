import { View, StyleSheet } from "react-native";

import React from "react";
import colors from "../../configs/colors";

function ListItemSeprator(props) {
  return <View style={styles.seprator} />;
}

const styles = StyleSheet.create({
  seprator: {
    width: "100%",
    backgroundColor: colors.light,
    height: 1,
  },
});

export default ListItemSeprator;
