import client from "./httpClient";

const endpoint = "/search";

const getAds = (searchFor, searchField, pageNumber, pageSize) =>
  client.get(
    `${endpoint}?searchFor=${searchFor}&searchField=${searchField}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

export default {
  getAds,
};
