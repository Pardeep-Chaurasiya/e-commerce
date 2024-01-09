const userService = require("../services/user.service")
const jwtProvider = require("../middlewares/jwtProvider")
const bcrypt = require("bcrypt")

const register = async(req,res)=>{
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id)

        // await cartService.createCart(user)

        return res.status(201).json({jwt,message:"Registerd successfully"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


const login = async(req,res)=>{
    const {email,password} = req.body;
    try {  
        const user = await userService.getUserByEmail(email)

        if(!user)
            return res.status(404).json({message:"User not found with this email ",userEmail})

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid)
        return res.status(401).json({message:"Invalid Email or Password "})

        const jwt = jwtProvider.generateToken(user._id)

        return res.status(200).json({message:"Login Successfully"})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {register,login}