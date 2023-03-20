import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { options } from "./navigationOptions";
import BlogsList from "../screens/BlogsList";
import BlogsListDetails from "../screens/BlogsListDetails";
import routes from "./routes";
import BlogEditScreen from "../screens/BlogEditScreen";

const Stack = createSharedElementStackNavigator();

const BlogsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.BLOG_LIST} component={BlogsList} />
      <Stack.Screen
        name={routes.BLOG_LIST_DETAILS}
        component={BlogsListDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.photo` },
            { id: `item.${item.key}.shopName` },
          ];
        }}
        options={options}
      />
      <Stack.Screen name={routes.BLOG_EDIT} component={BlogEditScreen} />
    </Stack.Navigator>
  );
};

export default BlogsNavigator;
