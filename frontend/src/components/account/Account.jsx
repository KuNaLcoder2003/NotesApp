import React, { useEffect, useState } from 'react'
import "./account.css"
import { useNavigate } from 'react-router-dom'

const Account = ({url , type}) => {
    const [accountData , setAccountData] = useState({
        usersName : "",
        username : "",
        password : "",
        batches : []
    })
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        fetch(url , {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                authorization : token
            }
        }).then(async(data)=> {
            const response = await data.json();
            console.log(response);
            if(response.valid){
                
                setAccountData({
                    usersName : (type === "student" ? response.student_name : response.teacher_name),
                    username : response.username,
                    password : response.password,
                    batches : response.batches,
                })
            }
        })
    },[])
  return (
    
    <div className='account-deatils'>
      <h1>{accountData.usersName}</h1>
      <div>
        <p>Username : {accountData.username}</p>
        <p>Password : {accountData.password}</p>
      </div>
      <div>
        {
            type == 'student' ? (<>
                <h3>Registered Batches</h3>
                {
                    accountData.batches.map( batch => {
                        return (
                            <div key={batch._id} onClick={()=>{navigate(`/student/currentBatch/${batch._id}/${batch.teacher}`)}}>
                                <h4>{batch.batch_name}</h4>
                                <p>{batch.batch_desc}</p>
                            </div>
                        )
                    })
                }
        
            </>) : (<>
                <h3>Your batches</h3>
                {
                    accountData.batches.map( batch => {
                        return (
                            <div key={batch._id} onClick={()=>{navigate(`/teacher/currentBatch/${batch._id}`)}}>
                                <h4>{batch.batch_name}</h4>
                                <p>{batch.batch_desc}</p>
                                <p>No of students : {batch.students.length || 0}</p>
                            </div>
                        )          
                    })
                }
            </>)
        }
      </div>
    </div>
  )
}

export default Account
