import React, { useContext } from 'react'
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../slices/auth";

import "../font.css";

import { ThemeContext } from './../context/ThemeProvider.js';
import { colorVariants } from '../utils/Dictionary';

function Header() {
	const [themeMode, setThemeMode] = useContext(ThemeContext);
	const navigate = useNavigate();
    const dispatch = useDispatch();

	const handleGoHome = (e) => {
		navigate("/");
	}

	const handleLogin = (e) => {
		navigate("/login");
	}

	const handleLogout = (e) => {
		dispatch(logout());
		navigate("/");
	}

	const handleUser = (e) => {
		navigate("user");
	}
	
	return (
		<div>
		<div className="flex flex-row justify-between items-center my-10">
			<div className={`text-xl font-bold text-left`} onClick={handleGoHome}>
			<span style={{ fontFamily: "Tenada" }} className={`${colorVariants['text'+themeMode]}`}>멍멍케어</span>
			</div>
			{window.location.pathname==="/login" ? (
				null
			) : (
				JSON.parse(localStorage.getItem("user")) ? (
					window.location.pathname === "/user" ? <button className="text-right" onClick={handleLogout}>로그아웃</button> : window.location.pathname === "/" ? 
					<button onClick={handleUser} >
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="bi bi-person fill-gray-500" viewBox="0 0 16 16">
  						<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
						</svg>
					</button> : null
				) : (
					<button className="text-right" onClick={handleLogin}>로그인</button>
				)
			)}
		</div>
		</div>
	);
}

export default Header;
