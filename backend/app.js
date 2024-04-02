const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require("cookie-parser");
const dotenv =require('dotenv');
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const path = require('path')

//Config

if(process.env.NODE_ENV!="PRODUCTION"){
    require('dotenv').config({path:"backend/config/config.env"})
}

app.use(express.json())
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload()) 

// Routes Imports 

const students = require("./routes/studentRoute");
const teachers = require("./routes/teacherRoutes");
const form = require("./routes/formRoutes");
const transactions = require("./routes/transactionRoutes")

app.use("/api/v1",students);
app.use("/api/v1",teachers);
app.use("/api/v1",form);
app.use("/api/v1",transactions);

// Middleware for Errrors

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
})


module.exports = app;