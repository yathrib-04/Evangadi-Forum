import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Appstate } from '../App';

// Shared logout, previously duplicated verbatim in Home, AskQuestion and
// QuestionDetail.
//
// Order matters: navigate first, then clear the user. Clearing it first makes
// the page being left re-render in a logged-out state, which is what made Home
// throw on `user.username` during logout. `replace` keeps the protected page
// out of history so Back cannot return to it after signing out.
export default function useLogout() {
  const { setUser } = useContext(Appstate);
  const navigate = useNavigate();

  return function logout() {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    setUser(null);
  };
}
