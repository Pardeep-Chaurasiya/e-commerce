const jwtProvide = require("./jwtProvider")
const userService = require("../services/user.service")

const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(404).json({error:"Token not found"})
        }

        const userId = jwtProvide.getUserIdFromToken(token)
        const user = userService.getUserById(userId)

        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = authenticate