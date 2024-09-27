import { useState , useEffect } from 'react'
import {BrowserRouter ,Routes , Route, useNavigate} from "react-router-dom"
import './App.css'
import DashBoard from './pages/DashBoard';
import Student from './profiles/Student';
import Teacher from './profiles/Teacher';
import StudentDashBoard from './components/StudentDashBoard/StudentDashBoard';
import BatchesPage from './pages/BatchesPage';
import BatchPurchase from './pages/BatchPurchase';

function App() {
  const [student , setStudent] = useState(false);
  const [teacher , setTeacher] = useState(false);
  const [login, setLogin] = useState(!!localStorage.getItem('token'));
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
          <Route path='/student' element={ login ? <StudentDashBoard setLogin = {setLogin} />  : <Student setLogin = {setLogin} /> } />
          <Route path='/teacher' element={<Teacher/>} />
          <Route path='/student/batches' element={login ? <BatchesPage/> :<Student setLogin = {setLogin} />}/>
          <Route path='/student/purchase/:batchId' element={login ? <BatchPurchase setLogin={setLogin} /> :<Student setLogin = {setLogin} />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
