import React from "react";
import { SendButton, useMessageInputContext } from "stream-chat-expo";

import useApi from "../hooks/useApi";
import messagesApi from "../api/messages";

export const CustomSendButton = ({ sender, targetIds }) => {
  const { sendMessage, text } = useMessageInputContext();
  const sendApi = useApi(messagesApi.send);

  const handleMessage = async () => {
    await sendApi.request(
      "Chat",
      // targetIds[0],
      "63390ba766243cb0ff33ecd5",
      "Chat Notification",
      `From the sender ${sender}`,
      text
    );
    sendMessage();
  };

  return <SendButton sendMessage={handleMessage} />;
};
