import React from 'react';
import { render, prettyDOM } from '@testing-library/react';
import App from '../App';
import AppRouter from "../routers/AppRouter";

test('renders The App Component without errors', () => {
  const { getByText } =   render(<App />);
  expect(getByText((content, node) => {
        const hasText = (node) => node.textContent === "Get Access To Instant Fast Loans With Low Interest Rate.";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
            (child) => !hasText(child)
        );

        return nodeHasText && childrenDontHaveText;
      })
  ).toBeInTheDocument()
});
