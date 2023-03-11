import { Easing } from "react-native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { options } from "./navigationOptions";
import Stockpile from "../screens/Stockpile";
import StockpileDetails from "../screens/StockpileDetails";

const Stack = createSharedElementStackNavigator();

const StockpileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StockpileScreen" component={Stockpile} />
      <Stack.Screen
        name="StockpileDetailsScreen"
        component={StockpileDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.photo` },
            { id: `item.${item.key}.shopName` },
          ];
        }}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default StockpileNavigator;
