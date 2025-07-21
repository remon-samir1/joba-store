import axios from "axios";
import Cookies from "cookie-universal";

const cookie = Cookies()
const token = cookie.get('token')
export const Axios = axios.create({
  baseURL: "https://goba-ecommerce.sunmedagency.com/api",

  headers: {
    Authorization: 'Bearer ' + token ,

    // 'X-Gust-Token': Math.random(),
  },
});
