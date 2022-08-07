import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { getForecast } from './api'
import {
	WiThermometerExterior,
	WiDaySunny,
	WiDaySunnyOvercast,
	WiCloudy,
	WiFog,
	WiRain,
	WiSnow,
	WiThunderstorm
} from 'react-icons/wi'

import './Forecast.css'

const Forecast = () => {
	const locations = [
		{ key: 'dublin', value: 'Dublin' },
		{ key: 'amsterdam', value: 'Amsterdam' },
		{ key: 'geneva', value: 'Geneva' }
	]
	const [location, setLocation] = useState('')
	const [forecast, setForecast] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleChange = location => {
		setError(null)
		setLoading(true)
		getForecast(location)
			.then(res => {
				setForecast(res.data)
				setLocation(location)
			})
			.catch(error => setError(error))
			.finally(() => setLoading(false))
	}

	const size = 28

	const getWeatherIcon = code => {
		if (code === 0) {
			return <WiDaySunny size={size} />
		} else if (code <= 2) {
			return <WiDaySunnyOvercast size={size} />
		} else if (code === 3) {
			return <WiCloudy size={size} />
		} else if (code === 45) {
			return <WiFog size={size} />
		} else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
			return <WiRain size={size} />
		} else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
			return <WiSnow size={size} />
		} else if (code >= 95 && code <= 99) {
			return <WiThunderstorm size={size} />
		} else {
			return <WiDaySunny size={size} />
		}
	}

	return (
		<div className='forecast-container'>
			<FormControl fullWidth>
				<InputLabel id='select-label'>City</InputLabel>
				<Select
					labelId='select-label'
					id='select'
					value={location}
					label='City'
					onChange={e => handleChange(e.target.value)}
				>
					{locations?.map(l => (
						<MenuItem key={l.key} value={l.key}>
							{l.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{loading ? (
				<div className='loading'>
					<CircularProgress />
				</div>
			) : (
				forecast.map((f, i) => (
					<div key={i} className='weather-card-container'>
						<Paper>
							<div className='weather-card'>
								{f.day}
								<div className='forecast'>
									{getWeatherIcon(f.code)}
									{f.description}
									<WiThermometerExterior size={size} />
									{f.temp}°C
								</div>
							</div>
						</Paper>
					</div>
				))
			)}

			{error && (
				<div className='error'>
					<Alert severity='error' onClose={() => setError(null)}>
						Something went wrong!
					</Alert>
				</div>
			)}
		</div>
	)
}

export default Forecast
