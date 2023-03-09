import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useChatContext } from "stream-chat-expo";

import UserListItem from "./UserListItem";
import AuthContext from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";
import MenuFoldButton from "../navigation/MenuFoldButton";

export default function UsersScreen() {
  const { user } = useContext(AuthContext);
  const [chatUsers, setChatUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useChatContext();

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await client.queryUsers({
      id: { $nin: ["usman-marwat", user.user_id] },
    });
    setChatUsers(response.users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{ paddingTop: 30 }}>
      <ActivityIndicator visible={!chatUsers} />
      <MenuFoldButton />
      <FlatList
        data={chatUsers}
        renderItem={({ item }) => <UserListItem chatUser={item} user={user} />}
        refreshing={isLoading}
        onRefresh={fetchUsers}
      />
    </View>
  );
}
