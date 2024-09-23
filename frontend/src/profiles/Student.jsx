import React, { useState, useEffect } from 'react'
import SignUp from '../components/signup/SignUp'
import SignIn from '../components/signin/SignIn';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const [login, setLogin] = useState(!!localStorage.getItem('token'));
  const [id, setId] = useState('');
  const navigate = useNavigate()

  const logOutHandle = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setLogin(false); // Set login state to false
  };

  useEffect(() => {
    // Check if a token exists in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true); // Set login state to true if token exists
    }
  }, []);
  return (
    <div>

      {
        login ? (navigate(`/student/${id}`)) :
          <div style={{display : "flex" , alignItems : "center" , justifyContent : "space-around"}}>
            <SignUp url={'http://localhost:3000/api/v1/student/signup'} setLogin = {setLogin} setId = {setId} />
            <SignIn url={'http://localhost:3000/api/v1/student/signin'} setLogin={setLogin} setId = {setId} />
          </div>
      }
    </div>
  )
}

export default Student;
