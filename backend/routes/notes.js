const express = require('express')
const router = express.Router();
const { Student, Teacher, Batch, Notes } = require('../db')
const jwt = require('jsonwebtoken')
const key = require('../secret');
const jwt_key = key.jwt_key
const authMiddleWare = require('../middlewares/authMiddleware')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer')

cloudinary.config({
    cloud_name: 'doyifognr',
    api_key: '558719477873916',
    api_secret: 'v8ZvCjyKR-CgQwVd9D8qEpBygxw' // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'notes',
        resource_type: 'raw',  // Use 'raw' for PDFs
        format: async (req, file) => {
            // Ensure only PDF uploads are allowed
            if (path.extname(file.originalname) !== '.pdf') {
                throw new Error('File format is not supported'); // Custom error handling
            }
            return 'pdf';
        },
        public_id: (req, file) => Date.now() + '_' + file.originalname,
        upload_preset: 'pdf_uploads'  // Use your upload preset here
    },
});


const upload = multer({ storage: storage })

router.post('/create/:batchId', authMiddleWare, upload.single('file'), async (req, res) => {
    const teacherId = req.userId;
    const batchId = req.params.batchId;

    try {

        const new_notes = new Notes({
            teacherId: teacherId,
            batch: batchId,
            files: [{
                notes_url: req.file.path,
                notes_id: req.file.fieldname
            }]
        })
        await new_notes.save();
        res.status(200).json({
            message: 'PDF file uploaded successfully!',
            // fileUrl: req.file.path,  // Cloudinary URL for the uploaded PDF
            // fileId: req.file.filename,  // Public ID of the file in Cloudinary
        });
        console.log(new_notes)
    } catch (error) {
        res.status(500).json({ message: 'Error uploading PDF file', error });
    }
})

router.post('/addNotes/:batchId', authMiddleWare, upload.single('file'), async (req, res) => {
    const teacherId = req.userId;
    const batchId = req.params.batchId;
    const file_obj = {
        notes_url: req.file.path,
        notes_id: req.file.fieldname
    }
    try {
        const notes = await Notes.findOneAndUpdate({ batch: batchId, teacherId: teacherId }, { $push: { files:file_obj } } , {new : true})
        if(!notes) {
            return res.json({
                message : "Error uploading Notes"
            })
        }
        res.status(200).json({
            message : "Uploaded noes successfully"
        })
    } catch (error) {
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

router.get('/student/:batchId' , authMiddleWare , async(req,res)=> {
    const studentId = req.userId;
    const teacherId = req.body.teacherId;
    if(!teacherId) {
        return res.status(400).json({
            message : "Bad request"
        })
    }
    const batchId = req.params.batchId;
    try {
        
        const access = await Batch.findOne({_id : batchId , students : studentId})
        if(!access) {
            return res.status(403).json({
                message : "You do not have access to this batch"
            })
        }
        const notes = await Notes.find({batch : batchId , teacherId : teacherId }).populate('files')
        if(notes.length === 0){
            return res.status(404).json({
                message : "No notes found"
            })
        }

        // let notes_array = [];
        // console.log(notes);
        // notes.map( note => {
        //     console.log('hello')
        //     note.files.map( file => {
        //         console.log('inner heelo')
        //         notes_array.push(file)
        //     } )
        // })
        const notes_array = notes.reduce((acc, note) => acc.concat(note.files), []);
        res.status(200).json({
            notes : notes_array
        })
    } catch (error) {
        res.status(500).json({
            message : "Error fetching notes"
        })
    }
})



module.exports = router
