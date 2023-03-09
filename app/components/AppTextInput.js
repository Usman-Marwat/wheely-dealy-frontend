import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import defaultStyles from "../config/styles";
import iconComponents from "../config/icons";

function AppTextInput({
  icon,
  family = "mci",
  backgroundColor = defaultStyles.colors.light,
  marginHorizontal,
  minHeight,
  width = "100%",
  ...otherProps
}) {
  const IconFamilyComponent = iconComponents[family];
  return (
    <View style={[styles.container, { width, backgroundColor, minHeight }]}>
      {icon && (
        <IconFamilyComponent
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
