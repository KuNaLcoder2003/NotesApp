import React, { useEffect, useState } from 'react'
import "./account.css"
import { useNavigate } from 'react-router-dom'


const Edit = ({usersName , username , password , url ,setEdit })=> {
    const [editedData , setEditedData] = useState({
        usersName : usersName,
        username : username,
        password : password,
    })

    const submitHandler = (e)=> {
        e.preventDefault()
        let obj = {};
        const token = localStorage.getItem('token');
        try {
            if(editedData.usersName !== usersName) {
                let arr = editedData.usersName.split(' ')
                let first_name = arr[0]
                let last_name = arr[1]
                obj.first_name = first_name;
                obj.last_name = last_name
            }
            else if( editedData.username !== username){
                obj.username = editedData.username
            }
            else if (editedData.password !== password) {
                obj.password = editedData.password
                
            }
            else {
                return ;
            }
            console.log('updating')
            fetch(url , {
                method : 'PUT',
                body : JSON.stringify({
                    ...obj
                }),
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : token
                },
            }).then(async(data)=>{
                const response = await data.json()
                console.log(response)
            })
            
        } catch (error) {
            
        }
    }

    return ( 
        <form onSubmit={submitHandler}>
            <div>
                <p>Name : </p>
                <input type='text' value={editedData.usersName} onChange={(e)=> setEditedData({...editedData , usersName : e.target.value})}/>
            </div>
            <br/>
            <div>
                <p>Username : </p>
                <input type='text' value={editedData.username} onChange={(e)=>setEditedData({...editedData , username : e.target.value})} />

            </div>
            <br/>

            <div>
                <p>Password : </p>
                <input type='text' value={editedData.password} onChange={(e)=>setEditedData({...editedData , password : e.target.value})} />
            </div>

            <button>Edit</button>

        </form>
    )
}
const Account = ({url , type}) => {
    const [accountData , setAccountData] = useState({
        usersName : "",
        username : "",
        password : "",
        batches : []
    })
    const [edit , setEdit] = useState(false)
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
      <button onClick={()=>setEdit(!edit)}>Edit details</button>
      {
        edit ? (<Edit usersName={accountData.usersName} username={accountData.username} password={accountData.password} setEdit={setEdit}
            url={type == "student" ? 'http://localhost:3000/api/v1/student/edit' : 'http://localhost:3000/api/v1/teacher/edit'} />) : 
            (null)
      }
    </div>
  )
}

export default Account
