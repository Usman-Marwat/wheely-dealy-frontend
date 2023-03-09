import { useState, useEffect, useContext } from "react";
import React from "react";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
  InputGiphySearch,
} from "stream-chat-expo";
import _ from "lodash";

import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";
import { InputBox } from "./InputBox";

export default function ChannelScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const cid = route.params?.cid;
  const { client } = useChatContext();

  const getChannel = async () => {
    const channel = await client.queryChannels({
      cid: cid,
    });
    setChannel(channel[0]);
  };

  useEffect(() => {
    getChannel();
  }, []);

  if (channel === null) return <ActivityIndicator visible={true} />;
  const targetIds = _.pull(Object.keys(channel?.state.members), user.user_id);
  const sender = channel._client._user.name;

  return (
    <Channel
      channel={channel}
      Input={() => <InputBox targetIds={targetIds} sender={sender} />}
      InputGiphySearch={InputGiphySearch}
    >
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
