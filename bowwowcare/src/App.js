import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import HomePage from './views/HomePage';
import PreviewPage from './views/PreviewPage/PreviewPage';
import ResultsPage from './views/ResultsPage/ResultsPage';
import CameraPage from './views/CameraPage/CameraPage';
import ExaminationPage from './views/ExaminationPage/ExaminationPage';
import SolutionPage from './views/SolutionPage/SolutionPage'

import "tailwindcss/tailwind.css";

function App() {
  	return (
		<Routes>
			<Route path="/" element={ <HomePage/> } />
			<Route path="/preview" element={ <PreviewPage /> } />
			<Route path="/results" element={ <ResultsPage /> } />
			<Route path="/camera" element={ <CameraPage /> } />
			<Route path="/examination" element={ <ExaminationPage /> } />
			<Route path="/solution" element={ <SolutionPage /> } />
		</Routes>
  	);
}

export default App;
