import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Notifications from "expo-notifications";

import ProfileScreen from "../../screens/ProfileScreen";
import MessagesScreen from "../../screens/MessagesScreen";
import FriendsScreen from "../../screens/FriendsScreen";
import colors from "../../configs/colors";
import routes from "./routes";
import { protectedClient } from "../../api/client";
import MainButton from "./MainButton";

function AppNavigator({ user }) {
  const Tabs = createBottomTabNavigator();

  const getNotificationToken = async () => {
    const { granted } = await Notifications.requestPermissionsAsync();
    if (!granted)
      return alert("You need to allow premission to receive notification");
    try {
      const { data: token } = await Notifications.getExpoPushTokenAsync();
      if (token) {
        console.log(token);
        protectedClient.post("pushtoken/", { token });
      }
    } catch (error) {
      console.log("Getting push token failed", error);
    }
  };

  React.useEffect(() => {
    // if (user.hasPushToken) return;
    // getNotificationToken();

    const ref = Notifications.addNotificationReceivedListener((notification) =>
      console.log("not", notification)
    );
    const ref2 = Notifications.addNotificationResponseReceivedListener((not) =>
      console.log("res", not)
    );
    return () => {
      Notifications.removeNotificationSubscription(ref);
      Notifications.removeNotificationSubscription(ref2);
    };
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: { backgroundColor: colors.light },
      }}
    >
      <Tabs.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={routes.MESSAGES}
        component={MessagesScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={size}
              color={color}
            />
            // <MainButton
            //   icon="message-processing-outline"
            //   onPress={() => navigation.navigate(routes.MESSAGES)}
            // />
          ),
          // tabBarLabel: "",
        })}
      />
      <Tabs.Screen
        name={routes.FRIENDS}
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default AppNavigator;
