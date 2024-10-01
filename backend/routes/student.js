const express = require('express')
const {Student,Teacher,Batch,Notes } = require('../db')
const jwt = require('jsonwebtoken')
const key = require('../secret');
const jwt_key = key.jwt_key
const {signup , signin} = require('../types')
const authMiddleWare = require('../middlewares/authMiddleware');
const { default: mongoose } = require('mongoose');


const router = express.Router()

router.post('/signup' , async(req,res) => {
    const { first_name , last_name , username , password ,age } = req.body;
    try {
        const { success } = signup.safeParse(req.body)
        if(!success){
            return res.status(400).json({
                message : "Invalid Input type"
            })
        }
        const student = await Student.findOne({username : username});
        if(student) {
            return res.status(401).json({
                message : 'student already exists'
            })
        }
        const new_Student = new Student({
            first_name : first_name,
            last_name : last_name,
            username : username,
            age : age,
            password : password,
        })
        await new_Student.save()
        const studentId = new_Student._id
        const token = jwt.sign({userId : studentId } , jwt_key)
        res.status(200).json({
            message : "Account created",
            token : token,
            id : new_Student._id
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

router.post('/signin' , async(req,res)=>{
    const {username , password} = req.body;
    try {
        const {success} = signin.safeParse(req.body);
        if(!success) {
            return res.status(400).json({
                message : "Invalid Input type"
            })
        }
        const student = await Student.findOne({username : username , password : password});
        if(!student){
            return res.status(401).json({
                message : "User not found"
            })
        }
        const token = jwt.sign({userId : student._id} , jwt_key)
        res.status(200).json({
            message : "Successfully logged in",
            token : token,
            id : student._id
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

router.get('/batches' , authMiddleWare , async(req,res)=> {
    // const userId = req.userId
    try {
        const batches = await Batch.find({}).populate('teacher')
        if(batches.length == 0) {
            return res.json({
                message : "Currently no batches"
            })
        }
        res.status(200).json({
            batches : batches.map( batch => ({
                batch_id : batch._id,
                batch_name : batch.batch_name,
                teacher_name : batch.teacher.first_name,
                teacher_username : batch.teacher.username
            }))
        })

    } catch (error) {
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

router.post('/purchase/:batchId' , authMiddleWare , async(req,res)=> {
    // transactions
    const studentId = req.userId;
    const batchId = req.params.batchId;
    try {

        // first see if student is already enrolled
        const purchased = await Student.findOne({_id : studentId , batches : batchId});
        if(purchased) {
            return res.status(401).json({
                valid : false,
                message : "you are already enrolled in this course"
            })
        }        
        const student = await Student.findOneAndUpdate({_id : studentId} , {$push : {batches : batchId}})
        const batch = await Batch.findOneAndUpdate({_id : batchId} , {$push : {students : studentId}})
        res.status(200).json({
            valid : true,
            message : "Added Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

router.get('/purchased' ,  authMiddleWare , async(req,res)=> {
    const studentId = req.userId;
    try {
        const student= await Student.findOne({_id : studentId}).populate('batches');
        if(student.length == 0){
            return res.json({
                message : "No purchased Batches"
            })
        }
        // console.log(student.batches)
        res.status(200).json({
            batches : student.batches,
            
        })
    } catch (error) {
        res.status(500).json({
            message : "Error fetching Courses"
        })
    }
})


router.get('/content/:batchId' , authMiddleWare , async(req,res)=> {
    const userId = req.userId;
    const batchId = req.params.batchId;
    try {
        const access = await Student.findOne({ _id : userId ,batches : batchId })
        if(!access){
            return res.status(401).json({
                valid : false,
                message : "Purchase the course to view content"
            })
        }
        const batch = await Batch.findOne({_id : batchId}).populate('teacher')
        res.status(200).json({
            valid : true,
            userId : userId,
            batch : batch,
            message : "You have the access"

        })
    } catch (error) {
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

router.get('/detail' ,authMiddleWare , async(req,res)=>{
    const studentId = req.userId;
    try {
        const student = await Student.findOne({_id : studentId}).populate('batches')
        if(!student){
            return res.status(400).json({
                valid : false,
                message : 'Error getting detials'
            })
        }
        res.status(200).json({
            valid : true,
            student_name : `${student.first_name} ${student.last_name}`,
            username : student.username,
            password : student.password,
            batches : student.batches,
            age : student.age
        })
    } catch (error) {
        res.status(500).json({
            valid : false , 
            message : "Something went wrong"
        })
    }
} )


module.exports = router