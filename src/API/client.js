import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.172.218:4000",
  // baseURL: "https://medi-booker-backend.onrender.com"
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
