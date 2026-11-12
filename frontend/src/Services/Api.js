import axios from "axios";
import { attachAuthInterceptors } from "./authInterceptor";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});


attachAuthInterceptors(api);

export default api;