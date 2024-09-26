import React from 'react'
import "./header.css"

const Header = ({ name, letter, type , setLogin }) => {
    const logoutHandler = ()=>{
        localStorage.removeItem('token');
        setLogin(false)
    }
    return (
        <div className='header-wrapper'>
            <div className='header-heading'>
                Hello , {name}

            </div>

            {
                type === "Student Profile" ?
                    <div className='student-access'>
                        <div>Batches</div>
                        <div>Teachers</div>
                    </div> :
                    <div>
                        <div>Add A batch</div>
                        <div>Students</div>
                    </div>
            }

            <div className='user-details'>
                <button>Account</button>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}

export default Header
