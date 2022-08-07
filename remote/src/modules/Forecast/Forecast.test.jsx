import React from 'react'
import {
	fireEvent,
	render,
	screen,
	waitForElementToBeRemoved
} from '@testing-library/react'
import Forecast from './Forecast'
import nock from 'nock'

const URL = 'http://localhost:3000'
const PATH = '/weather?location=dublin'
const nockReplyHeaders = {
	'access-control-allow-origin': '*',
	'access-control-allow-credentials': 'true'
}

const response = [
	{ day: 'Sunday', temp: 17.6, code: 61, description: 'Light rain' },
	{ day: 'Monday', temp: 20, code: 3, description: 'Overcast' },
	{ day: 'Tuesday', temp: 23, code: 3, description: 'Overcast' },
	{ day: 'Wednesday', temp: 25, code: 2, description: 'Partly cloudy' },
	{ day: 'Thursday', temp: 25.6, code: 45, description: 'Foggy' }
]

describe('<Forecast />', () => {
	it('renders select', () => {
		const { container } = render(<Forecast />)
		expect(container).toMatchSnapshot()
	})

	it('renders with loading', async () => {
		nock(URL).defaultReplyHeaders(nockReplyHeaders).get(PATH).reply(200)

		const { container } = render(<Forecast />)

		fireEvent.mouseDown(screen.getByRole('button'))
		fireEvent.click(screen.getByText(/dublin/i))

		expect(container).toMatchSnapshot()
	})

	it('renders with forecast', async () => {
		nock(URL)
			.defaultReplyHeaders(nockReplyHeaders)
			.get(PATH)
			.reply(200, response)

		const { container } = render(<Forecast />)

		fireEvent.mouseDown(screen.getByRole('button'))
		fireEvent.click(screen.getByText(/dublin/i))

		await waitForElementToBeRemoved(screen.getByRole('progressbar'))

		expect(container).toMatchSnapshot()
	})

	it('renders with error', async () => {
		nock(URL).defaultReplyHeaders(nockReplyHeaders).get(PATH).reply(500)

		const { container } = render(<Forecast />)

		fireEvent.mouseDown(screen.getByRole('button'))
		fireEvent.click(screen.getByText(/dublin/i))

		await waitForElementToBeRemoved(screen.getByRole('progressbar'))

		expect(container).toMatchSnapshot()
	})
})
