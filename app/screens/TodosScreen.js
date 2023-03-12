import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AddTodo from "../components/AddTodo";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";

export default function TodosScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [toggleBtns, setToggleBtns] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [updateKey, setUpdateKey] = useState("");

  const getData = async () => {
    let items = await AsyncStorage.getItem("@todos_me");
    var parsed = await JSON.parse(items);
    if (parsed) setTodos(parsed);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateHandler = (key) => {
    todos.forEach((todo, index) => {
      if (todo.key === key) {
        setUpdateText(todo.text);
        setUpdateKey(key);
      }
    });
    setToggleBtns(!toggleBtns);
  };

  const pressHandler = (key) => {
    Alert.alert("Delete!", "Are You sure want to remove this todo?", [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.setItem(
            "@todos_me",
            JSON.stringify(todos.filter((todo) => todo.key != key))
          );
          getData();
        },
      },
      { text: "No" },
    ]);
  };

  const updateCurrent = (text) => {
    let newTodos = [...todos];
    if (text.length > 3) {
      newTodos.forEach((todo) => {
        if (todo.key === updateKey) todo.text = text;
      });
      //this component rerender below was important after setting th
      setToggleBtns(!toggleBtns);
      setUpdateText("");
      AsyncStorage.setItem("@todos_me", JSON.stringify(newTodos));
      getData();
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      await AsyncStorage.getItem("@todos_me", (err, result) => {
        const todo = [{ text, key: Math.random().toString() }];
        if (result !== null) {
          var newTodos = JSON.parse(result).concat(todo);
          AsyncStorage.setItem("@todos_me", JSON.stringify(newTodos));
        } else AsyncStorage.setItem("@todos_me", JSON.stringify(todo));
      });
      getData();
    } else
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("Alert closed") },
      ]);
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo
          submitHandler={submitHandler}
          toggleBtns={toggleBtns}
          updateText={updateText}
          updateCurrent={updateCurrent}
        />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                pressHandler={pressHandler}
                toggleBtns={toggleBtns}
                setToggleBtns={setToggleBtns}
                updateHandler={updateHandler}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyList}>
                There is not Data in the List
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 30,
  },
  content: {
    padding: 40,
    // marginBottom: 30,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  emptyList: {
    marginTop: 70,
    textAlign: "center",
  },
});
