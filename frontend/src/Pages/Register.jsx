import React, { useRef, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutPanel from '../components/AboutPanel';

function Register() {
  const navigate = useNavigate();
  const UserNameDom = useRef(null);
  const FirstNameDom = useRef(null);
  const LastNameDom = useRef(null);
  const EmailDom = useRef(null);
  const PasswordDom = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const username = UserNameDom.current.value;
    const firstname = FirstNameDom.current.value;
    const lastname = LastNameDom.current.value;
    const email = EmailDom.current.value;
    const password = PasswordDom.current.value;

    if (!username || !firstname || !lastname || !email || !password) {
      alert('please provide all required information');
      return;
    }

    try {
      await axios.post('/users/register', {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
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
          {/* Left Panel - Register Form */}
          <div className="flex-1 relative z-10 flex items-center w-full">
            <div className="relative z-10 bg-white rounded-lg p-11 md:p-6 w-full min-h-[538px] flex flex-col justify-center shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <h1 className="text-2xl font-semibold text-evangadi-heading mb-3 leading-tight text-center">
              Join the network
            </h1>
            <p className="text-sm text-gray-600 mb-7 leading-normal text-center">
              Already have an account? <Link to="/login" className="text-evangadi-orange underline hover:no-underline">
                Sign in
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mb-2">
              <div className="mb-4">
                {/* Design shows the field name inside the box only; the label is
                    kept for screen readers rather than dropped. */}
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={EmailDom}
                  className="w-full py-2.5 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                  placeholder="Email"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstname" className="sr-only">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    ref={FirstNameDom}
                    className="w-full py-2.5 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="sr-only">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    ref={LastNameDom}
                    className="w-full py-2.5 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  ref={UserNameDom}
                  className="w-full py-2.5 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                  placeholder="User Name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    ref={PasswordDom}
                    className="w-full py-2.5 px-4 pr-11 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                    placeholder="Password"
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

              <button
                type="submit"
                className="w-full bg-evangadi-blue text-white border-none py-3.5 px-5 text-base font-medium rounded cursor-pointer mt-3 transition-colors hover:bg-evangadi-blue-dark"
              >
                Agree and Join
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6 leading-normal">
              I agree to the{' '}
              <Link to="/" className="text-evangadi-orange underline hover:no-underline">privacy policy</Link>
              {' '}and{' '}
              <Link to="/" className="text-evangadi-orange underline hover:no-underline">terms of service</Link>.
            </p>

              <p className="text-center text-sm text-gray-600 mt-4">
                <Link to="/login" className="text-evangadi-orange underline hover:no-underline">
                  Already have an account?
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

export default Register;
