import client from "./httpClient";

const endpoint = "/seller";

const getAccountTypes = () => client.get(`${endpoint}/getTypes`);

export default {
  getAccountTypes,
  rateSeller,
};
