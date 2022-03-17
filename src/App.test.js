import React from 'react'
import App from './App';
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react'

beforeEach(() => {
	render(<App/>)
})

test('Component rendering', () => {
	const title = screen.getByTestId('principalBox')
	expect(title).toBeInTheDocument();
})

