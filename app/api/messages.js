import client from "./client";

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
