import axios from "axios";
import apiConfig from "./config";

const apiService = axios.create({
  baseURL: apiConfig.baseUrl,
});

apiService.interceptors.request.use(
  (request) => {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiService;
