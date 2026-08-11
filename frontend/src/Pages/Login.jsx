import React, { useRef, useState, useContext } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Appstate } from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutPanel from '../components/AboutPanel';

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
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full auth-bg">
        {/* Content sits in the same centred container as the header/footer, split
            into two equal halves - the card fills the left half edge to edge. */}
        <div className="max-w-[1180px] mx-auto w-full flex lg:flex-row flex-col gap-10 lg:gap-6 px-6 lg:px-0 py-10 items-center">
          {/* Left Panel - Login Form */}
          <div className="flex-1 relative z-10 flex items-center w-full">
            <div className="relative z-10 bg-white rounded-lg p-11 md:p-6 w-full min-h-[538px] flex flex-col justify-center shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <h1 className="text-2xl font-semibold text-evangadi-heading mb-3 leading-tight text-center">
              Login to your account
            </h1>
            <p className="text-sm text-gray-600 mb-7 leading-normal text-center">
              Don't have an account? <Link to="/register" className="text-evangadi-orange underline hover:no-underline">
                Create a new account
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mb-2">
              <div className="mb-4">
                {/* Design shows the field name inside the box only; the label is
                    kept for screen readers rather than dropped. */}
                <label htmlFor="email" className="sr-only">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={EmailDom}
                  className="w-full py-2.5 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    ref={PasswordDom}
                    className="w-full py-2.5 px-4 pr-11 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                    placeholder="Your Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 flex items-center justify-center text-gray-600 hover:opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {!showPassword ? (
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
              <div className="flex justify-center">
                <button type="submit" className="bg-evangadi-orange text-white border-none py-3 px-16 text-base font-medium rounded cursor-pointer lowercase mt-3 transition-colors hover:bg-evangadi-orange-dark">
                  submit
                </button>
              </div>
            </form>
              <p className="text-center text-sm text-gray-600 mt-5">
                <Link to="/register" className="text-evangadi-orange underline hover:no-underline">
                  Create an account?
                </Link>
              </p>
            </div>
          </div>

          {/* Right Panel - Q&A Section */}
          <AboutPanel />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
