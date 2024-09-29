import { useState , useEffect } from 'react'
import {BrowserRouter ,Routes , Route, useNavigate} from "react-router-dom"
import './App.css'
import DashBoard from './pages/DashBoard';
import Student from './profiles/Student';
import Teacher from './profiles/Teacher';
import StudentDashBoard from './components/StudentDashBoard/StudentDashBoard';
import BatchesPage from './pages/BatchesPage';
import BatchPurchase from './pages/BatchPurchase';
import TeacherDashboard from './components/teacherDashboard/TeacherDashboard';
import CurrentBatch from './components/currentbatch/CurrentBatch';
import StudentCurrentBatch from './components/studentBatch/StudentCurrentBatch';
import AddBatch from './components/addbatch/AddBatch';

function App() {
  const [student , setStudent] = useState(false);
  const [teacher , setTeacher] = useState(false);
  const [login, setLogin] = useState(!!localStorage.getItem('token'));
  const [profile , setProfile] = useState(localStorage.getItem('profile'))
  // const navigate = useNavigate();
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
          <Route path='/student' element={ login && profile === "student" ? <StudentDashBoard setLogin = {setLogin} />  : <Student setLogin = {setLogin} setProfile={setProfile} /> } />
          <Route path='/teacher' element={ login && profile === "teacher" ? <TeacherDashboard setLogin = {setLogin} />  : <Teacher setLogin={setLogin} />} />
          <Route path='/student/batches' element={login && profile === "student" ? <BatchesPage/> :<Student setLogin = {setLogin} setProfile={setProfile} />}/>
          <Route path='/student/purchase/:batchId' element={login && profile === "student" ? <BatchPurchase setLogin={setLogin} /> :<Student setLogin = {setLogin} setProfile={setProfile} />}/>
          <Route path='/teacher/currentBatch/:batchId' element={login && profile === "teacher" ? <CurrentBatch/> : <Teacher setLogin={setLogin} />} />
          <Route path='/student/currentBatch/:batchId/:teacherId' element = {login && profile === "student" ? <StudentCurrentBatch/> : <Student setLogin={setLogin} setProfile={setProfile} /> } />
          <Route path='/teacher/addBatch' element= {login && profile === "teacher" ? <AddBatch/> : <Teacher setLogin={setLogin} /> } />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
