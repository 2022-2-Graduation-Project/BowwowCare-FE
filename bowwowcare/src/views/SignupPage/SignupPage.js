import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

import { signup } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { ThemeContext } from "../../context/ThemeProvider";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../../utils/Validator";
import { colorVariants } from "../../utils/Dictionary";

const SignupPage = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (username) {
      if (nameValidator(username)) {
        setUsernameValid(true);
      } else {
        setUsernameValid(false);
      }
    }
  }, [username]);

  useEffect(() => {
    if (email) {
      if (emailValidator(email)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      if (passwordValidator(password)) {
        setPasswordValid(true);
      } else {
        setPasswordValid(false);
      }
    }
  }, [password]);

  useEffect(() => {
    if (password && confirmPassword) {
      handleConfirmPasswordValid();
    }
  }, [confirmPassword]);

  const handleSignup = (event) => {
    let dataToSubmit = {
      username: username,
      email: email,
      password: password,
    };

    setLoading(true);

    dispatch(signup(dataToSubmit))
      .then(() => {
        navigate("/login");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleConfirmPasswordValid = () => {
    if (password === confirmPassword) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  };

  const handleLogin = (e) => {
    navigate("/login");
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto px-8 w-screen h-screen">
      <Header />

      <div className="flex justify-center">
        <div className="w-screen md:w-4/5 lg:w-1/2 h-fit shadow-lg rounded-2xl flex flex-col justify-between px-12 pt-8 pb-16">
          <div>
            {message ||
            (username && !usernameValid) ||
            (email && !emailValid) ||
            (password && !passwordValid) ||
            (confirmPassword && !confirmPasswordValid) ? (
              <div className="flex h-12">
                <IconContext.Provider value={{ color: "red" }}>
                  <div>
                    <IoAlertCircleOutline fontSize="1.5rem" className="mr-2" />
                  </div>
                </IconContext.Provider>
                <div className="text-sm text-red-400">
                  {message
                    ? message
                    : username && !usernameValid
                    ? "이름은 한/영으로 두 글자 이상 15자 이하여야 합니다."
                    : email && !emailValid
                    ? "유효하지 않은 이메일입니다."
                    : password && !passwordValid
                    ? "비밀번호는 8자리 이상이어야 합니다."
                    : confirmPassword && !confirmPasswordValid
                    ? "비밀번호가 일치하지 않습니다."
                    : null}
                </div>
              </div>
            ) : (
              <div className="h-12" />
            )}
          </div>
          <form>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                이름
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-2 focus:${
                  colorVariants["border" + themeMode]
                } block w-full p-2.5`}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-2 focus:${
                  colorVariants["border" + themeMode]
                } block w-full p-2.5`}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-2 focus:${
                  colorVariants["border" + themeMode]
                } block w-full p-2.5`}
                required
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-2 focus:${
                  colorVariants["border" + themeMode]
                } block w-full p-2.5`}
                required
              />
            </div>
            <div className="mb-6">
              <Button
                onClick={handleSignup}
                disabled={loading}
                bgColor={themeMode}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>회원가입</span>
              </Button>
              {/* <button onClick={handleSignup} className="h-12 w-full font-bold rounded-md bg-main-color text-white text-center" disabled={loading || !confirmPasswordValid}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>회원가입</span>
                            </button> */}
            </div>
          </form>
          <div className="flex justify-end">
            <div className="mr-2">이미 멍멍케어에 가입했나요? </div>
            <button
              className={`${colorVariants["text" + themeMode]}`}
              onClick={handleLogin}
            >
              <span className="font-bold">로그인</span>
            </button>
          </div>
          {/* {message && (
                        <div className="alert alert-danger">
                            {message}
                        </div>
                    } */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
