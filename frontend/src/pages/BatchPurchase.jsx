import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const BatchPurchase = ({setLogin}) => {
    const [batchDetails , setBatchDetails] = useState(null)
    const path = useLocation();
    useEffect(()=> {
        const id = path.pathname.split('/').at(-1);
        fetch('http://localhost:3000/api/v1/batch/' + id , {
            method : 'GET' , 
            headers : {
                "Content-Type" : "application/json"
            }
        }).then(async(data)=>{
            const response = await data.json();
            console.log(response);
            if(response.batch) {
                console.log('hello 1')
                setBatchDetails(response.batch);
            }
            else {
                console.log('hello')
                setBatchDetails({})
            }
        })
    } ,[])

    const purchaseHandle = ()=>{
        try {
            const token = localStorage.getItem('token');
            const id = path.pathname.split('/').at(-1);
            if(token) {
                fetch('http://localhost:3000/api/v1/student/purchase/' + id , {
                    method : 'POST',
                    headers : {
                        "Content-Type" : "application/json",
                        authorization : token
                    }
                }).then(async(data)=>{
                    const response = await data.json();
                    console.log(response);
                })
            }
            else {
                setLogin(false)
            }
        } catch (error) {
            
        }
    }
  return (
    <div>
      {
        batchDetails ? 
        <div className='batch'>
            <h2>{batchDetails.batch_name}</h2> 
            <div>{batchDetails.batch_desc}</div>
            <div>
                <h3>Teacher {`${batchDetails.teacher.first_name} ${batchDetails.teacher.last_name}`}</h3>
            </div>
            <p>{batchDetails.price}</p>
            <button onClick={purchaseHandle}>Purchase</button>

        </div> : <div>Hello</div>
      }
    </div>
  )
}

export default BatchPurchase
