import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/registerusers";

export function register(user) {
  return http.post(apiEndpoint, {
    realName: user.name,
    userName: user.username,
    password: user.password,
  });
}
