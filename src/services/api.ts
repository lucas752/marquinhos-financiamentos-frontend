import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.16.208.113:8080",
});
