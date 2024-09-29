const jwt  = require('jsonwebtoken')
const key = require('../secret');
const jwt_key = key.jwt_key
const authMiddleWare = (req,res,next)=>{
    const authToken = req.headers.authorization;
    try {
        if(!authToken || !authToken.startsWith('Bearer ')){
            console.log('hello 1')
            return res.status(401).json({})
        }
        const token = authToken.split(' ')[1]
        const verified = jwt.verify(token , jwt_key)
        if(verified) {
            // console.log('helo 2')
            req.userId = verified.userId;
            // console.log(req.userId)
            next()
        }
        else {
            console.log('hello 3')
            return res.status(401).json({})
        }

    } catch (error) {
        console.log('hello 4')
        console.log(error)
        res.status(500).json({
            message : "Something went wrong"
        })
    }
}

module.exports = authMiddleWare;