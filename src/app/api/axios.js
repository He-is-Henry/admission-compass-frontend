import axios from "axios";
import { tokenStore } from "../lib/tokenStore";

const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://admission-compass-backend.onrender.com",
  withCredentials: true,
});

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  queue = [];
};

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (original.url === "/login" || original.url === "/refresh") {
      return Promise.reject(error);
    }

    // if a refresh is already in flight, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      })
        .then((token) => {
          original.headers["Authorization"] = `Bearer ${token}`;
          return api(original);
        })
        .catch((err) => Promise.reject(err));
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const res = await api.get("/refresh");
      const newToken = res.data.accessToken;
      tokenStore.set(newToken);
      processQueue(null, newToken); // unblock all queued requests with new token
      return api(original);
    } catch (err) {
      processQueue(err, null); // reject all queued requests
      tokenStore.clear();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
