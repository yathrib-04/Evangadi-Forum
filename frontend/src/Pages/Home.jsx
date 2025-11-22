import React, { useContext, useEffect, useState } from 'react';
import { Appstate } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

function Home() {
  const { user, setUser } = useContext(Appstate);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const { data } = await axios.get('/questions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setQuestions(data.questions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
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
      <main className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-12 flex justify-center">
        <div className="max-w-[1400px] w-full px-10 md:px-5">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/ask-question">
            <button className="bg-[#4285f4] text-white border-none py-3 px-6 text-base font-medium rounded cursor-pointer transition-colors hover:bg-[#357ae8]">
              Ask Question
            </button>
          </Link>
          <span className="text-gray-800 text-base">Welcome: {user.username}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Questions</h1>

        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-600">No questions yet. Be the first to ask!</p>
        ) : (
          <div className="space-y-0">
            {questions.map((question) => (
              <Link
                key={question.questionid}
                to={`/question/${question.questionid}`}
                className="block border-b border-gray-200 py-4 px-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#666"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 text-center max-w-[60px] truncate">{question.username}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base text-gray-800">{question.title}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        </div>
      </main>
    </div>
  );
}

export default Home;
