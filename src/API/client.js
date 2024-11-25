import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.34.175:4000",
  // baseURL: "https://backend-6jva.onrender.com"
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
