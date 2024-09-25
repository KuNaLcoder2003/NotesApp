import { useState , useEffect } from 'react'
import {BrowserRouter ,Routes , Route} from "react-router-dom"
import './App.css'
import DashBoard from './pages/DashBoard';
import Student from './profiles/Student';
import Teacher from './profiles/Teacher';
import StudentDashBoard from './components/StudentDashBoard/StudentDashBoard';

function App() {
  const [student , setStudent] = useState(false);
  const [teacher , setTeacher] = useState(false);
  const [login, setLogin] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    // Check if a token exists in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setLogin(true); // Set login state to true if token exists
      
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<DashBoard setStudent={setStudent} setTeacher = {setTeacher} />} />
          <Route path='/student' element={ login ? <StudentDashBoard setLogin = {setLogin} />  : <Student setLogin = {setLogin} /> } />
          <Route path='/teacher' element={<Teacher/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
