import axios from "axios";

const API_URL = "http://localhost:8080/users/";

const signup = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        })
        // .catch((error) => {
        //     if (error?.response?.data?.details) {
        //         return error.response.data.details
        //     }
        // })
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
