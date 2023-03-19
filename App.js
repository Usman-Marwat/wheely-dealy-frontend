import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import AppStarter from "./app/start/AppStarter";
// import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  const restoreUser = async () => {
    // const user = await authStorage.getUser();
    const user = {
      name: "aman",
      role: "Seller",
      user_id: "63390ba766243cb0ff33ecd5",
      image: "https://cdn-icons-png.flaticon.com/256/8662/8662305.png",
    };
    if (user) setUser(user);

    setAppIsReady(true);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <OfflineNotice />
          {user ? <AppStarter user={user} /> : <AuthNavigator />}
        </AuthContext.Provider>
      </GestureHandlerRootView>
      <StatusBar hidden />
    </View>
  );
};

export default App;
