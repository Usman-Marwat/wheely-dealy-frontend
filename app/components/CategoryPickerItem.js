import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";

import Icon from "./Icon";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {item.image ? (
          <Image style={styles.image} source={{ uri: item.image }} />
        ) : (
          <Icon
            backgroundColor={item.backgroundColor}
            name={item.icon}
            size={80}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    color: "#ff355e",
  },
  image: {
    width: 50,
    height: 50,
    fontSize: 12,
  },
});

export default CategoryPickerItem;
