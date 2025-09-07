import axios from "axios";
import { BASE_URL } from "@/constants/general";
import { toast } from "@/plugins/toast"; 

const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = "parnaz-alagheband-6d5a9582-adc3-428e-8e83-17056dc48cb0";
    request.headers["Authorization"] = token;
    request.headers["Cache-Control"] = "no-cache";
    request.headers["Pragma"] = "no-cache";
    request.headers["Expires"] = "0";
    return request;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { errors, detail } = error.response?.data || {};

    if (errors) {
      Object.keys(errors).forEach((key) => {
        toast.error(`${key}: ${errors[key][0]}`);
      });
    } else if (detail) {
      toast.error(detail);
    } else {
      toast.error("در ارتباط با سرور مشکلی به‌وجود آمده است.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
