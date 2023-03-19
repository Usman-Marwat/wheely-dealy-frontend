const send = (expoPushToken, title, subtitle, body) => {
  fetch("wheely-dealy-backend-production.up.railway.app/api/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
