import React, { useState } from "react"
import ReactDOM from "react-dom"
import LocationSelect from "./components/LocationSelect/LocationSelect"
import WeatherCard from "./components/WeatherCard/WeatherCard"

import "./index.css"

const App = () => {
  return (
    <div className="container">
      <div>Name: remote</div>
      <div>Framework: react</div>
      <div>Description: Remote app exposing components</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
