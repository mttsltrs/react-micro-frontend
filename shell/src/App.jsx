import React from 'react'
import ReactDOM from 'react-dom'
import Forecast from 'remote/Forecast'

import './index.css'

const App = () => {
  return <Forecast/>
}

ReactDOM.render(<App />, document.getElementById('app'))
