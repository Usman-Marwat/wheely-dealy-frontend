import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import {
	Channel,
	InputGiphySearch,
	MessageInput,
	MessageList,
	useChatContext,
} from 'stream-chat-expo';

import AuthContext from '../auth/context';
import ActivityIndicator from '../components/ActivityIndicator';
import { InputBox } from './InputBox';
import BackButton from '../navigation/BackButton';
import MenuFoldButton from '../navigation/MenuFoldButton';

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
		<>
			<MenuFoldButton />
			<Channel
				channel={channel}
				Input={() => <InputBox targetIds={targetIds} sender={sender} />}
				InputGiphySearch={InputGiphySearch}
			>
				<MessageList />
				<MessageInput />
			</Channel>
		</>
	);
}
