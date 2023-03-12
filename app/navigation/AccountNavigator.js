import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TodosScreen from "../screens/TodosScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={routes.TODOS} component={TodosScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
