const express = require("express")
const dotenv = require("dotenv").config()
const {connectDB} = require("./config/db.config")
const cors = require("cors")
const authRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.route")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/users",userRoute)

const PORT = process.env.PORT;
connectDB()
app.listen(PORT,()=>{
    console.log(`Server started on port : http://localhost:${PORT}`);
})