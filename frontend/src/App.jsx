import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AskQuestion from "./Pages/AskQuestion";
import QuestionDetail from "./Pages/QuestionDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import {useState, createContext} from 'react';


export const Appstate=createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <Appstate.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ask-question" 
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/question/:questionid" 
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Appstate.Provider>
  );
}

export default App;
