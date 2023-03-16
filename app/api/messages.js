import client from "./httpClient";

const send = (actor, id, title, subtitle, body) =>
  client.post(`/messages/${actor}`, {
    id,
    title,
    subtitle,
    body,
  });

export default {
  send,
};
