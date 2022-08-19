const request = require('supertest')
const nock = require('nock')
const app = require('./server')

const geoResponse = {
	results: [
		{
			latitude: 100,
			longitude: 100
		}
	]
}

const forecastResponse = {
	daily: {
		time: [
			'2022-08-08',
			'2022-08-09',
			'2022-08-10',
			'2022-08-11',
			'2022-08-12',
			'2022-08-13',
			'2022-08-14',
			'2022-08-15',
			'2022-08-16',
			'2022-08-17',
			'2022-08-18',
			'2022-08-19',
			'2022-08-20',
			'2022-08-21',
			'2022-08-22',
			'2022-08-23',
			'2022-08-24',
			'2022-08-25',
			'2022-08-26',
			'2022-08-27',
			'2022-08-28',
			'2022-08-29',
			'2022-08-30',
			'2022-08-31',
			'2022-09-01',
			'2022-09-02',
			'2022-09-03',
			'2022-09-04'
		],
		weathercode: [0, 1, 2, 3, 45, 51, 52, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99, -1],
		temperature_2m_max: [...Array(28).keys()]
	}
}

const expectedResponse = [
	{ day: 'Monday', temp: 0, code: 0, description: 'Clear sky' },
	{ day: 'Tuesday', temp: 1, code: 1, description: 'Mainly clear' },
	{ day: 'Wednesday', temp: 2, code: 2, description: 'Partly cloudy' },
	{ day: 'Thursday', temp: 3, code: 3, description: 'Overcast' },
	{ day: 'Friday', temp: 4, code: 45, description: 'Foggy' },
	{ day: 'Saturday', temp: 5, code: 51, description: 'Light drizzle' },
	{ day: 'Sunday', temp: 6, code: 52, description: 'Moderate drizzle' },
	{ day: 'Monday', temp: 7, code: 55, description: 'Dense drizzle' },
	{
		day: 'Tuesday',
		temp: 8,
		code: 56,
		description: 'Ligt freezing drizzle'
	},
	{
		day: 'Wednesday',
		temp: 9,
		code: 57,
		description: 'Dense freezing drizzle'
	},
	{ day: 'Thursday', temp: 10, code: 61, description: 'Light rain' },
	{ day: 'Friday', temp: 11, code: 63, description: 'Moderate rain' },
	{ day: 'Saturday', temp: 12, code: 65, description: 'Heavy rain' },
	{
		day: 'Sunday',
		temp: 13,
		code: 66,
		description: 'Light freezing rain'
	},
	{
		day: 'Monday',
		temp: 14,
		code: 67,
		description: 'Heavy freezing rain'
	},
	{
		day: 'Tuesday',
		temp: 15,
		code: 71,
		description: 'Light snow fall'
	},
	{
		day: 'Wednesday',
		temp: 16,
		code: 73,
		description: 'Moderate snow fall'
	},
	{
		day: 'Thursday',
		temp: 17,
		code: 75,
		description: 'Heavy snow fall'
	},
	{ day: 'Friday', temp: 18, code: 77, description: 'Snow grains' },
	{
		day: 'Saturday',
		temp: 19,
		code: 80,
		description: 'Light rain showers'
	},
	{
		day: 'Sunday',
		temp: 20,
		code: 81,
		description: 'Moderate rain showers'
	},
	{
		day: 'Monday',
		temp: 21,
		code: 82,
		description: 'Heavy rain showers'
	},
	{
		day: 'Tuesday',
		temp: 22,
		code: 85,
		description: 'Light snow showers'
	},
	{
		day: 'Wednesday',
		temp: 23,
		code: 86,
		description: 'Heavy snow showers'
	},
	{ day: 'Thursday', temp: 24, code: 95, description: 'Thunderstorms' },
	{
		day: 'Friday',
		temp: 25,
		code: 96,
		description: 'Light thunderstorms with hail'
	},
	{
		day: 'Saturday',
		temp: 26,
		code: 99,
		description: 'Heavy thunderstorms with hail'
	},
	{
		day: 'Sunday',
		temp: 27,
		code: -1,
		description: 'Unsupported weather code'
	}
]

describe('GET /weather', () => {
	it('should return forecast with day and description', async () => {
		nock('https://geocoding-api.open-meteo.com')
			.filteringPath(path => '/v1/search')
			.get('/v1/search')
			.reply(200, geoResponse)

		nock('https://api.open-meteo.com')
			.filteringPath(path => '/v1/forecast')
			.get('/v1/forecast')
			.reply(200, forecastResponse)

		const response = await request(app).get('/weather?location=belfast')
		expect(response.body).toStrictEqual(expectedResponse)
	})

	it('should return an error when location is not present', async () => {
		const errorMessage = "request must contain a city: '/weather?location={city}'"
		const response = await request(app).get('/weather')
		expect(response.body.message).toBe(errorMessage)
	})

	it('should catch and return an error when a fails', async () => {
		nock('https://geocoding-api.open-meteo.com')
			.filteringPath(path => '/v1/search')
			.get('/v1/search')
			.reply(500)

		const response = await request(app).get('/weather?location=belfast')
		expect(response.error.text).toBe('Unable to fetch forecast')
	})
})
