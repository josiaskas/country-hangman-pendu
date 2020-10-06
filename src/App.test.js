import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('app charging', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/en charge/i);
  expect(linkElement).toBeInTheDocument();
});
