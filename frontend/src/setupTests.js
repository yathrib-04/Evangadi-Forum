// react-router v7 expects TextEncoder/TextDecoder, which the jsdom bundled with
// react-scripts 5 does not provide. Polyfill from Node before anything imports it.
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

import '@testing-library/jest-dom';

// jsdom does not implement window.alert, and the pages use it for feedback.
beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  window.localStorage.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});
