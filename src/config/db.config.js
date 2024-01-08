const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGO_URL
const connectDB = () =>{
    mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log(`Databse connected successfully`);
    })
    .catch((e)=>{
        console.log(e);
    })
}

module.exports = {connectDB}