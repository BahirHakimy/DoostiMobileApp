import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import colors from "../configs/colors";
import Icon from "../components/Icon";
import { ListItemSeprator, ListItem } from "../components/lists";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
  },
  {
    title: "My Messages",
    icon: { name: "email", backgroundColor: colors.secondary },
  },
];

function AccountScreen(props) {
  const { user, logOut } = useAuth();
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          image={require("../assets/mosh.jpg")}
          title={user.name}
          subTitle={user.email}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={ListItemSeprator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={logOut}
          title="LogOut"
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { backgroundColor: colors.light },
  container: { marginVertical: 10 },
});
export default AccountScreen;
