import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import App from '../App';
import AppRouter from "../routers/AppRouter";

test('renders The App Component without errors', () => {
  const { getByText } =   render(<App />);
  expect(getByText("Get Access To Instant Fast Loans With Low Interest Rate.")).toBeInTheDocument()
});
