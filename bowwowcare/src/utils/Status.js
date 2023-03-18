export const isLogin = () => !!localStorage.getItem("user");
export const isProfile = () => JSON.parse(localStorage.getItem("userImg"));