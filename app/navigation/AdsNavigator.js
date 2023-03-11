import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import AdsListDetailsScreen from "../screens/AdsListDetailsScreen";
import AdsListScreen from "../screens/AdsListScreen";
import { options } from "./navigationOptions";

const Stack = createSharedElementStackNavigator();

const AdsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OngoingContracts" component={AdsListScreen} />
      <Stack.Screen
        name="OngoingContractsDetails"
        component={AdsListDetailsScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item._id}.modal` },
            { id: `item.${item._id}.image` },
            { id: `item.${item._id}.description` },
            { id: `item.${item._id}.team` },
          ];
        }}
        options={options}
      />
    </Stack.Navigator>
  );
};

export default AdsNavigator;
