import axios from "axios";

let refreshPromise = null;

export function attachAuthInterceptors(apiInstance) {
  const API_URL = import.meta.env.VITE_API_URL;
  // 1. Attach access token
  apiInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // 2. Auto refresh on 401
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        originalRequest.url?.includes("/token/")
      ) {
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${API_URL}/api/token/refresh/`, {
              refresh: refreshToken,
            })
            .then((res) => {
              const newAccessToken = res.data.access;
              localStorage.setItem("access_token", newAccessToken);
              return newAccessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.dispatchEvent(new Event("authChanged"));
        return Promise.reject(refreshError);
      }
    }
  );
}