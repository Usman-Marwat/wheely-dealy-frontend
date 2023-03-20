import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import AdsEditScreen from "../screens/AdsEditScreen";
import AdsListDetailsScreen from "../screens/AdsListDetailsScreen";
import AdsListScreen from "../screens/AdsListScreen";
import BidsListScreen from "../screens/BidsListScreen";
import { options } from "./navigationOptions";
import routes from "./routes";

const Stack = createSharedElementStackNavigator();

const AdsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdsList" component={AdsListScreen} />
      <Stack.Screen
        name={routes.ADS_LIST_DETAIL}
        component={AdsListDetailsScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.modal` },
            { id: `item.${item.key}.image` },
            { id: `item.${item.key}.description` },
            { id: `item.${item.key}.price` },
            { id: `item.${item.key}.team` },
          ];
        }}
        options={options}
      />
      <Stack.Screen name={routes.ADS_EDIT} component={AdsEditScreen} />
      <Stack.Screen name={routes.BIDS_LIST} component={BidsListScreen} />
    </Stack.Navigator>
  );
};

export default AdsNavigator;
