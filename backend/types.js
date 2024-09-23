const zod = require('zod')

const signup = zod.object({
    first_name : zod.string(),
    last_name : zod.string(),
    username : zod.string().email(),
    password : zod.string().min(5),
    age : zod.number()
})

const signin = zod.object({
    username : zod.string().email(),
    password : zod.string().min(5)
})

module.exports = {
    signup,
    signin
}