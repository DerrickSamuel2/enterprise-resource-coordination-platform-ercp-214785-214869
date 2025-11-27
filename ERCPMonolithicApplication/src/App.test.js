import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app and shows navigation', async () => {
  render(<App />);
  // Theme toggle should be present
  const button = await screen.findByRole('button', { name: /switch to/i });
  expect(button).toBeInTheDocument();
});
