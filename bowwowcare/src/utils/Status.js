export const isLogin = () => !!localStorage.getItem("user");
export const isProfile = () => localStorage.getItem("userImg");