import client from "./httpClient";

const endpoint = "/ad";

export const addCarAd = (carAd, onUploadProgress) => {
  const data = new FormData();
  data.append("title", carAd.title);
  data.append("contactNo", carAd.contactNo);
  data.append("price", carAd.price);
  data.append("model", carAd.model);
  data.append("engineCapacity", carAd.engineCapacity);
  data.append("dateTime", JSON.stringify(carAd.date));
  data.append("feulType", JSON.stringify(carAd.feultype));
  data.append("transmissiontype", JSON.stringify(carAd.transmissiontype));
  data.append("bodyType", JSON.stringify(carAd.bodyType));
  data.append("exteriorColor", JSON.stringify(carAd.exteriorColor));
  data.append("assemblyType", JSON.stringify(carAd.assemblyType));
  data.append("vehicleType", JSON.stringify(carAd.vehicleType));
  data.append("registerationCity", JSON.stringify(carAd.registerationCity));
  data.append("user", JSON.stringify(carAd.user));
  data.append("status", JSON.stringify(carAd.status));
  data.append("description", carAd.description); //
  data.append("mileage", carAd.mileage); //
  data.append("location", carAd.location); //
  data.append("longitude", carAd.longitude); //
  data.append("latitude", carAd.latitude); //

  carAd.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getSingleAd = (adId) =>
  client.get(`${endpoint}/getadbyid`, {
    params: {
      adId,
    },
  });

const getAds = (userId, pageNumber, pageSize) =>
  client.get(`${endpoint}/getuseradspaginated`, {
    params: {
      userId,
      pageNumber,
      pageSize,
    },
  });

//?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}

const check = () =>
  client.get("/games", {
    params: {
      ordering: "-released",
    },
  });

export default {
  addCarAd,
  getAds,
  getSingleAd,
};
