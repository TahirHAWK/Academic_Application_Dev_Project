let  {express, app, nodemailer, mongodb, connectionString, transporter} = require('./dependencies')
const {databaseConnect} = require('../db')

// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below

let studentsPage = function(req, res){
    db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem){
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="students.css">
            
            <title>Students</title>
        </head>
        <body>
        <header id="header">
            <nav id="nav-bar">
            <li><img id="header-img" src="https://hstu.ac.bd/img/hstu_correct_logo.png" alt="hstu logo" class="logo"></li>
            <li><a class="nav-link" href="/">Home</a></li>
            <li><a class="nav-link" href="/teachers">Teachers</a></li>
            <li><a class="nav-link" href="/students">Students</a></li>
              
            </nav>
          </header>
    
         
    
          <div class="submittedList">
              <table>
                  
                  <tr><th>ID Number</th><th>TimeStamp</th></tr> 

                ${vivaSystem.map(function(anyName){
                    return `<tr><td>${anyName.idNumber}</td><td>${anyName.time}</td></tr>`
                    
                })}

                
    
            </table>
          </div>
    </body>
        </html>`)  
        
    })
}
 
module.exports = {studentsPage}