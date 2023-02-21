import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

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
};

const authService = {
    signup,
    login,
    logout,
};

export default authService;
