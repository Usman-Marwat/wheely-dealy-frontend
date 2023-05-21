import React from 'react';
import { SendButton, useMessageInputContext } from 'stream-chat-expo';

import messagesApi from '../api/messages';

export const CustomSendButton = ({ sender, targetIds }) => {
	const { sendMessage, text } = useMessageInputContext();

	const handleMessage = () => {
		messagesApi.send(
			'ExponentPushToken[xp6616HRvXwaFCf9cs2lSA]',
			'Chat Notification',
			`From the sender ${sender}`,
			text
		);
		sendMessage();
	};

	return <SendButton sendMessage={handleMessage} />;
};
