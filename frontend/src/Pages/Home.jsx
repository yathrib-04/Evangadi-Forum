import React, { useContext, useEffect, useState } from 'react';
import { Appstate } from '../App';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';
import Header from '../components/Header';
import useLogout from '../hooks/useLogout';

function Home() {
  const { user } = useContext(Appstate);
  const handleLogout = useLogout();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      const { data } = await axios.get('/questions');
      setQuestions(data.questions || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-[1300px] w-full mx-auto px-10 md:px-5 py-12">
        <div className="mb-10 flex justify-between items-center gap-4">
          <Link to="/ask-question">
            <button className="bg-evangadi-blue text-white border-none py-3 px-8 text-base font-medium rounded cursor-pointer transition-colors hover:bg-evangadi-blue-dark">
              Ask Question
            </button>
          </Link>
          <span className="text-gray-800 text-2xl md:text-lg">Welcome: {user?.username}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Questions</h1>

        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-600">No questions yet. Be the first to ask!</p>
        ) : (
          <div className="space-y-0 border-t border-gray-200">
            {questions.map((question) => (
              <Link
                key={question.questionid}
                to={`/question/${question.questionid}`}
                className="block border-b border-gray-200 py-6 px-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#ffffff"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600 text-center max-w-[80px] truncate">{question.username}</span>
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
      </main>
    </div>
  );
}

export default Home;
