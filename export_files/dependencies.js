let express = require('express')
let app = express()
let nodemailer = require('nodemailer')

let mongodb = require('mongodb')
let db
let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

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

  // time related configuration and function
var datetime = new Date();
let ExactTime = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// Time config ends here.

module.exports = {express, app, nodemailer, mongodb, connectionString, transporter, datetime, ExactTime}