import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://20.124.82.95:5000",
  withCredentials: true,
});

export default axiosInstance;
