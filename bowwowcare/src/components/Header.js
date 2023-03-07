import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../slices/auth";

import "../font.css";

import { ThemeContext } from './../context/ThemeProvider.js';


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

	return (
		<div>
		<div className="flex flex-row justify-between items-center my-10">
			<div className={`text-xl font-bold text-left`} onClick={handleGoHome}>
			<span style={{ fontFamily: "Tenada" }} className={themeMode === `primary`?`text-primary-theme` : themeMode === `secondary` ? `text-secondary-theme` : `text-third-theme`}>멍멍케어</span>
			</div>
			{window.location.pathname==="/login" ? (
				null
			) : (
				JSON.parse(localStorage.getItem("user")) ? (
					<button className="text-right" onClick={() => dispatch(logout())}>로그아웃</button>
				) : (
					<button className="text-right" onClick={handleLogin}>로그인</button>
				)
			)}
		</div>
		</div>
	);
}

export default Header;
