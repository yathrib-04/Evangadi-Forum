import React, { useRef, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Appstate } from '../App';
import evangadiLogo from '../components/evangadi-logo.jpg';

function Login() {
  const { setUser } = useContext(Appstate);
  const navigate = useNavigate();
  const EmailDom = useRef(null);
  const PasswordDom = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = EmailDom.current.value;
    const password = PasswordDom.current.value;
    if (!email || !password) {
      alert('please provide all required information');
      return;
    }

    try {
      const response = await axios.post('/users/login', {
        email,
        password,
      });
      alert('Login successful!');
      localStorage.setItem('token', response.data.token);
      setUser({ username: response.data.username, userid: response.data.userid });
      navigate('/');
      console.log(response);
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong.');
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="w-full py-5 px-10 md:px-5 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={evangadiLogo} alt="EVANGADI" className="h-6 max-w-[120px] object-contain" />
          </div>
          <nav className="flex items-center gap-8 md:gap-4">
            <Link to="/" className="text-gray-800 no-underline text-base font-normal transition-all duration-200 hover:text-[#ff6b35] hover:underline hover:underline-offset-4">
              Home
            </Link>
            <Link to="/" className="text-gray-800 no-underline text-base font-normal transition-all duration-200 hover:text-[#ff6b35] hover:underline hover:underline-offset-4">
              How it Works
            </Link>
            <button className="bg-[#4285f4] text-white border-none py-2.5 px-6 md:py-2 md:px-4 text-sm md:text-xs font-medium rounded cursor-pointer uppercase tracking-wide transition-colors hover:bg-[#357ae8]">
              SIGN IN
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex w-full min-h-[calc(100vh-200px)] lg:flex-row flex-col">
        {/* Left Panel - Login Form */}
        <div className="flex-1 relative flex items-center justify-center py-[60px] px-10 md:py-10 md:px-5 overflow-hidden wavy-bg">
          <div className="relative z-10 bg-white rounded-lg py-10 px-6 md:py-8 md:px-5 w-full max-w-[380px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <h1 className="text-[28px] md:text-2xl font-semibold text-gray-800 mb-3 leading-tight">
              Login to your account
            </h1>
            <p className="text-sm text-gray-600 mb-6 leading-normal">
              Don't have an account? <Link to="/register" className="text-[#ff6b35] no-underline font-medium hover:underline">
                Create a new account
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={EmailDom}
                  className="w-full py-3 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-[#4285f4]"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                  Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    ref={PasswordDom}
                    className="w-full py-3 px-4 pr-11 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-[#4285f4]"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-gray-600 hover:opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {showPassword ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M1 1l22 22" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#ff6b35] text-white border-none py-3.5 px-6 text-base font-medium rounded cursor-pointer lowercase mt-2.5 transition-colors hover:bg-[#e55a2b]">
                submit
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-5">
              <Link to="/register" className="text-[#ff6b35] no-underline font-medium hover:underline">
                Create an account?
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Q&A Section */}
        <div className="flex-1 bg-white flex items-center justify-center py-[60px] px-10 md:py-10 md:px-5 relative overflow-hidden right-panel-bg">
          <div className="relative z-10 max-w-[600px] w-full">
            <h2 className="text-base font-semibold text-[#ff6b35] mb-4 uppercase tracking-wide">
              About
            </h2>
            <h1 className="text-[42px] md:text-3xl font-bold text-gray-800 mb-8 leading-tight">
              Evangadi Networks 
            </h1>
            <div className="mb-10">
              <p className="text-base leading-[1.8] text-gray-600 mb-5">
              No matter what stage of life you are in, whether you're just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow ir your footsteps. </p>
              <p className="text-base leading-[1.8] text-gray-600 mb-5">
              Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
            </div>
            <button className="bg-[#ff6b35] text-white border-none py-3.5 px-8 text-sm font-semibold rounded cursor-pointer uppercase tracking-wide transition-colors hover:bg-[#e55a2b]">
              HOW IT WORKS
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#34495e] py-12 px-10 md:py-10 md:px-5 text-white relative overflow-hidden login-footer">
        <div className="max-w-[1400px] mx-auto flex justify-between items-start gap-[60px] lg:flex-row flex-col relative z-10">
          <div className="flex-1">
            <div className="mb-5">
              <img src={evangadiLogo} alt="EVANGADI" className="h-5 max-w-[100px] object-contain" />
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-lg font-semibold transition-colors hover:bg-white/20" aria-label="Facebook">
                f
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-lg font-semibold transition-colors hover:bg-white/20" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full text-white no-underline text-lg font-semibold transition-colors hover:bg-white/20" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-5 uppercase tracking-wide">
              Useful Link
            </h3>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-white no-underline text-sm transition-colors hover:text-[#ff6b35]">
                How it works
              </Link>
              <Link to="/" className="text-white no-underline text-sm transition-colors hover:text-[#ff6b35]">
                Terms of Service
              </Link>
              <Link to="/" className="text-white no-underline text-sm transition-colors hover:text-[#ff6b35]">
                Privacy policy
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-5 uppercase tracking-wide">
              Contact Info
            </h3>
            <div className="flex flex-col gap-2.5">
              <p className="text-sm text-white leading-relaxed">Evangadi Networks</p>
              <p className="text-sm text-white leading-relaxed">support@evangadi.com</p>
              <p className="text-sm text-white leading-relaxed">+1-202-386-2702</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
