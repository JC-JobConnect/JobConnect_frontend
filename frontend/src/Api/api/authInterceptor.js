import axios from "axios";

let refreshPromise = null;

export function attachAuthInterceptors(apiInstance) {
  // Attach the current access token to every request.
  apiInstance.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // Refresh the access token when the backend returns 401.
  apiInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        originalRequest.url?.includes("token/")
      ) {
        return Promise.reject(error);
      }

      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Share one refresh request if several API calls fail together.
        if (!refreshPromise) {
          refreshPromise = axios
            .post("http://127.0.0.1:8000/api/token/refresh/", {
              refresh: refreshToken,
            })
            .then((response) => {
              const newAccessToken = response.data.access;

              sessionStorage.setItem("access_token", newAccessToken);

              return newAccessToken;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token.
        return apiInstance(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");

        window.dispatchEvent(new Event("authChanged"));

        return Promise.reject(refreshError);
      }
    }
  );
}