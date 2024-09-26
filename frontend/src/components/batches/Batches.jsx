import React, { useEffect, useState } from 'react'
import "./batches.css"

const Batches = ({ type, url }) => {

    const [batches, setBatches] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        }).then(async (data) => {
            const response = await data.json()

            if (response.batches) {
                setBatches(response.batches)
            }
            else {
                setBatches([]);
            }
        })
    }, [])
    return (
        <div className='batches-wrapper'>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{
                type == "student dashboard" ? "Your Batches" : "Batches"
                }
                </h1>
            <div className='batches'>
                {
                    type === "student dashboard" ? <>
                        {
                            batches.length === 0 ? <p>No batches purchsed</p> : batches.map(batch => {
                                return (
                                    <div className='batch'>
                                        <p>{batch.batch_name}</p>
                                    </div>
                                )
                            })
                        }
                    </> : <>
                        {
                            batches.length === 0 ? <div>No batches to offer</div> : <>
                                {
                                    batches.map(batch => {
                                        return (
                                            <div className='batch'>
                                                <p>{batch.batch_name}</p>
                                                <p>{batch.teacher_name}</p>
                                                <p>{batch.teacher_username}</p>
                                                <br />
                                            </div>
                                        )
                                    })
                                }
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Batches
