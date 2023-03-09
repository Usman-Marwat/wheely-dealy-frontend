import client from "./client";

const login = (userInfo) => client.post("/auth", userInfo);

const refreshUserToken = (user_id, actor) =>
  client.get(`/auth/${user_id}/${actor}/refreshToken`);

export default {
  login,
  refreshUserToken,
};
