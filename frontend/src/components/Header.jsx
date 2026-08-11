import React from 'react';
import { Link } from 'react-router-dom';
import evangadiLogo from './evangadi-logo.png';

// Shared site header. Pass `onLogout` on authenticated pages to get the LogOut
// button; without it the header shows a SIGN IN link instead.
function Header({ onLogout }) {
  return (
    <header className="w-full bg-white py-6 px-10 md:px-5 shadow-[0_1px_4px_rgba(0,0,0,0.07)] relative z-20">
      {/* Narrower than the page content on purpose - in the design the logo sits
          inboard of the card's left edge (measured 832px, centred). */}
      <div className="max-w-[860px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={evangadiLogo} alt="EVANGADI" className="h-7 max-w-[150px] object-contain" />
        </Link>
        <nav className="flex items-center gap-9 md:gap-4">
          <Link to="/" className="text-gray-700 no-underline text-base font-normal transition-colors duration-200 hover:text-evangadi-orange">
            Home
          </Link>
          <Link to="/how-it-works" className="text-gray-700 no-underline text-base font-normal transition-colors duration-200 hover:text-evangadi-orange">
            How it Works
          </Link>
          {onLogout ? (
            <button
              onClick={onLogout}
              className="bg-evangadi-blue text-white border-none py-2.5 px-10 md:px-6 text-base font-normal rounded cursor-pointer transition-colors hover:bg-evangadi-blue-dark"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-evangadi-blue text-white no-underline py-2.5 px-10 md:px-6 text-sm font-medium rounded uppercase tracking-wide transition-colors hover:bg-evangadi-blue-dark"
            >
              SIGN IN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
