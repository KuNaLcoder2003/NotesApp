import React, { useState } from 'react'

const SignIn = ({url , setLogin , setId}) => {
  const [fromData , setFormData] = useState({
    username : '',
    password : ''
  })
  const submitHandler = (e)=>{
    e.preventDefault()

    try {
      fetch(url , {
        method : 'POST',
        body : JSON.stringify({
          credentials : {
            username : fromData.username,
            password : fromData.password
          }
        }),
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then(async(data)=>{
        const response = await data.json();
        console.log(response);
        localStorage.setItem('token' , `Bearer ${response.token}`)
        setFormData({
          username : '',
          password : ''
        })
        setLogin(true);
        setId(response.id)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='sign-in-wrapper'>

      <form onSubmit={submitHandler}>

        <div>
          <p>Username : </p>
          <input value={fromData.username} type="text" placeholder='Enter your username...' onChange={(e)=>setFormData({...fromData , username : e.target.value})} />
        </div>

        <div>
          <p>Password : </p>
          <input value={fromData.password} type='password' placeholder='Enter your password...' onChange={(e)=>setFormData({...fromData , password : e.target.value})} />
        </div>

        <button type='submit'>SignIn</button>
      </form>
      
    </div>
  )
}

export default SignIn
