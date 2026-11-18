import axios from "axios";
import { API_CONFIG, USE_MOCK_DATA } from "../Config/base";
import { mockRequest } from "../Data/mockApi";

const http = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 30000,
});

http.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return Promise.resolve({
      success: true,
      data: response.data,
      statusCode: response.status,
    });
  },
  (error) => {
    return Promise.reject({
      success: false,
      error: error,
      message: error.response?.data?.message || error.message,
    });
  }
);

export const apiClient = {
  request(config) {
    if (USE_MOCK_DATA) return mockRequest(config);
    return http.request(config);
  },
};
