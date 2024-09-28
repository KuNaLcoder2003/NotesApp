import React, { useState, useEffect } from 'react'
import SignUp from '../components/signup/SignUp'
import SignIn from '../components/signin/SignIn';

const Student = ({setLogin}) => {

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" , height : "100vh" }}>
      <SignUp url={'http://localhost:3000/api/v1/student/signup'} setLogin={setLogin} type={"student"} />
      <SignIn url={'http://localhost:3000/api/v1/student/signin'} setLogin={setLogin} type={"student"}  />
    </div>
  )
}

export default Student;
