const {express, app, nodemailer, transporter, datetime, ExactTime} = require('./dependencies')
let mongodb = require('mongodb')
let db
let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
   
})
app.use(express.urlencoded({extended: false}))
// dependencies that are needed to access database.



// another files that are exported


let teachersPage = function(req, res){
    db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem) {
        
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="teachers.css">
            <style>
              
        /* nav starts here */
        nav {
            display: flex;
            position: fixed;
            top: 0px;
            left: 0px;
            padding: 20px 20px 20px 20px;
            justify-content: space-between;
            background-color: black;
            color: white;
            width: 100%;
            z-index: 10;
            
          }
          @media(max-width: 700px) {
            nav{
            flex-direction: column;
            }
          }
          
          .nav-link {
            color: white;
            text-decoration: none;
          }
          nav li {
            display: inline-block;
            padding: 20px 50px 10px 20px;
            border-radius: 13px;
            }
          nav li:hover{
             background-color: rgb(55, 143, 224);
           
            
          }
           nav li:hover a{
            color: rgb(0, 2, 128);
             letter-spacing: 2px;
          }
          .logo {
            max-width: 50px;
            clip-path: circle(50% at 50% 50%);
            
          }
        
          /* nav finished here */
        
          
          .subHeader, .submittedlist {
            margin-top: 140px;
            left: 0px;
            margin-left: auto;
            margin-right: auto;
            width: 80%;
            border: 1px solid green;
            text-align: center;
            border-radius: 14px;
            background-color: rgb(0, 22, 95);
          }
        
        
          input[type=submit], input[type=text], input[type=number], input[type=email]{
            display: inline-block;
            font-size: 1em;
            background: rgb(255, 255, 255);
            padding: 10px 30px;
            text-transform: uppercase;
            text-decoration: none;
            font-weight: 500;
            margin-top: 10px;
            margin-right: 2px;
            color: #111;
            letter-spacing: 2px;
            transition: 0.2s;
            border-radius: 12px;
            margin-bottom: 10px;
            
          }
          input:hover{
            background-color: rgb(24, 209, 255);
            color: rgb(45, 0, 104);
            transform: scale(1.1);
            border: 5px solid white;
            
          }
        /* sub header ends here */
        
        /* submitted list begins here */
        
        .submittedlist table {
            /* background: rgb(0, 225, 255); */
            border: 1px solid whitesmoke;
            border-radius: 12px;
            margin: 20px 0 20px 0;
            margin-left: auto;
            margin-right: auto;
            font-size: 20px;
            color: rgb(255, 255, 255);
        }
        
        .submittedlist td{
            padding: 2rem 2rem 2rem 2rem;
            margin: auto;
        }
        
        .submittedlist th {
            border:1px soild rgb(24, 209, 255);
        }
            </style>
            <title>Teacher</title>
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
        
              <div class="subHeader">
                <form id="form" action="/teachers-submit" method="POST">
                <input name="idnumber" type="number" placeholder="IDNumber" >
                    <input name="marks" type="number" placeholder="Marks" >
                    <input type="submit">
                </form>
                <form id="form" action="/teachers-email" method="POST">
                <input name="email" type="email" placeholder="Email" >
                    
                <input type="submit" value="Send">
                </form>
                    
              </div>
        
              <div class="submittedList">
                  <table>
                      
                      <tr><th>ID Number</th><th>Marks</th></tr> 

                      ${vivaSystem.map(function(anyNameAsParameter){
                          return `
                          <tr><td>${anyNameAsParameter.idNumber}</td><td>${anyNameAsParameter.Marks}</td> <td><input type="submit" value="Edit"></td><td><input type="submit" value="Delete"></td></tr>`
                       
                      }).join('')}

                   
                    
        
                </table>
              </div>
        </body>
        </html>`)  
    })
}
 
let teachersSubmit = function(req, res) {



    // data structure inside database
        db.collection('vivaSystem').insertOne({
            idNumber: req.body.idnumber,
            Marks: req.body.marks, 
            time: ExactTime},
            function(){
                res.redirect('/teachers')
            }
        )
    
        // mail notification for students
        // mail body and contents
        var mailOptions = {
          from: 'tahirtamin20@outlook.com',
          to: `tahirtamin20@gmail.com`,
          subject:  "TimeStamp of students (automated)",
          html: `<tr style="border: 10px solid;"><td>ID</td><td>TimeStamp</td></tr> <br>
          
          <tr><td>${req.body.idnumber}</td>${ExactTime}<td></td></tr> <br>`
        };
      
     
        // mail sending codes
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    
    
      }

module.exports = {teachersPage, teachersSubmit}