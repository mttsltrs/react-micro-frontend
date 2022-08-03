import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { 
  WiThermometerExterior, 
  WiDaySunny, 
  WiDaySunnyOvercast, 
  WiCloudy, 
  WiFog, 
  WiRain, 
  WiSnow, 
  WiThunderstorm 
} from 'weather-icons-react'

import './Forecast.css'

const Forecast = () => {
  const locations = [
    { key: 'dublin', value: 'Dublin'},
    { key: 'amsterdam', value: 'Amsterdam'},
    { key: 'geneva', value: 'Geneva'}
  ]
  const [location, setLocation] = useState('')
  const [forecast, setForecast] = useState([])

  const handleChange = (value) => {
    axios.get('http://localhost:3000/weather', {
      params: { 
        location: value
      }
    }).then(res => {
      setForecast(res.data)
      setLocation(value)
    }).catch(error => console.error(error))
  }

  const size = 28

  const getWeatherIcon = (code) => {
    if (code === 0) {
      return <WiDaySunny size={size}/>
    } else if (code <= 2) {
      return <WiDaySunnyOvercast size={size}/>
    } else if (code === 3) {
      return <WiCloudy size={size}/>
    } else if (code === 45) {
      return <WiFog size={size}/>
    } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) ) {
      return <WiRain size={size}/>
    } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86) ) {
      return <WiSnow size={size}/>
    } else if ((code >= 95 && code <= 99) ) {
      return <WiThunderstorm size={size}/>
    } else {
      return <WiDaySunny size={size}/>
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
          { locations?.map(l => (<MenuItem key={l.key} value={l.key}>{ l.value }</MenuItem>)) }
        </Select>
      </FormControl>
      {
        forecast.map((f, i) => (
          <div key={i} className='weather-card-container'>
          <Paper>
            <div className='weather-card'>
              {f.day}
              <div className='forecast'>
                {getWeatherIcon(f.code)}
                {f.description}
                <WiThermometerExterior size={size}/>
                {f.temp}°C
              </div>
            </div>
          </Paper>
        </div>
        ))
      }
    </div>
  )
}

export default Forecast
