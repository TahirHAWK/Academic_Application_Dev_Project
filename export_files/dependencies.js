let express = require('express')
let app = express()
let nodemailer = require('nodemailer')
let mongoose = require('mongoose')
let ejs = require('ejs')

let mongodb = require('mongodb')
let db
// let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
// for offline
// always commit your changes to github after activating the online string and turning off the offline.
// in this sentence 'mongodb://localhost:27017/?readPreference' in between the '/' and '?' write the database name that you want to connect to


let connectionString = 'mongodb+srv://appdev:appdev@appdev.6ppvo.mongodb.net/AppDev?retryWrites=true&w=majority'
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
      pass: 'alhamdulillah56964'
    }
  });
// declaring constructor for mailoptions
  let MailOptions = function(recipientEmail, subject, mailhtmlParameter) {
    this.from = 'tahirtamin20@outlook.com'
    this.to = recipientEmail
    if(subject == 'allMark'){
      this.subject= 'All Marks of students (automated)'
    } else if(subject == 'singleTime'){
      this.subject = 'TimeStamp of students (automated)'
    } else {
        this.subject = subject
    }
    
    
    if(subject == 'allMark'){
      this.html = `<tr style="border: 10px solid;"><td>ID</td><td>Marks</td><td>TimeStamp</td></tr> <br>
      ${mailhtmlParameter} <br>`
    } else if(subject == 'singleTime'){
      this.html = `<tr style="border: 10px solid;"><td>ID</td><td>TimeStamp</td></tr> <br>
        
      ${mailhtmlParameter}`
    }
    }
  


module.exports = {express, app, nodemailer, mongoose, ejs, mongodb, connectionString, transporter, MailOptions}