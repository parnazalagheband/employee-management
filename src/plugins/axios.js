import axios from "axios";
import { BASE_URL } from "@/constants/general";
// import nofit from "@/plugins/notification.plugin";

const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = "parnaz-alagheband-6d5a9582-adc3-428e-8e83-17056dc48cb0";
    request.headers["Authorization"] = `Token ${token}`;
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
    const { errors } = error.response?.data || {};
    if (errors) {
      Object.keys(errors).forEach((key) => {
        // nofit.error(`${key}: ${errors[key][0]} !!`);
      });
    } else {
      // nofit.error("Something went wrong !!");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
