import axios from "axios";
import { API_URL } from "../Config";

const signup = (data) => {
    return axios({
        method: 'post',
        url: `${API_URL}/sign/join`,
        data: data
    })
    .then(response => {
        return response.data;
    })
};

const login = (data) => {
    return axios({
        method: 'post',
        url: `${API_URL}/sign/login`,
        data: data
    })
    .then(response => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    })
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userImg");
};

const authService = {
    signup,
    login,
    logout,
};

export default authService;
