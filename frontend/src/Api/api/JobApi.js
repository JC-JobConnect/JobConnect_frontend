import axios from "axios";

const jobsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/job/",
});

jobsApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default jobsApi;