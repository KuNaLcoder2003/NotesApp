
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Header from '../header/Header';
// import Batches from '../batches/Batches';
import SignUp from '../components/signup/SignUp'
import SignIn from '../components/signin/SignIn';

const Teacher = ({setLogin}) => {
  return (

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" , gap : "2rem" , height : "100vh" }}>
      <SignUp url={'http://localhost:3000/api/v1/teacher/signup'} setLogin={setLogin} type= {"teacher"} />
      <SignIn url={'http://localhost:3000/api/v1/teacher/signin'} setLogin={setLogin} type ={"teacher"} />
    </div>

  )
}

export default Teacher
