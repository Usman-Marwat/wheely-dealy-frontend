import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import ReceivedContracts from "../screens/ReceivedContracts";
import ReceivedContractDetails from "../screens/ReceivedContractDetails";

const Stack = createSharedElementStackNavigator();

export default function ReceivedContractNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecievedContracts" component={ReceivedContracts} />
      <Stack.Screen
        name="RecievedContractDetails"
        component={ReceivedContractDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.bg` },
            { id: `item.${item.key}.image` },
            { id: `item.${item.key}.meta`, animation: "fade" },
          ];
        }}
      />
    </Stack.Navigator>
  );
}
