const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kunal:kunal@cluster0.acncl.mongodb.net/')

const Student_Schema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
        unique : false,
    },
    last_name : {
        type : String,
        required : true,
        unique : false,
    },
    age : {
        type : Number,
        required : true,
        unique : false,
    },
    username : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    batches : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "batches"
    }]
} ,{timestamps : true})

const Teacher_Schema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
        unique : false,
    },
    last_name : {
        type : String,
        required : true,
        unique : false,
    },
    age : {
        type : Number,
        required : true,
        unique : false,
    },
    username : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    batches : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "batches",
    }]
},{timestamps : true})

const Batches_Schema = new mongoose.Schema({
    batch_name : {
        type : String,
        required : true,
        unique : false
    },
    batch_desc : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    teacher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'teachers'
    },
    students : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'students'
    }]
},{timestamps : true})

const Notes_Schema = new mongoose.Schema({
    teacherId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'teachers'
    },
    batch : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'batches'
    },
    files : [{
        notes_url : {
            type : String,
            required : true
        },
        notes_id : {
            type : String,
            required : true,
        }
    }]
} , {timestamps : true})


const Student = mongoose.model('students' ,Student_Schema)
const Teacher = mongoose.model('teachers' , Teacher_Schema);
const Batch = mongoose.model('batches' , Batches_Schema);
const Notes = mongoose.model('notes' , Notes_Schema);

module.exports = {
    Student,
    Teacher,
    Batch,
    Notes
}