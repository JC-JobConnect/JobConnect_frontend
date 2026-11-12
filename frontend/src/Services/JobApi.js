import axios from "axios";
import { attachAuthInterceptors } from "./authInterceptor";

const jobsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/job/`,
});

attachAuthInterceptors(jobsApi);

export default jobsApi;