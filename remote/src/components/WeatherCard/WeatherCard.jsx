import React from "react";
import Paper from "@mui/material/Paper";
import { 
  WiThermometerExterior, 
  WiDaySunny, 
  WiDaySunnyOvercast, 
  WiCloudy, 
  WiFog, 
  WiRain, 
  WiSnow, 
  WiThunderstorm 
} from "weather-icons-react";

import "./WeatherCard.css";

const size = 28

const getWeatherIcon = (code) => {
  if (code === 0) {
    return <WiDaySunny size={size}/>
  } else if (code === 1 || code === 2) {
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

const WeatherCard = ({day, code, description, temp}) => {
  return (
    <div className="weather-card-container">
      <Paper>
        <div className="weather-card">
          {day}
          <div className="forecast">
            {getWeatherIcon(code)}
            {description}
            <WiThermometerExterior size={size}/>
            {temp}°C
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default WeatherCard;