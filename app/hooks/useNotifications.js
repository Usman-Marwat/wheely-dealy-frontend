import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import expoPushTokensApi from '../api/expoPushTokens';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

// Required
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export default useNotifications = () => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const [loading, setLoading] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "You've got mail! 📬",
				body: 'Here is the notification body',
				data: { data: 'goes here' },
			},
			trigger: { seconds: 2 },
		});
	}

	async function registerForPushNotificationsAsync() {
		let token;

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted')
				return alert('Failed to get push token for push notification!');
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId: '55436dee-be2b-4e19-a9ed-cd025f5cecff',
				})
			).data;
			// console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		return token;
	}

	const patchToken = async (token) => {
		if (user.expoPushToken !== token.data) {
			console.log(user.actor + '  ' + token.data);
			setLoading(true);
			const result = await expoPushTokensApi.patchToken(
				user.user_id,
				token.data
			);
			if (result.ok) await refersh(result.data);
			setLoading(false);
		}
	};
	const refersh = async () => {
		const result = await authApi.refreshUserToken(
			user.user_id,
			user.actor.toLowerCase()
		);
		refreshUserToken(result.data);
	};

	return { loading };
};
