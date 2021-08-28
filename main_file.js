let {express, app, nodemailer, mongodb, connectionString, transporter, datetime, ExactTime} = require('./export_files/dependencies')

const {databaseConnect} = require('./db')
// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below





const {homepage} = require('./export_files/homepage')
const {teachersPage, teachersSubmit} = require('./export_files/teachers')
// dependencies and other include files and configurations ends here




// homepage
app.get('/', homepage) 

// teachers section starts here
app.get('/teachers', teachersPage)
app.post('/teachers-submit', teachersSubmit)

app.post('/teachers-email', function(req, res) {
  db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem) {
    // data that are going be sent through mail
    let datafile = `${vivaSystem.map(function(anyNameAsParameter){
      return `
      <tr><td style="padding: 20px 20px 20px 20px; color: blue;">${anyNameAsParameter.idNumber} </td>
      <td style="padding: 20px 20px 20px 20px;"> ${anyNameAsParameter.Marks}</td>`})}`

      // mail body and contents
    var mailOptions = {
      from: 'tahirtamin20@outlook.com',
      to: `${req.body.email}`,
      subject:  "Marks of students (automated)",
      html: `<tr style="border: 10px solid;"><td>ID</td><td>Marks</td></tr> <br>
      ${datafile} <br>`
    };
  

    // mail sending codes
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.redirect('/teachers')
  }
);})
// teachers section ends here


// student section starts here
app.get('/students', function(req, res){
    db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem){
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
        
        
          input[type=submit], input[type=text], input[type=number]{
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
})
