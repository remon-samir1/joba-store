import axios from "axios";
import Cookies from "cookie-universal";
export const baseURL = 'https://goba-ecommerce.sunmedagency.com/api'
const cookie = Cookies();
const token = cookie.get("token");
export const Axios = axios.create({
  baseURL: "https://goba-ecommerce.sunmedagency.com/api",

  headers: {
    Authorization: "Bearer " + token,

    "X-Guest-Token": "karl",
    "Content-Type":'application/json'
  },
});
