import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import axios from '../axiosConfig';
import { renderWithProviders, screen, waitFor } from '../test-utils';

jest.mock('../axiosConfig');

const Secret = () => <div>secret content</div>;

describe('ProtectedRoute', () => {
  it('redirects to /login when there is no token', async () => {
    renderWithProviders(
      <ProtectedRoute>
        <Secret />
      </ProtectedRoute>
    );
    await waitFor(() => expect(screen.getByText('login page')).toBeInTheDocument());
    expect(screen.queryByText('secret content')).not.toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('renders the child once the token is verified', async () => {
    localStorage.setItem('token', 'good-token');
    axios.get.mockResolvedValue({ data: { username: 'testuser', userid: 1 } });

    const { setUser } = renderWithProviders(
      <ProtectedRoute>
        <Secret />
      </ProtectedRoute>
    );

    await waitFor(() => expect(screen.getByText('secret content')).toBeInTheDocument());
    expect(setUser).toHaveBeenCalledWith({ username: 'testuser', userid: 1 });
  });

  it('clears an invalid token and redirects', async () => {
    localStorage.setItem('token', 'expired-token');
    axios.get.mockRejectedValue({ response: { status: 401 } });

    renderWithProviders(
      <ProtectedRoute>
        <Secret />
      </ProtectedRoute>
    );

    await waitFor(() => expect(screen.getByText('login page')).toBeInTheDocument());
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('does not trust a malformed verification response', async () => {
    localStorage.setItem('token', 'weird-token');
    axios.get.mockResolvedValue({ data: { unexpected: true } });

    renderWithProviders(
      <ProtectedRoute>
        <Secret />
      </ProtectedRoute>
    );

    await waitFor(() => expect(screen.getByText('login page')).toBeInTheDocument());
    expect(localStorage.getItem('token')).toBeNull();
  });
});
