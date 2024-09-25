import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const StudentDashBoard = ({ setLogin }) => {
  const [userData , setUserData] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true);
      fetch('http://localhost:3000/api/v1/student/detail', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          authorization: token
        }
      }).then(async (data) => {
        const response = await data.json();
        setUserData(response)
      })
    }

  }, [])
  const logOutHandler = () => {
    localStorage.removeItem('token');
    setLogin(false);
    navigate('/')
  }
  return (
    <div>
      <div>{userData.student_name}</div>
      <div>{userData.username}</div>
      <button onClick={logOutHandler}>Logout</button>
    </div>
  )
}

export default StudentDashBoard

