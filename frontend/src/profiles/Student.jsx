import React, { useState, useEffect } from 'react'
import SignUp from '../components/signup/SignUp'
import SignIn from '../components/signin/SignIn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import StudentDashBoard from '../components/StudentDashBoard/StudentDashBoard';

const Student = ({setLogin}) => {

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
      <SignUp url={'http://localhost:3000/api/v1/student/signup'} setLogin={setLogin}  />
      <SignIn url={'http://localhost:3000/api/v1/student/signin'} setLogin={setLogin}  />
    </div>
  )
}

export default Student;
