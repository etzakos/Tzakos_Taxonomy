import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";

export default function login(userName, password) {
  return http.post(apiEndpoint, {
    userName,
    password,
  });
}
