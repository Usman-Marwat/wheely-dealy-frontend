import client from "./httpClient";

const endpoint = "/search";

const getAds = (searchFor, searchField, pageNumber, pageSize) =>
  client.get(endpoint, {
    params: {
      searchFor,
      searchField,
      pageNumber,
      pageSize,
    },
  });

export default {
  getAds,
};
