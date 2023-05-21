const send = (expoPushToken, title, subtitle, body) => {
	fetch('https://dull-knickers-cow.cyclic.app/api/messages', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			expoPushToken,
			title,
			subtitle,
			body,
		}),
	});
};

export default {
	send,
};
