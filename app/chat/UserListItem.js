import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

export default function UserListItem({ chatUser, user }) {
  const { client } = useChatContext();
  const navigation = useNavigation();

  const handlePress = async () => {
    const channel = client.channel("messaging", {
      members: [chatUser.id, user.user_id],
    });
    await channel.watch();
    navigation.navigate("Channel", { cid: channel.cid });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <Image style={styles.image} source={{ uri: chatUser.image }}></Image>
      <Text>{chatUser.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  root: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});
