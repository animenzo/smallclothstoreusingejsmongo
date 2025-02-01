const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const path = require('path')
const expressSession = require("express-session")
const flash = require("connect-flash")



const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

 require("dotenv").config()
 const appRouter = require("./routes/app")


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
const db = require('./config/mongooseConnection')


app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_KEY
}))
app.use(flash())
app.set("views", path.join(__dirname, "views"))


app.set("view engine","ejs")

app.use("/", appRouter)

app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)



app.listen(3000,function(){
    console.log("server is running on port 3000")
})