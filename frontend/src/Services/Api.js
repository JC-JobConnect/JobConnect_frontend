import axios from "axios";
import { attachAuthInterceptors } from "./authInterceptor";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Accept: "application/json",
  },
});


attachAuthInterceptors(api);

export default api;