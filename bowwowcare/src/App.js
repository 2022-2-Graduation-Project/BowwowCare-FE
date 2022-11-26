import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'

import HomePage from './views/HomePage';

import "tailwindcss/tailwind.css";

function App() {
  	return (
		<Routes>
			<Route path="/" element={ <HomePage/> } />
		</Routes>
  	);
}

export default App;
