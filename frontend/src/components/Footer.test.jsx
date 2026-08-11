import React from 'react';
import Footer from './Footer';
import { renderWithProviders, screen } from '../test-utils';

describe('Footer', () => {
  it('links "How it works" to the real page', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('link', { name: /how it works/i })).toHaveAttribute(
      'href',
      '/how-it-works'
    );
  });

  it('renders the contact details', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('support@evangadi.com')).toBeInTheDocument();
    expect(screen.getByText('+1-202-386-2702')).toBeInTheDocument();
  });

  it('gives every social icon an accessible name', () => {
    renderWithProviders(<Footer />);
    for (const name of ['Facebook', 'Instagram', 'YouTube']) {
      expect(screen.getByLabelText(name)).toBeInTheDocument();
    }
  });

  it('uses the white logo variant so it is visible on the dark background', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByAltText('EVANGADI').getAttribute('src')).toMatch(/white/i);
  });
});
