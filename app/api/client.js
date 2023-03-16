import client from "./httpClient";

const endpoint = "/client";

const rateSeller = (rating) => client.post(`${endpoint}/rate`, rating);

const getAccountTypes = () => client.get(`${endpoint}/getaccounttypes`);

export default {
  getAccountTypes,
  rateSeller,
};
