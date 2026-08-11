import React from 'react';
import userEvent from '@testing-library/user-event';
import Home from './Home';
import axios from '../axiosConfig';
import { renderWithProviders, screen, waitFor } from '../test-utils';

jest.mock('../axiosConfig');

const user = { username: 'testuser', userid: 1 };

const questions = [
  { questionid: 'q-1', title: "what's react-router-dom?", username: 'misrak_Z' },
  { questionid: 'q-2', title: 'what is http?', username: 'danny_gir_admin' },
];

describe('Home', () => {
  it('lists the questions with their authors', async () => {
    axios.get.mockResolvedValue({ data: { questions } });
    renderWithProviders(<Home />, { user });

    await waitFor(() =>
      expect(screen.getByText("what's react-router-dom?")).toBeInTheDocument()
    );
    expect(screen.getByText('what is http?')).toBeInTheDocument();
    expect(screen.getByText('misrak_Z')).toBeInTheDocument();
  });

  it('links each question to its detail page', async () => {
    axios.get.mockResolvedValue({ data: { questions } });
    renderWithProviders(<Home />, { user });

    // Wait for the questions themselves - the header already has links, so
    // waiting on "any link" would pass before the list has rendered.
    await waitFor(() =>
      expect(screen.getByText("what's react-router-dom?")).toBeInTheDocument()
    );
    expect(
      screen.getByRole('link', { name: /what's react-router-dom/i })
    ).toHaveAttribute('href', '/question/q-1');
  });

  it('shows an empty state rather than an error when there are no questions', async () => {
    axios.get.mockResolvedValue({ data: { questions: [] } });
    renderWithProviders(<Home />, { user });

    await waitFor(() =>
      expect(screen.getByText(/no questions yet/i)).toBeInTheDocument()
    );
  });

  it('greets the signed-in user', async () => {
    axios.get.mockResolvedValue({ data: { questions: [] } });
    renderWithProviders(<Home />, { user });
    expect(screen.getByText(/welcome:\s*testuser/i)).toBeInTheDocument();
  });

  it('does not crash when the user is cleared during logout', async () => {
    // Regression: Home read user.username unguarded, so clearing the user on
    // logout threw a TypeError mid-render.
    axios.get.mockResolvedValue({ data: { questions: [] } });
    expect(() => renderWithProviders(<Home />, { user: null })).not.toThrow();
  });

  it('clears the token and leaves the page on logout', async () => {
    localStorage.setItem('token', 'jwt-token');
    axios.get.mockResolvedValue({ data: { questions: [] } });

    const { setUser } = renderWithProviders(<Home />, { user });
    await userEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => expect(screen.getByText('login page')).toBeInTheDocument());
    expect(localStorage.getItem('token')).toBeNull();
    expect(setUser).toHaveBeenCalledWith(null);
  });

  it('offers a link to ask a question', async () => {
    axios.get.mockResolvedValue({ data: { questions: [] } });
    renderWithProviders(<Home />, { user });
    expect(screen.getByRole('link', { name: /ask question/i })).toHaveAttribute(
      'href',
      '/ask-question'
    );
  });
});
