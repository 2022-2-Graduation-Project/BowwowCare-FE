import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import HomePage from './views/HomePage';
import PreviewPage from './views/PreviewPage/PreviewPage';

import "tailwindcss/tailwind.css";

function App() {
  	return (
		<Routes>
			<Route path="/" element={ <HomePage/> } />
			<Route path="/preview" element={ <PreviewPage /> } />
		</Routes>
  	);
}

export default App;
