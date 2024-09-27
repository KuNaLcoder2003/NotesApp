const express = require('express')
const router = express.Router();
const {Student,Teacher,Batch,Notes } = require('../db')
const jwt = require('jsonwebtoken')
const key = require('../secret');
const jwt_key = key.jwt_key
const {signup , signin} = require('../types')
const authMiddleWare = require('../middlewares/authMiddleware')



router.post('/signup' , async(req,res)=> {
    const { first_name , last_name , username , password , age  } = req.body;
    try {
        const { success } = signup.safeParse(req.body)
        
        if(!success){
            return res.status(400).json({
                message : "Invalid Input type"
            })
        }

        const teacher = await Teacher.findOne({username : username})

        if( teacher ) {
            return res.status(401).json({
                message : "Teacher already exists"
            })
        }

        const new_teacher = new Teacher({
            first_name : first_name,
            last_name : last_name,
            username : username,
            password : password,
            age : age
        })
        await new_teacher.save();
        const teacherId = new_teacher._id
        const token = jwt.sign({userId : teacherId} , jwt_key)
        res.status(200).json({
            message : "Teacher account created",
            token : token
        })
    } catch (error) {
        res.status(500).json({
            message : "something went wrong"
        })
    }
})


router.post('/signin' , async(req,res)=> {
    const {username , password} = req.body;
    try {
        const { success } = signin.safeParse(req.body);
        if( !success ){
            return res.status(400).json({
                message : "Invalid input type"
            })
        }

        const teacher = await Teacher.findOne({username : username , password : password})
        if( !teacher ) {
            return res.status(401).json({
                message : "Invalid credentials"
            })
        }

        const token  = jwt.sign({ userId : teacher._id} , jwt_key)

        res.status(200).json({
            message : "Successfully Logged In",
            token : token,
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})


router.post('/batch' , authMiddleWare , async(req,res)=> {
    const {batch_name , batch_desc , price } = req.body;
    try {
        const new_batch = new Batch({
            batch_name : batch_name,
            batch_desc : batch_desc,
            price : price,
            teacher : req.userId,
        })
        await new_batch.save();
        await Teacher.findOneAndUpdate({_id : req.userId} , {$push : {batches : new_batch._id}})
        res.status(200).json({
            message : "course successfully added"
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})


router.get('/students/:batchId' , authMiddleWare , async(req,res)=> {
    const teacherId = req.userId;
    try {
        const students = await Batch.findOne({_id : req.params.batchId , teacher : teacherId}).populate('students')
        if( students.students.length == 0  ) {
            return res.json({
                message : "No students"
            })
        }
        console.log(students)
        res.status(200).json({
            students : students.students.map( student => (
                {
                    student_name : `${student.first_name} ${student.last_name}`,
                }
            ))
        })
    } catch (error) {
        res.status(500).json({
            message : "Error getting student"
        })
    }
})


module.exports = router