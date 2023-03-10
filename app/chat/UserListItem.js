import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

const SPACING = 20;

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
    <TouchableOpacity onPress={handlePress} style={styles.itemWrapper}>
      <Image style={styles.image} source={{ uri: chatUser.image }}></Image>

      <View style={{ flexShrink: 1 }}>
        <Text style={styles.name}>{chatUser.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: SPACING,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
});
