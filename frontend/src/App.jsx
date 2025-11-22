import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AskQuestion from "./Pages/AskQuestion";
import QuestionDetail from "./Pages/QuestionDetail";
import {useEffect, useState, createContext} from 'react';
import axios from "./axiosConfig";
import  {useNavigate} from 'react-router-dom';


export const Appstate=createContext();

function App() {
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  async function checkuser(){
    try {
      const { data } = await axios.get('/users/check',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.error(error.response);
      navigate('/login');
    }
  }
  useEffect(()=>{
    checkuser();
  
  },[]);

  return (
    <Appstate.Provider value={{user,setUser,checkuser}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/question/:questionid" element={<QuestionDetail />} />
      </Routes>
    </Appstate.Provider>
  );
}

export default App;
