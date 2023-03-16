import client from "./httpClient";

const patchToken = (user_id, expoPushToken) =>
  client.patch("/expoPushTokens", { user_id, expoPushToken });

export default {
  patchToken,
};
