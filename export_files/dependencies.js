let express = require('express')
let app = express()
let nodemailer = require('nodemailer')
app.use(express.urlencoded({extended: false}))

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

module.exports = {express, app, nodemailer, transporter, datetime, ExactTime}