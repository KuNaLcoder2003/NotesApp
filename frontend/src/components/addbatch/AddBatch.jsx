import React, { useState } from 'react'

const AddBatch = () => {
    const [formData , setFormData] = useState({
        batch_name : "",
        batch_desc : "",
        price : "",
    })

    const submitHandler = (e)=> {
        e.preventDefault();
        const token = localStorage.getItem('token')
        // if(!token || token == "") {

        // }
        try {
            fetch('http://localhost:3000/api/v1/teacher/batch' , {
                method : 'POST',
                body : JSON.stringify({
                    batch_name : formData.batch_name,
                    batch_desc : formData.batch_desc,
                    price : parseInt(formData.price)
                }),
                headers : {
                    "Content-Type" : "application/json",
                    authorization : token
                }
            }).then(async(data)=> {
                const response = await data.json()
                console.log(response);
            })
        } catch (error) {
            console.log('frontend error : ' + error)
        }
    }
  return (
    <div className='add-batch-wrapper'>
        <h1>Add a new batch</h1>
        <form onClick={submitHandler}>
            <div>
                <p>Batch name</p>
                <input type='text' placeholder='Enter batch name' value={formData.batch_name} onChange={(e)=>setFormData({...formData , batch_name : e.target.value})}  />
            </div>

            <div>
                <p>Batch Description</p>
                <textarea rows="9" cols="40" placeholder='Describe your new batch...' value={formData.batch_desc} onChange={(e)=> setFormData({
                    ...formData , 
                    batch_desc : e.target.value
                })} />
            </div>

            <div>
                <p>Price</p>
                <input type='text' placeholder='Set a price for your new batch...' value={formData.price} onChange={(e)=>setFormData({
                    ...formData , 
                    price : e.target.value
                })} />
            </div>
            <button type="submit">Add batch</button>
        </form>
    </div>
  )
}

export default AddBatch
