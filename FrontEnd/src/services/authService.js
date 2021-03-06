import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(userName, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    userName,
    password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    // This catch handles the scenario where the JWT token does not exist in localStorage (user not logged in)
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const exportedObj = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

export default exportedObj;
