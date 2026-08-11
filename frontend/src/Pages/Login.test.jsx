import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import axios from '../axiosConfig';
import { renderWithProviders, screen, waitFor } from '../test-utils';

jest.mock('../axiosConfig');

describe('Login', () => {
  it('labels both fields for screen readers even though the design hides labels', () => {
    renderWithProviders(<Login />, { route: '/login', path: '/login' });
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your password/i)).toBeInTheDocument();
  });

  it('masks the password until the reveal button is pressed', async () => {
    renderWithProviders(<Login />, { route: '/login', path: '/login' });
    const password = screen.getByLabelText(/your password/i);
    expect(password).toHaveAttribute('type', 'password');

    await userEvent.click(screen.getByRole('button', { name: /show password/i }));
    expect(password).toHaveAttribute('type', 'text');

    await userEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(password).toHaveAttribute('type', 'password');
  });

  it('does not call the API when a field is empty', async () => {
    renderWithProviders(<Login />, { route: '/login', path: '/login' });
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(axios.post).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('stores the token and sets the user on success', async () => {
    axios.post.mockResolvedValue({
      data: { token: 'jwt-token', username: 'testuser', userid: 7 },
    });

    const { setUser } = renderWithProviders(<Login />, { route: '/login', path: '/login' });

    await userEvent.type(screen.getByLabelText(/your email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/your password/i), 'Passw0rd!x');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(localStorage.getItem('token')).toBe('jwt-token'));
    expect(axios.post).toHaveBeenCalledWith('/users/login', {
      email: 'test@example.com',
      password: 'Passw0rd!x',
    });
    expect(setUser).toHaveBeenCalledWith({ username: 'testuser', userid: 7 });
  });

  it('surfaces the server error and stores no token on failure', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });

    renderWithProviders(<Login />, { route: '/login', path: '/login' });
    await userEvent.type(screen.getByLabelText(/your email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/your password/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Invalid credentials'));
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('offers a route to registration', () => {
    renderWithProviders(<Login />, { route: '/login', path: '/login' });
    const links = screen.getAllByRole('link', { name: /create a?n? new? ?account/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute('href', '/register'));
  });
});
