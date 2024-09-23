import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = ({setStudent , setTeacher}) => {
    const navigate = useNavigate()
  return (
    <div>
      DashBoard
      <button onClick={()=>navigate('/student')}>Student Login</button>
      <button onClick={()=>navigate('/teacher')}>Teacher Login</button>
    </div>
  )
}

export default DashBoard
