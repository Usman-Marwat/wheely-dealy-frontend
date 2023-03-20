import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import AuthContext from "../auth/context";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import MenuFoldButton from "../navigation/MenuFoldButton";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Screen style={styles.screen}>
      <MenuFoldButton />
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={user.image}
          onPress={() => navigation.navigate(routes.PROFILE)}
        />
      </View>

      <ListItem
        title="Log-Out"
        IconComponent={<Icon name="logout" backgroundColor="red" />}
        onPress={() => setUser(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    paddingTop: 50,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
