const express = require('express')
const router = express.Router();
const {Student,Teacher,Batch,Notes } = require('../db')
const jwt = require('jsonwebtoken')
const key = require('../secret');
const jwt_key = key.jwt_key
const {signup , signin} = require('../types')
const authMiddleWare = require('../middlewares/authMiddleware');
const { default: mongoose } = require('mongoose');


router.get('/:Id'  , async(req, res)=> {
    const batchId = req.params.Id
    try {
        const batch = await Batch.findOne({_id : batchId}).populate('teacher').populate('students');
        if(!batch) {
            return res.json({
                messsage : "No course found with id : " + batchId
            })
        }

        // console.log(batch)
        res.status(200).json({
            batch : batch,
            teacherId : batch.teacher
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})

module.exports = router