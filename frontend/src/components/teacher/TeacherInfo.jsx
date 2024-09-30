import React, { useState } from 'react'
import './tinfo.css'
import { useNavigate } from 'react-router-dom';

const TeacherInfo = ({teacher}) => {
    const [batches , setBatches] = useState(teacher.batches);
    const navigate = useNavigate();
  return (
    <div className='teacher'>
        <h2>{`${teacher.first_name} ${teacher.last_name}`}</h2>
        <div>
            <p>Batches : </p>
            {
                batches.map( batch => {
                    return (
                        <div key={batch._id} className='batch' onClick={()=>navigate(`/student/purchase/${batch._id}`)} >
                            <h3>{batch.batch_name}</h3>
                            <p>{batch.batch_desc || ""}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TeacherInfo
