import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Batches from '../batches/Batches';

const StudentDashBoard = ({ setLogin }) => {
  const [userData , setUserData] = useState({
    student_name : '',
    username : ""
  })
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
        setUserData({
          student_name : response.student_name,
          username : response.username
        })
      })
    }

  }, [])
  // const logOutHandler = () => {
  //   localStorage.removeItem('token');
  //   setLogin(false);
  //   navigate('/')
  // }
  return (
    <div className='studentDashboard'>
      <Header type="Student Profile" name={userData.student_name} letter = {userData.student_name.at(0)} setLogin = {setLogin} />
      <Batches url="http://localhost:3000/api/v1/student/purchased" type="student dashboard" />
    </div>
  )
}

export default StudentDashBoard

