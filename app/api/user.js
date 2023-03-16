import client from "./httpClient";

const endpoint = "/user";

const followUser = (followData) =>
  client.post(`${endpoint}/follow`, followData);

export default {
  followUser,
};
