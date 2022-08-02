const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { format, addDays, parseISO } = require('date-fns')

const app = express()
const port = 3000

const getDescription = (code) => {
    switch(code) {
        case 0: return 'Clear sky'
        case 1: return 'Mainly clear'
        case 2: return 'Partly cloudy'
        case 3: return 'Overcast'
        case 45: return 'Foggy'
        case 51: return 'Light drizzle'
        case 52: return 'Moderate drizzle'
        case 55: return 'Dense drizzle'
        case 56: return 'Ligt freezing drizzle'
        case 57: return 'Dense freezing drizzle'
        case 61: return 'Light rain'
        case 63: return 'Moderate rain'
        case 65: return 'Heavy rain'
        case 66: return 'Light freezing rain'
        case 67: return 'Heavy freezing rain'
        case 71: return 'Light snow fall' 
        case 73: return 'Moderate snow fall' 
        case 75: return 'Heavy snow fall'
        case 77: return 'Snow grains' 
        case 80: return 'Light rain showers'
        case 81: return 'Moderate rain showers'
        case 82: return 'Heavy rain showers'
        case 85: return 'Light snow showers'
        case 86: return 'Heavy snow showers'
        case 95: return 'Thunderstorms'
        case 96: return 'Light thunderstorms with hail'
        case 99: return 'Heavy thunderstorms with hail'
        default: return 'Unsupported weather code'
    }
}

const getDay = (date) => {
    return format(parseISO(date), 'EEEE')
}

app.use(cors())

app.get('/weather', (req, res) => {
    const location = req.query.location

    if(location) {
        axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: { name: location }
        }).then(geo => {
            const { latitude, longitude } = geo.data.results[0]
            const startDate = format(new Date(), 'yyyy-MM-dd')
            const endDate = format(addDays(new Date(), 4), 'yyyy-MM-dd')

            axios.get('https://api.open-meteo.com/v1/forecast', {
                params: { 
                    latitude, 
                    longitude,
                    start_date: startDate,
                    end_date: endDate,
                    daily: 'weathercode,temperature_2m_max',
                    timezone: 'UTC'
                }
            }).then(response => {
                const { daily } = response.data
                const { weathercode: weatherCodes, time: dates, temperature_2m_max: temps } = daily

                const forecast = weatherCodes.reduce((arr, code, i) => 
                    ([...arr, { day: getDay(dates[i]), temp: temps[i], code, description: getDescription(code) }]), [])
                
                res.status(response.status).json(forecast)
            }).catch(error => console.error(error))

        }).catch(error => console.error(error))
    } else {
        res.status(400).json({ message: 'request must contain a city: \'/weather?location={city}\'' })
    }
})

app.listen(port, () => console.log(`🌦️\tapi listening on port ${port}`))