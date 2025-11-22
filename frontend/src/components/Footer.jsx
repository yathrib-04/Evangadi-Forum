import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-[#34495e] py-12 px-10 md:py-10 md:px-5 text-white relative overflow-hidden login-footer">
      <div className="max-w-[1400px] mx-auto flex justify-between items-start gap-[60px] lg:flex-row flex-col relative z-10">
        <div className="flex-1">
          <div className="mb-5">
            <img src="/logo-evangadi.svg" alt="EVANGADI" className="h-6" />
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-lg font-semibold transition-colors hover:bg-white/20" aria-label="Facebook">
              f
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-lg font-semibold transition-colors hover:bg-white/20" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-lg font-semibold transition-colors hover:bg-white/20" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white mb-5 uppercase tracking-wide">Useful Link</h3>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-white no-underline text-base transition-colors hover:text-[#ff6b35]">
              How it works
            </Link>
            <Link to="/" className="text-white no-underline text-base transition-colors hover:text-[#ff6b35]">
              Terms of Service
            </Link>
            <Link to="/" className="text-white no-underline text-base transition-colors hover:text-[#ff6b35]">
              Privacy policy
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-white mb-5 uppercase tracking-wide">Contact Info</h3>
          <div className="flex flex-col gap-2.5">
            <p className="text-base text-white leading-relaxed">Evangadi Networks</p>
            <p className="text-base text-white leading-relaxed">support@evangadi.com</p>
            <p className="text-base text-white leading-relaxed">+1-202-386-2702</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
 