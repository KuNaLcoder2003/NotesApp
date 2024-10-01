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

router.get('/batches' , authMiddleWare , async(req,res) => {
    const teacherId = req.userId;
    try {
        const batches = await Batch.find({teacher : teacherId}).populate('teacher').populate('students');
        if(batches.length == 0){
            return res.status(200).json({
                message : "You have not posted any batch"
            })
        }
        // console.log(batches);
        let batch = batches.map( batch => (
            {
                id : batch._id,
                batch_name  : batch.batch_name,
                batch_desc : batch.batch_desc || "",
                students : batch.students
            }
        ))
        res.status(200).json({
            batches : batch
        })
    } catch (error) {
        
    }
} )

router.get('/details' , authMiddleWare , async(req,res) => {
    const teacherId = req.userId;
    try {
        const teacher = await Teacher.findOne({_id  : teacherId}).populate('batches')
        if(!teacher) {
            return res.status(401).json({
                valid : false,
                message : "teacher not found"
            })
        }
        res.status(200).json ({
            valid : true,
            teacher : teacher,
            teacher_name : `${teacher.first_name} ${teacher.last_name}`,
            username : teacher.username,
            password : teacher.password,
            batches : teacher.batches,
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

router.get('/' , async(req,res)=> {
    try {
        const teachers = await Teacher.find({}).populate('batches')
        if(teachers.length == 0) {
            return res.status(403).json({
                message : "No teachers currently"
            })
        }
        res.status(200).json({
            teachers : teachers
        })
    } catch (error) {
        res.status(500).json({
            message : "Error getting teachers"
        })
    }
} )


module.exports = router