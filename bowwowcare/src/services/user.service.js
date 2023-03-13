import axios from "axios";
import authHeader from "./auth-header";
//import { API_URL } from "../Config";

const API_URL = "http://localhost:8080/api/user";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get("http://localhost:8080/api/v1/user" , { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService
