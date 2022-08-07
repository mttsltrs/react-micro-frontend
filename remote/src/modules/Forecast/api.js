import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getForecast = location => {
	return axios.get(`${BASE_URL}/weather`, {
		params: {
			location
		}
	})
}
