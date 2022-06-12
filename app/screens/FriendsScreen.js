import React from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import Text from "../components/Text";

function FriendsScreen(props) {
  return (
    <Screen style={styles.container}>
      <Text>FriendsScreen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FriendsScreen;
