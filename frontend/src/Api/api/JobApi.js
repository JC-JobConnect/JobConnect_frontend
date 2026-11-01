import axios from "axios";

const jobsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/job/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token
jobsApi.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default jobsApi;