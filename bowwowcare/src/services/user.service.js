import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../Config";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "/user" , { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService
