import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import App from '../App';
import AppRouter from "../routers/AppRouter";

test('renders The App Component without errors', () => {
  const { container, getByText } =   render(<App />);
  expect(getByText("Hi")).toBeInTheDocument()
});
