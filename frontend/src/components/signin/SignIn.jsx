import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./signin.css"

const SignIn = ({ url, setLogin, type }) => {
  const [fromData, setFormData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault()

    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({

          username: fromData.username,
          password: fromData.password

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (data) => {
        const response = await data.json();
        // console.log(response);
        if (response.token) {
          localStorage.setItem('token', `Bearer ${response.token}`)
          setLogin(true);
          type === "student" ? localStorage.setItem('profile' , "student") : localStorage.setItem('profile' , "teacher") 
          // setId(response.id)
          // type === "student" ? navigate(`/student/${response.id}`) : navigate('/teacher')
        }
        setFormData({
          username: '',
          password: ''
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='sign-in-wrapper'>
      <h1 style={{textAlign : "center"}}>Signin</h1>
      <form onSubmit={submitHandler}>

        <div>
          <p>Username : </p>
          <input value={fromData.username} type="text" placeholder='Enter your username...' onChange={(e) => setFormData({ ...fromData, username: e.target.value })} />
        </div>

        <div>
          <p>Password : </p>
          <input value={fromData.password} type='password' placeholder='Enter your password...' onChange={(e) => setFormData({ ...fromData, password: e.target.value })} />
        </div>

        <button type='submit'>SignIn</button>
      </form>

    </div>
  )
}

export default SignIn
