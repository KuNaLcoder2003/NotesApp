import React from 'react'
import Account from '../components/account/Account'

const StudentAccount = () => {
  return (
    <div>
      <Account type={"student"} url={"http://localhost:3000/api/v1/student/detail"} />
    </div>
  )
}

export default StudentAccount
