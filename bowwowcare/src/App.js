import React, { useEffect, useCallback } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import "tailwindcss/tailwind.css";

import HomePage from './views/HomePage/HomePage'
import PreviewPage from './views/PreviewPage/PreviewPage';
import ResultsPage from './views/ResultsPage/ResultsPage';
import CameraPage from './views/CameraPage/CameraPage';
import ExaminationPage from './views/ExaminationPage/ExaminationPage';
import SolutionPage from './views/SolutionPage/SolutionPage';
import LoginPage from './views/LoginPage/LoginPage';
import SignupPage from './views/SignupPage/SignupPage';
import AdditionPage from "./views/AdditionPage/AdditionPage";
import PrivateRoute from "./PrivateRoute";
import PetInfoPage from "./views/PetInfoPage/PetInfoPage";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";


function App() {
	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const token = window.localStorage.getItem("user")

	const logOut = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);

	useEffect(() => {
		EventBus.on("logout", () => {
			logOut();
		});

		return () => {
			EventBus.remove("logout");
		};
	}, [currentUser, logOut]);

  	return (
		<Routes>
			<Route path="/" element={ <HomePage/> } />
			<Route path="/preview" element={ <PreviewPage /> } />
			<Route path="/results" element={ <ResultsPage /> } />
			<Route path="/camera" element={ <CameraPage /> } />
			<Route path="/examination" element={ <ExaminationPage /> } />
			<Route path="/solution" element={ <SolutionPage /> } />
			<Route path="/login" element={ <LoginPage /> } />
			<Route path="/signup" element={ <SignupPage /> } />
			<Route path="/addition" element={<AdditionPage/>} />
			<Route path="/petinfo/:id" element={<PetInfoPage/>} />
			{/* <Route path="/addition" element={<PrivateRoute component={<AdditionPage />} authenticated={token}/>} /> */}
		</Routes>
  	);
}

export default App;
