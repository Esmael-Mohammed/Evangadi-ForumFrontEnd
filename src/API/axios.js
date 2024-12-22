import axios from "axios";
const axiosInstance = axios.create({
  //local baseURL
    // baseURL: "http://localhost:3003/api",
  //deployed base url
  baseURL: "https://evangadi-forum-backend-mnq9.onrender.com/api",
});
export default axiosInstance;
