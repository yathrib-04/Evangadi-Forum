import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLogout from '../hooks/useLogout';

const STEPS = [
  {
    title: 'Create your account',
    body: 'Sign up with your name, email and a password. It takes under a minute and gives you access to every question and answer on the network.',
  },
  {
    title: 'Ask a question',
    body: 'Summarise your problem in a one-line title, then describe what you tried and what you expected to happen. The clearer the question, the faster the answer.',
  },
  {
    title: 'Answer and be answered',
    body: 'Browse questions from the community and share what you know. Every answer is credited to its author, so your contributions build your reputation.',
  },
  {
    title: 'Learn from the network',
    body: 'Whether you are just starting out or mentoring others, the archive of questions and answers grows more useful to everyone with each contribution.',
  },
];

// Public page - reachable from the header, footer and the auth pages, whether
// or not the visitor is signed in.
function HowItWorks() {
  const { user } = useContext(Appstate);
  const logout = useLogout();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header onLogout={user ? logout : undefined} />

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="w-full auth-bg">
          <div className="max-w-[1180px] mx-auto w-full px-6 py-20 md:py-12 relative z-10">
            <h2 className="text-base font-medium text-evangadi-orange mb-4">How it Works</h2>
            <h1 className="text-[42px] md:text-3xl font-bold text-evangadi-heading mb-6 leading-tight max-w-[720px]">
              A question and answer network built by the Evangadi community
            </h1>
            <p className="text-base leading-[1.7] text-gray-500 max-w-[640px]">
              Evangadi Forum connects people who have questions with people who have answers. Here is
              what that looks like in practice.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-[1180px] mx-auto w-full px-6 py-20 md:py-12">
          {/* Tailwind is mobile-first: one column by default, two from md up. */}
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="bg-white rounded-lg border border-gray-200 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    aria-hidden="true"
                    className="w-10 h-10 flex-shrink-0 rounded-full bg-evangadi-blue text-white flex items-center justify-center text-base font-semibold"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-evangadi-heading">{step.title}</h3>
                </div>
                <p className="text-base leading-[1.7] text-gray-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Call to action */}
        <section className="max-w-[1180px] mx-auto w-full px-6 pb-20 md:pb-12">
          <div className="bg-evangadi-page rounded-lg p-12 md:p-8 text-center">
            <h2 className="text-2xl font-semibold text-evangadi-heading mb-3">
              {user ? 'Got a question in mind?' : 'Ready to join the network?'}
            </h2>
            <p className="text-base text-gray-500 mb-8 max-w-[560px] mx-auto leading-[1.7]">
              {user
                ? 'Post it to the community and get an answer from someone who has been there.'
                : 'Create an account and start asking, answering and learning with the Evangadi community.'}
            </p>
            <Link
              to={user ? '/ask-question' : '/register'}
              className="inline-block bg-evangadi-orange text-white no-underline py-3.5 px-8 text-sm font-semibold rounded uppercase tracking-wide transition-colors hover:bg-evangadi-orange-dark"
            >
              {user ? 'Ask a question' : 'Create an account'}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HowItWorks;
