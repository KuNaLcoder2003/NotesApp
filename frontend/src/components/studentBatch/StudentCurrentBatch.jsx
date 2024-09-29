import React , {useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import "./currentbatch.css"

const StudentCurrentBatch = () => {

    const [batchname, setbatchname] = useState("")
    const [students, setStudents] = useState([]);
    const [studentsView, setStudentsView] = useState(false);
    const [notes,setNotes] = useState([]);
    const path = useLocation()

    async function getBatchData() {
        const id = path.pathname.split('/').at(-2)
        
        try {
            const batch_data = await fetch('http://localhost:3000/api/v1/batch/' + id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const response = await batch_data.json()
            if (response.batch) {
                setStudents(response.batch.students)
                setbatchname(response.batch.batch_name)
                // setTeacherId(response.batch.teacherId)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    

    async function getNotes(){
        const batchId = path.pathname.split('/').at(-2)
        const token = localStorage.getItem('token');
        const teacherId = path.pathname.split('/').at(-1);
        try {
            const notes_data = await fetch('http://localhost:3000/api/v1/notes/student/' + batchId + `/${teacherId}`  , {
                method : 'GET',
                headers : {
                    "Content-Type" : "application/json",
                    authorization : token,
                    
                },
                
            })
            const response = await notes_data.json()
            if(response.notes) {
                setNotes(response.notes);
            }
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(()=> {
        getBatchData();
        getNotes();
    },[])
  return (
    <div className='current-batch'>
            {
                batchname ? <div>
                    <h1>{batchname}</h1>
                    <div style={{display : "flex" , flexWrap : "wrap" , alignItems : "center" , gap : "20px"}} className='notes-section'>
                        {
                            notes.length ==0 ? <div>No notes</div> : (
                                notes.map( (note , index) => {
                                    return (
                                        <div style={{width : "20%" , 
                                            padding : "0.8rem" , textAlign :"center" , 
                                            border : "1px solid black" , cursor : "pointer"}} key={index} 
                                        onClick={()=>window.open(note.notes_url , '_blank' , 'noopener,noreferrer')}>Notes-{index+1}</div>
                                    )
                                })
                            )
                        }
                    </div>
                    {/* <button onClick={() => setStudentsView(!studentsView)}>Students</button>
                    {
                        studentsView ? <div>
                            {
                                students.map(student => {
                                    return (
                                        <div>
                                            <h3>Student Name : {`${student.first_name} ${student.last_name}`}</h3>
                                        </div>
                                    )
                                })
                            }
                        </div> : null
                    } */}
                    {/* <form onSubmit={submitHandler}>
                        <p>Upload new notes</p>
                        <input type="file" placeholder='select file' onChange={handleFileChange} />
                        <button type='submit'>Upload</button>
                    </form>
                    {
                        loading ? <div>File is being uploaded</div> : null
                    } */}
                </div> : <div>No batch</div>
            }
        </div>
  )
}

export default StudentCurrentBatch
