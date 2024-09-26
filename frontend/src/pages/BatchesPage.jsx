import React from 'react'
import Batches from '../components/batches/Batches'

const BatchesPage = () => {

  return (
    <>
        <Batches type="student" url="http://localhost:3000/api/v1/student/batches" />
    </>
  )
}

export default BatchesPage
