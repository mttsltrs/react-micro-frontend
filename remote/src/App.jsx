import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Forecast from './modules/Forecast'
import Button from '@mui/material/Button'

import './index.css'

const App = () => {
	const navigate = useNavigate()
	return (
		<div className='app-container'>
			<div>Name: remote</div>
			<div>Framework: react</div>
			<div>
				Description: This app exposes the Forecast module via webpack.config.js
			</div>
			<Button variant='contained' onClick={() => navigate('/forecast')}>
				click to view module
			</Button>
		</div>
	)
}

const root = createRoot(document.getElementById('app'))
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/forecast' element={<Forecast />} />
		</Routes>
	</BrowserRouter>
)
