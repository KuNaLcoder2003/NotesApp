import React, { useEffect, useState } from 'react'
import './teacherdash.css'
import Header from '../header/Header';
import TeacherBatches from '../teacherbatches/TeacherBatches';



const TeacherDashboard = ({setLogin}) => {
    const [teacher, setTeacher] = useState({});
    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log('hello')
        try {
            fetch('http://localhost:3000/api/v1/teacher/details', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    authorization: token
                }
            }).then(async (data) => {
                const response = await data.json();
                console.log(response);
                if (response.valid) {
                    setTeacher(response.teacher)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='teacher-dash-wrapper'>
            <Header name={`${teacher.first_name} ${teacher.last_name}`} setLogin={setLogin} />
            <TeacherBatches url="http://localhost:3000/api/v1/teacher/batches"/>
        </div>
    )
}

export default TeacherDashboard
