import axios from "axios";
import Cookies from "cookie-universal";

const cookie = Cookies();
const token = cookie.get("token");

const getGuestToken = () => {
  let guestToken = localStorage.getItem("guest_token");
  if (!guestToken) {
    guestToken = "guest_" + Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem("guest_token", guestToken);
  }
  return guestToken;
};

export const baseURL = "https://goba-ecommerce.sunmedagency.com/api";

export const Axios = axios.create({
  baseURL: baseURL,
});

Axios.interceptors.request.use((config) => {
  const guestToken = getGuestToken();
  config.headers["Authorization"] = "Bearer " + token;
  config.headers["X-Guest-Token"] = guestToken;
  return config;
});
