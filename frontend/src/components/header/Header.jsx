import React from 'react'
import "./header.css"
import { useNavigate } from 'react-router-dom'

const Header = ({ name, letter, type , setLogin }) => {
    const navigate = useNavigate();
    const logoutHandler = ()=>{
        localStorage.removeItem('token');
        setLogin(false)
        localStorage.removeItem('profile')
    }
    return (
        <div className='header-wrapper'>
            <div className='header-heading'>
                Hello , {name}

            </div>

            {
                type === "Student Profile" ?
                    <div className='student-access'>
                        <div onClick={()=>navigate('/student/batches')}>Batches</div>
                        <div onClick={()=>navigate('/teacherList')}>Teachers</div>
                    </div> :
                    <div className='student-access'>
                        <div onClick={()=>navigate('/teacher/addBatch')} >Add a batch</div>
                        <div>Students</div>
                    </div>
            }

            <div className='user-details'>
                <button onClick={()=> {type === "Student Profile" ? navigate('/student/account') : navigate('/teacher/account')}}>Account</button>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Header
