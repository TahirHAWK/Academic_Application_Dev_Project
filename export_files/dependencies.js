let express = require('express')
let app = express()
let nodemailer = require('nodemailer')
let mongoose = require('mongoose')
let ejs = require('ejs')

let mongodb = require('mongodb')
let db
let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
// for offline


// let connectionString = 'mongodb+srv://appdev:appdev@appdev.6ppvo.mongodb.net/AppDev?retryWrites=true&w=majority'
// for online


// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below

// mail authentication configuration
let transporter = nodemailer.createTransport({
    service: 'hotmail',
  
  
    auth: {
      user: 'tahirtamin20@outlook.com', 
      pass: 'mycpscr56964'
    }
  });



module.exports = {express, app, nodemailer, mongoose, ejs, mongodb, connectionString, transporter}