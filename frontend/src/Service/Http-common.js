import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// request header which will add token to authorize user who use tool
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
