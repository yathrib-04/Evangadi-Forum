import React, { useContext, useRef, useState } from 'react';
import { Appstate } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function AskQuestion() {
  const { user, setUser } = useContext(Appstate);
  const navigate = useNavigate();
  const titleDom = useRef(null);
  const descriptionDom = useRef(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleDom.current.value;
    const description = descriptionDom.current.value;

    if (!title || !description) {
      alert('Please provide both title and description');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/questions', {
        title,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Question posted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error posting question:', error);
      alert(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="w-full py-5 px-10 md:px-5 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="EVANGADI" className="h-7" />
          </div>
          <nav className="flex items-center gap-8 md:gap-4">
            <Link to="/" className="text-gray-800 no-underline text-base font-normal transition-colors hover:text-gray-600">
              Home
            </Link>
            <Link to="/" className="text-gray-800 no-underline text-base font-normal transition-colors hover:text-gray-600">
              How it Works
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-[#4285f4] text-white border-none py-2.5 px-6 text-sm font-medium rounded cursor-pointer transition-colors hover:bg-[#357ae8]"
            >
              LogOut
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-6 md:px-4 py-10 flex flex-col gap-8">
        {/* Steps Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Steps to write a good question
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 max-w-[520px] mx-auto text-left leading-relaxed">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>

        {/* Question Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
            Ask a public question
          </h2>
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800 mb-6 inline-block text-center w-full">
            Go to Question page
          </Link>

          <form onSubmit={handleSubmit} className="max-w-[640px] mx-auto text-left">
            <div className="mb-5">
              <input
                type="text"
                ref={titleDom}
                className="w-full py-3 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-[#4285f4]"
                placeholder="Title"
              />
            </div>

            <div className="mb-5">
              <textarea
                ref={descriptionDom}
                rows="8"
                className="w-full py-3 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-[#4285f4] resize-none"
                placeholder="Question Description..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#4285f4] text-white border-none py-3 px-6 text-base font-medium rounded cursor-pointer transition-colors hover:bg-[#357ae8] disabled:opacity-50 inline-flex items-center justify-center"
            >
              {loading ? 'Posting...' : 'Post Your Question'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AskQuestion;

