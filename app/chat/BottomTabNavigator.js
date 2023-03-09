import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ChannelListScreen from "./ChannelListScreen";
import UsersScreen from "./UsersScreen";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="list" component={ChannelListScreen} />
      <Tab.Screen name="users" component={UsersScreen} />
    </Tab.Navigator>
  );
}
