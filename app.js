// external import
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")

// Mongo db run command 
// 1.sudo systemctl start mongod
// 2.sudo systemctl status mongod
// internal import
const {notFoundHandaler,errorHandaler} = require('./middlewares/common/errorHandaler')
const loginRouter = require("./router/loginRouter")
const usersRouter = require("./router/usersRouter")
const inboxRouter = require("./router/inboxRouter")

const app = express()

dotenv.config()
// Data base connection 
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
})

.then(()=>console.log("database connection successfullay"))
.catch((err)=>console.log(err))

// requset parser 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// set view engine

app.set("view engine","ejs")

// set static folder 

app.use(express.static(path.join(__dirname,"public")))

// cookieparser 

app.use(cookieParser(process.env.COOKIE_SECRET))

// routing setup
app.use("/",loginRouter)
app.use("/users",usersRouter)
app.use("/inbox",inboxRouter)
// 404 not found handaler
app.use(notFoundHandaler)

// common errorhandaler 

app.use(errorHandaler)

app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`);
})


