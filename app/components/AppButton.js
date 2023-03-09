import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  style,
  subTitle,
  titleStyle,
  disabled,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        style,
        { opacity: disabled ? 0.3 : 1 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, titleStyle]}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    // flexDirection: "row",
    // marginVertical: 10,
    /* we removed this margin and added the "spaceViews" on the welcome screen to make our buttons 
    more general. Because we could be using the button somewhere else where we don't need margin */
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.white,
    fontSize: 11,
  },
});

export default AppButton;
