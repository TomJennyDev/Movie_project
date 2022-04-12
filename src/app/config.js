const apiConfig = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  originalImage: (imgPath) =>
    `${process.env.REACT_APP_BASE_URL_IMAGE}original/${imgPath}`,
  w500Image: (imgPath) =>
    `${process.env.REACT_APP_BASE_URL_IMAGE}w500/${imgPath}`,
  w220Image: (imgPath) =>
    `${process.env.REACT_APP_BASE_URL_IMAGE}w220_and_h330_face/${imgPath}`,
};

export default apiConfig;
