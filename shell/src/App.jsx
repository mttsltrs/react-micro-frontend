import React, { useState } from "react"
import ReactDOM from "react-dom"
import LocationSelect from "remote/LocationSelect"
import WeatherCard from "remote/WeatherCard"
import axios from "axios"

import "./index.css"

const App = () => {
  const locations = [
    { key: "dublin", value: "Dublin"},
    { key: "amsterdam", value: "Amsterdam"},
    { key: "geneva", value: "Geneva"}
  ]
  const [location, setLocation] = useState("")
  const [forecast, setForecast] = useState([])

  const handleChange = (value) => {
    axios.get("http://localhost:3000/weather", {
      params: { 
        location: value
      }
    }).then(res => {
      setForecast(res.data)
      setLocation(value)
    }).catch(error => console.error(error))
  }

  return (
    <div className="container">
      <LocationSelect location={location} setLocation={handleChange} locations={locations}/>
      {
        forecast.map((f, i) => (
          <WeatherCard 
            key={i} 
            day={f.day} 
            code={f.code} 
            description={f.description} 
            temp={f.temp}
          />
        ))
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
