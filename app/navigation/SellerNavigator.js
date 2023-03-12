import { Dimensions, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ActivityIndicator from "../components/ActivityIndicator";
import CustomDrawer from "./CustomDrawer";
import DrawerAnimationContext from "../contexts/drawerAnimationContext";
import navigationTheme from "./navigationTheme";
import RootNavigator from "../chat/RootNavigator";
import DealersListNavigator from "./DealersListNavigator";
import useNotifications from "../hooks/useNotifications";
import ReceivedContractNavigator from "./ReceivedContractNavigator";
import AdsNavigator from "./AdsNavigator";
import StockpileNavigator from "./StockpileNavigator";
import AccountNavigator from "./AccountNavigator";

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");
const screenOptions = {
  headerShown: false,
  drawerStyle: {
    backgroundColor: "transparent",
    width: 0,
  },
  drawerType: "permanent",
  overlayColor: "transparent",
};
const CustomerNavigator = () => {
  const [fromCords] = useState({ x: 0, y: height });
  const [toCords] = useState({ x: width, y: 0 });
  const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;
  const { loading } = useNotifications();

  return (
    <>
      <ActivityIndicator visible={loading} />
      <DrawerAnimationContext.Provider
        value={{ fromCords, toCords, animatedValue }}
      >
        <NavigationContainer theme={navigationTheme}>
          <DrawerNavigator.Navigator
            screenOptions={screenOptions}
            drawerContent={(props) => {
              return (
                <CustomDrawer
                  navigation={props.navigation}
                  routes={props.state.routeNames}
                  selectedRoute={props.state.routeNames[props.state.index]}
                />
              );
            }}
          >
            <DrawerNavigator.Screen
              name="Dealers"
              component={DealersListNavigator}
            />
            <DrawerNavigator.Screen
              name="Received"
              component={ReceivedContractNavigator}
            />
            <DrawerNavigator.Screen name="All Ads" component={AdsNavigator} />
            <DrawerNavigator.Screen
              name="Stockpile"
              component={StockpileNavigator}
            />
            <DrawerNavigator.Screen name="Chat" component={RootNavigator} />
            <DrawerNavigator.Screen
              name="Account"
              component={AccountNavigator}
            />
          </DrawerNavigator.Navigator>
        </NavigationContainer>
      </DrawerAnimationContext.Provider>
    </>
  );
};

export default CustomerNavigator;
