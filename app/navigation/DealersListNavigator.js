import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import DealersListScreen from "../screens/DealersListScreen";
import DealersListDetailsScreen from "../screens/DealersListDetailsScreen";
import { options } from "./navigationOptions";
import routes from "./routes";

const Stack = createSharedElementStackNavigator();

const DealersListNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.DEALERSLIST} component={DealersListScreen} />
      <Stack.Screen
        name={routes.DEALERSLISTDETAILS}
        component={DealersListDetailsScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.bg` },
            { id: `item.${item._id}.bg` },
            { id: `item.${item.key}.name`, animation: "fade" },
            { id: `item.${item._id}.name`, animation: "fade" },
            { id: `item.${item.key}.image` },
            { id: `item.${item._id}.image` },
            { id: "general.bg" },
          ];
        }}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default DealersListNavigator;
