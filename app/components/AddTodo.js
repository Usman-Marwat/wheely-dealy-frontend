import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function AddTodo({
  submitHandler,
  toggleBtns,
  updateText,
  updateCurrent,
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(updateText);
  }, [updateText]);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        onChangeText={setText}
        value={text}
      />
      {!toggleBtns && (
        <View style={styles.container}>
          <Button title="Add Todo" onPress={() => submitHandler(text)} />
        </View>
      )}
      {toggleBtns && (
        <View style={styles.container}>
          <Button title="Update" onPress={() => updateCurrent(text)} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  btnWrapper: {
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 140,
    borderRadius: 7,
    marginHorizontal: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
