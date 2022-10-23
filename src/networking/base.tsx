import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://3083-95-181-67-30.eu.ngrok.io",
  timeout: 1000,
});
