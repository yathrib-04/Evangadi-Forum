import React from 'react';
import { Link } from 'react-router-dom';
// White-on-transparent variant of the wordmark, for the dark footer.
import evangadiLogoWhite from './evangadi-logo-white.png';

function Footer() {
  return (
    <footer className="w-full bg-evangadi-dark py-14 px-10 md:py-10 md:px-5 text-white">
      {/* Wider than the page content, and columns sit at their natural widths
          spread by justify-between (measured 1507px, centred). */}
      <div className="max-w-[1500px] mx-auto flex justify-between items-start gap-[60px] lg:flex-row flex-col">
        <div>
          <div className="mb-5">
            <img src={evangadiLogoWhite} alt="EVANGADI" className="h-8 max-w-[180px] object-contain" />
          </div>
          <div className="flex gap-5">
            <a href="#" className="text-white no-underline transition-opacity hover:opacity-70" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.063 4.388 23.027 10.125 23.927v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.063 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-white no-underline transition-opacity hover:opacity-70" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-white no-underline transition-opacity hover:opacity-70" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Useful Link</h3>
          <div className="flex flex-col gap-4">
            <Link to="/how-it-works" className="text-white/90 no-underline text-base transition-colors hover:text-evangadi-orange">
              How it works
            </Link>
            <Link to="/" className="text-white/90 no-underline text-base transition-colors hover:text-evangadi-orange">
              Terms of Service
            </Link>
            <Link to="/" className="text-white/90 no-underline text-base transition-colors hover:text-evangadi-orange">
              Privacy policy
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Contact Info</h3>
          <div className="flex flex-col gap-4">
            <p className="text-base text-white/90">Evangadi Networks</p>
            <p className="text-base text-white/90">support@evangadi.com</p>
            <p className="text-base text-white/90">+1-202-386-2702</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
