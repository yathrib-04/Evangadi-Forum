import React, { useContext, useRef, useState } from 'react';
import { Appstate } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Header from '../components/Header';
import useLogout from '../hooks/useLogout';

function AskQuestion() {
  const { user } = useContext(Appstate);
  const navigate = useNavigate();
  const handleLogout = useLogout();
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

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-[1300px] mx-auto px-6 md:px-4 py-10 flex flex-col gap-8">
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

          <form onSubmit={handleSubmit} className="text-left">
            <div className="mb-5">
              <input
                type="text"
                ref={titleDom}
                className="w-full py-3 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue"
                placeholder="Title"
              />
            </div>

            <div className="mb-5">
              <textarea
                ref={descriptionDom}
                rows="8"
                className="w-full py-3 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-evangadi-blue resize-none"
                placeholder="Question Description..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-evangadi-blue text-white border-none py-3 px-6 text-base font-medium rounded cursor-pointer transition-colors hover:bg-evangadi-blue-dark disabled:opacity-50 inline-flex items-center justify-center"
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

