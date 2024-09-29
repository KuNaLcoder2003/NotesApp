import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
import "./teacherbatch.css"
const TeacherBatches = ({url}) => {
    const navigate = useNavigate();
    const [batches , setBatches] = useState([]);
    useEffect(()=> {
        const token = localStorage.getItem('token');
        try {
            fetch(url , {
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                    authorization : token,
                }
            }).then(async(data) => {
                const response = await data.json()
                if(response.batches) {
                    setBatches(response.batches)
                }
            })
        } catch (error) {
            console.log(error)
        }
    } ,[])
  return (
    <div className='batches'>
      {
        batches.length == 0 ? <div>No batches</div> : <>
        {
            batches.map( batch=> {
                return (
                    <div key={batch.id} className='batch' onClick={()=>navigate(`/teacher/currentBatch/${batch.id}`)} >
                        <h2>{batch.batch_name}</h2>
                        <p>{batch.batch_desc}</p>
                        <p>No of students : {batch.students.length}</p>
                    </div>
                )
            } )
        }
        </>
      }
    </div>
  )
}

export default TeacherBatches
