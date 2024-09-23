import { useState } from 'react'
import {BrowserRouter ,Routes , Route} from "react-router-dom"
import './App.css'
import DashBoard from './pages/DashBoard';
import Student from './profiles/Student';
import Teacher from './profiles/Teacher';
import StudentDashBoard from './components/StudentDashBoard/StudentDashBoard';

function App() {
  const [student , setStudent] = useState(false);
  const [teacher , setTeacher] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<DashBoard setStudent={setStudent} setTeacher = {setTeacher} />} />
          <Route path='/student' element={<Student/>} />
          <Route path='/teacher' element={<Teacher/>} />
          <Route path='/student/:Id' element={<StudentDashBoard/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
