import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AppNavigator from "./app/components/navigation/AppNavigator";
import NavigationTheme from "./app/components/navigation/NavigationTheme";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/components/navigation/AuthNavigator";
import AuthContext from "./app/auth/authContext";
import authStorage from "./app/api/authStorage";

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default function App() {
  const [user, setUser] = React.useState(null);
  const [isReady, setIsReady] = React.useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onError={console.error}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator user={user} /> : <AuthNavigator />}
      </NavigationContainer>
      <OfflineNotice />
    </AuthContext.Provider>
  );
}
