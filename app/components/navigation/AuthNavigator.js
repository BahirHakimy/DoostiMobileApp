import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import WelcomScreen from "../../screens/WelcomeScreen";
import AdditionalInfoScreen from "../../screens/AdditionalnfoScreen";
import routes from "./routes";

function AuthNavigator(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.WELCOME} component={WelcomScreen} />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={routes.ADDITIONALINFO}
        component={AdditionalInfoScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
