import React from "react";
import { StyleSheet, View } from "react-native";

import iconComponents from "../config/icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  style,
  family = "mci",
}) {
  const RenderComponent = iconComponents[family];
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
        styles.container,
        style,
      ]}
    >
      <RenderComponent name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

/* 
    {
      {family === "antDesign" && (
        <AntDesign name={name} color={iconColor} size={size} />
      )}
      {family === "ionicons" && (
        <Ionicons name={name} color={iconColor} size={size} />
      )}
      {family === "mci" && (
        <MaterialCommunityIcons name={name} color={iconColor} size={size} />
      )} 
    } 

-----------------------------
//we see that background color is not accessible here in styles. (if we are not using inline styling then)
//For that we would need to have a global variable and a state variable to update that global variable.
// const styles = StyleSheet.create({
//   container: {
//     width: size,
//     height: size,
//     borderRadius: size / 2,
//     backgroundColor,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
*/
export default Icon;
