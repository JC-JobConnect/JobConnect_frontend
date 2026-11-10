import axios from "axios";
import { attachAuthInterceptors } from "./authInterceptor";

const jobsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/job/",
});

attachAuthInterceptors(jobsApi);

export default jobsApi;