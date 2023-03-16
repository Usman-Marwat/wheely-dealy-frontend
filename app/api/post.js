import client from "./httpClient";

const endpoint = "/post";

const createPost = (post, onUploadProgress) => {
  const data = new FormData();
  data.append("text", post.text);
  data.append("userId", post.userId);

  post.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.post(`${endpoint}/createPost`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  createPost,
};
