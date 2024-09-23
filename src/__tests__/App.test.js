import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'
import App from '../App';

global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          countries: [
            { value: 'AW', label: '🇦🇼 Aruba' },
            { value: 'AF', label: '🇦🇫 Afghanistan' },
          ],
        }),
      })
    );
  });

  test('renders and fetches countries on mount', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(fetch).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('🇦🇼 Aruba')).toBeInTheDocument();
    });
  });

  test('renders error message on fetch failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const errorMessage = await screen.findByText(/Error fetching countries:/i);
    expect(errorMessage).toBeInTheDocument(); 
  });

  test('loads more countries on scroll', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          countries: [
            { value: 'AW', label: '🇦🇼 Aruba' },
            { value: 'AF', label: '🇦🇫 Afghanistan' },
            { value: 'AO', label: '🇦🇴 Angola' },
            { value: 'AI', label: '🇦🇮 Anguilla' },
          ],
        }),
      })
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('🇦🇼 Aruba')).toBeInTheDocument();
    });

    window.scrollTo(0, document.documentElement.scrollHeight);
    window.dispatchEvent(new Event('scroll'));

    const additionalCountries = ['🇦🇴 Angola', '🇦🇮 Anguilla'];
    await waitFor(() => {
      additionalCountries.forEach(country => {
        expect(screen.getByText(country)).toBeInTheDocument();
      });
    });
  });
});
