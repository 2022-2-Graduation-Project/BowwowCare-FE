import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import Header from "../../components/Header";
import { emailValidator, passwordValidator } from '../../utils/Validator';


const LoginPage = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState("");
    const [passwordValid, setPasswordValid] = useState("");

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        if (email) {
            if (emailValidator(email)) {
                setEmailValid(true);
            }
            else {
                setEmailValid(false);
            }
        }
        
    }, [email]);

    useEffect(() => {
        if (password) {
            if (passwordValidator(password)) {
                setPasswordValid(true);
            }
            else {
                setPasswordValid(false);
            }
        }
    }, [password]);

    const handleLogin = (event) => {
        let dataToSubmit = {
            email: email,
            password: password
        }

        setLoading(true);

        dispatch(login(dataToSubmit))
        .unwrap()
        .then(() => {
            navigate("/");
            window.location.reload();
        })
        .catch(() => {
            setLoading(false);
        });
    }

    const handleSignup = (e) => {
		navigate("/signup");
	}

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mx-auto px-8 w-screen h-screen">
            <Header />

            <div className="flex justify-center">
                <div className="w-screen md:w-4/5 lg:w-1/2 h-fit shadow-lg rounded-2xl flex flex-col justify-between px-12 pt-8 pb-16">
                    <div>
                        {message || (email && !emailValid) || (password && !passwordValid) ? (
                            <div className="flex h-12">
                                <IconContext.Provider value={{ color: "red" }}>
                                    <div>
                                        <IoAlertCircleOutline fontSize="1.5rem" className="mr-2" />
                                    </div>
                                </IconContext.Provider>
                                <div className="text-sm text-red-400">
                                    {message ? (
                                        message
                                    ) : (
                                        email && !emailValid ? (
                                            "유효하지 않은 이메일입니다."
                                        ) : (
                                            password && !passwordValid ? (
                                                "비밀번호는 8자리 이상이어야 합니다."
                                            ) : null
                                        )
                                    )}
                                </div>
                            </div>
                        ) : <div className="h-12" />}
                    </div>
                    <form>
                        <div className="mb-8">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-2 focus:border-main-color block w-full p-2.5" required />
                        </div> 
                        <div className="mb-8">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:border-2 focus:border-main-color block w-full p-2.5" required />
                        </div> 
                        <div className="mb-8">
                            <button onClick={handleLogin} className="h-12 w-full font-bold rounded-md bg-main-color text-white text-center" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>로그인</span>
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-end">
                        <div className="mr-2">멍멍케어가 처음이세요? </div>
                        <button className="text-main-color font-bold" onClick={handleSignup}>회원가입</button>
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

export default LoginPage;
