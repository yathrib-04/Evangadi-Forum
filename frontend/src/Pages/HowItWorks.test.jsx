import React from 'react';
import HowItWorks from './HowItWorks';
import { renderWithProviders, screen } from '../test-utils';

describe('HowItWorks', () => {
  it('renders the four numbered steps', () => {
    renderWithProviders(<HowItWorks />, { route: '/how-it-works' });
    const steps = screen.getAllByRole('listitem');
    expect(steps).toHaveLength(4);
    expect(screen.getByText(/create your account/i)).toBeInTheDocument();
    expect(screen.getByText(/ask a question/i)).toBeInTheDocument();
    expect(screen.getByText(/answer and be answered/i)).toBeInTheDocument();
    expect(screen.getByText(/learn from the network/i)).toBeInTheDocument();
  });

  it('is reachable signed out and invites the visitor to register', () => {
    renderWithProviders(<HowItWorks />, { user: null, route: '/how-it-works' });
    expect(screen.getByRole('heading', { name: /ready to join the network/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create an account/i })).toHaveAttribute(
      'href',
      '/register'
    );
  });

  it('invites a signed-in user to ask a question instead', () => {
    renderWithProviders(<HowItWorks />, {
      user: { username: 'testuser', userid: 1 },
      route: '/how-it-works',
    });
    expect(screen.getByRole('heading', { name: /got a question in mind/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ask a question/i })).toHaveAttribute(
      'href',
      '/ask-question'
    );
  });

  it('shows SIGN IN when signed out and LogOut when signed in', () => {
    const { unmount } = renderWithProviders(<HowItWorks />, { route: '/how-it-works' });
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    unmount();

    renderWithProviders(<HowItWorks />, {
      user: { username: 'testuser', userid: 1 },
      route: '/how-it-works',
    });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});
