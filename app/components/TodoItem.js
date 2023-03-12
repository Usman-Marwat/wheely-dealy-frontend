import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

export default function TodoItem({ updateHandler, pressHandler, item }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => updateHandler(item.key)}>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.text}</Text>
      <TouchableOpacity onPress={() => pressHandler(item.key)}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 20,
    marginTop: 3.5,
  },
});
