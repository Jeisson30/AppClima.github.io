import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Home from './home';

jest.mock('axios');

describe('Home', () => {
  test('renders search form', () => {
    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search City ...');
    const searchButton = screen.getByRole('button');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('fetches weather data on form submission', async () => {
    const data = {
      name: 'London',
      sys: {
        country: 'GB',
      },
      weather: [
        {
          icon: '01d',
          description: 'clear sky',
        },
      ],
      main: {
        temp: 283.16,
        humidity: 87,
      },
      dt: 1621013128,
    };
    axios.get.mockResolvedValueOnce({ data });

    render(<Home />);
    const searchInput = screen.getByPlaceholderText('Search City ...');
    const searchButton = screen.getByRole('button');
    fireEvent.change(searchInput, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await screen.findByText(/London, GB/);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('London'));
    expect(screen.getByText(/clear sky/)).toBeInTheDocument();
    expect(screen.getByText(/9°C/)).toBeInTheDocument();
    expect(screen.getByText(/87%/)).toBeInTheDocument();
    expect(screen.getByText(/15\/05\/2021/)).toBeInTheDocument();
  });
});
