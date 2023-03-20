import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { options } from "./navigationOptions";
import routes from "./routes";
import Received from "../screens/Received";
import ReceivedDetails from "../screens/ReceivedDetails";

const Stack = createSharedElementStackNavigator();

export default function ReceivedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.RECEIVED} component={Received} />
      <Stack.Screen
        name={routes.RECEIVED_DETAILS}
        component={ReceivedDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item._id}.image` },
            { id: `item.${item._id}.bg` },
            { id: `item.${item._id}.meta` },
          ];
        }}
        options={options}
      />
    </Stack.Navigator>
  );
}
