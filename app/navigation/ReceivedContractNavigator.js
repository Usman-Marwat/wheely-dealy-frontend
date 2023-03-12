import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import ReceivedContracts from "../screens/ReceivedContracts";
import ReceivedContractDetails from "../screens/ReceivedContractDetails";
import { options } from "./navigationOptions";
import BlogEditScreen from "../screens/BlogEditScreen";
import routes from "./routes";

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
            { id: `item.${item._id}.image` },
            { id: `item.${item._id}.bg` },
            { id: `item.${item._id}.meta` },
          ];
        }}
        options={options}
      />
      <Stack.Screen name={routes.BLOG_EDIT} component={BlogEditScreen} />
    </Stack.Navigator>
  );
}
