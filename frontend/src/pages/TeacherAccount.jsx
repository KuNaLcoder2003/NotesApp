import React from 'react'
import Account from '../components/account/Account'

const TeacherAccount = () => {
  return (
    <div>
      <Account type={"teacher"} url="http://localhost:3000/api/v1/teacher/details"/>
    </div>
  )
}

export default TeacherAccount
