import axios from "axios";
import keys from "../config/keys";
const axiosInstance = axios.create({
  baseURL: keys.base_url,
});

export default axiosInstance;
