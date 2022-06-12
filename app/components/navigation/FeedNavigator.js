import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListingScreen from "../../screens/ListingScreen";
import ListingDetailsScreen from "../../unused/ListingDetailsScreen";
import routes from "./routes";
import Text from "../Text";

function FeedNavigator(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal-inverted",
      }}
    >
      <Stack.Screen name={routes.LISTING} component={ListingScreen} />
      <Stack.Screen
        name={routes.LISTITNG_DETAILS}
        component={ListingDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default FeedNavigator;
