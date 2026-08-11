import React from 'react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { renderWithProviders, screen } from '../test-utils';

describe('Header', () => {
  it('shows SIGN IN linking to /login when signed out', () => {
    renderWithProviders(<Header />);
    const signIn = screen.getByRole('link', { name: /sign in/i });
    expect(signIn).toHaveAttribute('href', '/login');
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('shows LogOut instead when an onLogout handler is supplied', () => {
    renderWithProviders(<Header onLogout={jest.fn()} />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /sign in/i })).not.toBeInTheDocument();
  });

  it('calls onLogout when the button is clicked', async () => {
    const onLogout = jest.fn();
    renderWithProviders(<Header onLogout={onLogout} />);
    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('points "How it Works" at the real page, not a dead link', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute(
      'href',
      '/how-it-works'
    );
  });

  it('renders the logo with accessible alt text', () => {
    renderWithProviders(<Header />);
    expect(screen.getByAltText('EVANGADI')).toBeInTheDocument();
  });
});
