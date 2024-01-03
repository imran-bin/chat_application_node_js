const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const app = express()

dotenv.config()
app.get('/', (req,res)=>{
    res.send('Server create and test .')
})
app.listen(3000,()=>{
    console.log("Server is running");
})