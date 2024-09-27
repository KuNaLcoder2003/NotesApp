const express = require('express');

const router = express.Router();
const student = require('./student')
const teacher = require('./teacher')
const batch = require('./batch')
const notes = require('./notes')

router.use('/student' , student)
router.use('/teacher' , teacher)
router.use('/batch' , batch)
router.use('/notes' , notes)


module.exports = router
