const express = require("express")
const dotenv = require("dotenv").config()
const {connectDB} = require("./config/db.config")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
connectDB()
app.listen(PORT,()=>{
    console.log(`Server started on port : http://localhost:${PORT}`);
})