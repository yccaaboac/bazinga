import axios from "axios";
import Config from "@/settings";
import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASE_API : "/", // api的base_url
  timeout: Config.timeout, // 请求超时时间z
});

//request拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["Authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response拦截器
service.interceptors.response.use((response) => {
  return response.data;
});

export default service;
