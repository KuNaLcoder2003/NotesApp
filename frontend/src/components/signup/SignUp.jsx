import React, { useState } from 'react'

const SignUp = ({ url , setLogin , setId }) => {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    age: "",
  })

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          newStudent: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            username: formData.username,
            password: formData.password,
            age: parseInt(formData.age)
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (data) => {
        const response = await data.json();
        // console.log(response);
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          age: "",
        })
        localStorage.setItem('token' , `Bearer ${response.token}`)
        setLogin(true);
        setId(response.id)
      })
    } catch (error) {

    }
  }

  return (
    <div className='signup-wrapper'>
      <form onSubmit={submitHandler}>


        <div>
          <p>First Name : </p>
          <input type="text" placeholder='Enter your first name...' value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
        </div>

        <div>
          <p>Last Name : </p>
          <input type="text" placeholder='Enter your last name...' value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
        </div>

        <div>
          <p> Username : </p>
          <input type="text" placeholder='Enter your username...' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </div>

        <div>
          <p>Password : </p>
          <input type="password" placeholder='Enter your password...' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>

        <div>
          <p>Age : </p>
          <input type="text" placeholder='Enter your age...' onChange={(e) => setFormData({ ...formData, age: e.target.value })} value={formData.age} />
        </div>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
