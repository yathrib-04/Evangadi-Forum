import React, { useContext, useEffect, useRef, useState } from 'react';
import { Appstate } from '../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosConfig';

function QuestionDetail() {
  const { user, setUser } = useContext(Appstate);
  const navigate = useNavigate();
  const { questionid } = useParams();
  const answerDom = useRef(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [questionid]);

  async function fetchQuestion() {
    try {
      const { data } = await axios.get(`/questions/${questionid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setQuestion(data.question);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching question:', error);
      setLoading(false);
    }
  }

  async function fetchAnswers() {
    try {
      const { data } = await axios.get(`/answers/${questionid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAnswers(data.answers || []);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const answer = answerDom.current.value;

    if (!answer) {
      alert('Please provide an answer');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/answers', {
        questionid,
        answer,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      answerDom.current.value = '';
      fetchAnswers();
      alert('Answer posted successfully!');
    } catch (error) {
      console.error('Error posting answer:', error);
      alert(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!question) {
    return <h2>Question not found</h2>;
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
      <main className="max-w-[900px] mx-auto px-8 md:px-5 py-12 flex flex-col gap-10">
        {/* Question Section */}
        <div className="pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">Question</h1>
          <p className="text-lg font-semibold text-black mb-1">{question.title}</p>
          {question.description && (
            <p className="text-sm text-gray-600">{question.description}</p>
          )}
        </div>

        {/* Answers Section */}
        <div className="pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Answer From The Community</h2>
          {answers.length === 0 ? (
            <p className="text-gray-600">No answers yet. Be the first to answer!</p>
          ) : (
            <div className="space-y-6">
              {answers.map((answer) => (
                <div key={answer.answerid} className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#666"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 text-center max-w-[60px] truncate">{answer.username}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-gray-800">{answer.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Answer The Top Question</h2>
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800 mb-6 inline-block text-center w-full">
            Go to Question page
          </Link>

          <form onSubmit={handleSubmit} className="max-w-[640px] mx-auto">
            <div className="mb-4">
              <textarea
                ref={answerDom}
                rows="8"
                className="w-full py-3 px-4 text-base border border-gray-300 rounded bg-white text-gray-800 transition-colors focus:outline-none focus:border-[#4285f4] resize-none"
                placeholder="Your Answer..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#4285f4] text-white border-none py-3 px-6 text-base font-medium rounded cursor-pointer transition-colors hover:bg-[#357ae8] disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post Your Answer'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default QuestionDetail;

