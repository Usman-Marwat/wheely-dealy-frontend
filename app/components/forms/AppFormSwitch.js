import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import colors from "../../config/colors";

const AppFormSwitch = ({ placeholder = "Some", name }) => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{placeholder}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={values[name] ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setFieldValue(name, !values[name])}
        value={values[name]}
        style={{ marginVertical: 10 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.light,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.medium,
  },
});
export default AppFormSwitch;
