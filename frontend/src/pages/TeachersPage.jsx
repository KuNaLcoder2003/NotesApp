import React, { useEffect, useState } from 'react'
import TeacherInfo from '../components/teacher/TeacherInfo';

const TeachersPage = () => {
    const [teachers, setTeachers] = useState([]);
    useEffect(()=> {
        try {
            fetch('http://localhost:3000/api/v1/teacher' , {
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                }
            }).then(async(data) => {
                const response = await data.json()
                if(response.teachers) {
                    setTeachers(response.teachers)
                }
                console.log(response);
            })
        } catch (error) {
            console.log(error)
        }
    },[])
  return (
    <div>
      {
        teachers.length == 0 ? <div>{"No teavhers"}</div> : (
            teachers.map( teacher => {
                return (
                    <TeacherInfo teacher={teacher} key={teacher._id} />
                )
            })
        )
      }
    </div>
  )
}

export default TeachersPage
