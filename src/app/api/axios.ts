import axios from "axios";
import { tokenStore } from "../lib/tokenStore";

const RESOURCE_MAP: Record<string, string> = {
  "/login": "login",
  "/signup": "signup",
  "/forgot": "password reset",
  "/verify": "token verification",
  "/reset": "password reset",
  "/password": "password adding",
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  queue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
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

    if (error.response?.status === 429) {
      const url = original.url as string;
      const resource = RESOURCE_MAP[url] ?? "this action";
      const resetHeader = error.response.headers["ratelimit-reset"];
      console.log("resetHeader:", resetHeader);
      console.log("parsed:", parseInt(resetHeader));
      console.log("Date.now():", Date.now());
      console.log("resetTime:", Date.now() + parseInt(resetHeader) * 1000);
      const resetTime = resetHeader
        ? Date.now() + parseInt(resetHeader) * 1000
        : Date.now() + 60 * 1000;

      // trigger is imported wherever this interceptor is initialised
      // see note below
      console.log("Should be opening modal");
      window.__triggerRateLimit?.(resource, resetTime);
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (original.url === "/login" || original.url === "/refresh") {
      return Promise.reject(error);
    }

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
      processQueue(null, newToken);
      return api(original);
    } catch (err) {
      processQueue(err, null);
      tokenStore.clear();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
