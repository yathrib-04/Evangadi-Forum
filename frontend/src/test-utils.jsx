import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Appstate } from './App';

// Stub destinations, used to assert that navigation happened.
const DESTINATIONS = [
  ['/login', 'login page'],
  ['/register', 'register page'],
  ['/how-it-works', 'how it works page'],
  ['/ask-question', 'ask question page'],
];

// Renders a component inside the router and app context the pages expect.
// `user` seeds the context; `route` sets the initial URL.
export function renderWithProviders(
  ui,
  { user = null, setUser = jest.fn(), route = '/', path = '*' } = {}
) {
  // A stub must never shadow the component under test, so drop any stub that
  // would match the route being rendered.
  const stubs = DESTINATIONS.filter(([p]) => p !== route && p !== path);

  const result = render(
    <Appstate.Provider value={{ user, setUser }}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
          {stubs.map(([p, label]) => (
            <Route key={p} path={p} element={<div>{label}</div>} />
          ))}
        </Routes>
      </MemoryRouter>
    </Appstate.Provider>
  );
  return { ...result, setUser };
}

export * from '@testing-library/react';
