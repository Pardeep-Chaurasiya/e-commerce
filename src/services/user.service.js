const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwtProvider = require("../middlewares/jwtProvider")

const createUser = async(userData) =>{
    try {
        const {firstName,lastName,email,password} = req.body

        const isUserExist = await User.findOne(email)

        if(isUserExist)
            throw new Error("User already exist with this email :",email)

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,

        })

        console.log("User Created !!",newUser);

        return newUser
    } catch (error) {
        throw new Error(error.message)
    }
}


const getUserById = async(userId)=>{
    try {
        const user = await User.findById(userId).populate("address")
        if(!user)
            throw new Error("User not found with this id ",userId)
        throw user
    } catch (error) {
        throw new Error(error.message)
    }
}


const getUserByEmail = async(userEmail)=>{
    try {
        const user = await User.findOne(email)
        if(!user)
            throw new Error("User not found with this email ",userEmail)
        throw user
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserProfileByToken = async(token)=>{
    try {
        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserById(userId)
        if(!user)
            throw new Error("User not found with this id ",userId)
        throw user
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllUser = async() =>{
    try {
        const users = await User.find()
        return users
    } catch (error) {
        throw new Error(error.message)
        
    }
}
module.exports = {createUser,getUserById,getUserByEmail,getUserProfileByToken,getAllUser}