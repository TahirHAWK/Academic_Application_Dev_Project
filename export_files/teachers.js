let  {express, app, nodemailer, mongodb, connectionString, transporter} = require('./dependencies')
const {databaseConnect} = require('../db')

// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))


// dependencies that are needed to run the codes below



// another files that are exported


let teachersPage = function(req, res){
    db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem) {
        
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="teachers.css">
            
            <title>Teachers</title>
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
                          <tr>
                          <td>${anyNameAsParameter.idNumber}</td><td>${anyNameAsParameter.Marks}</td> 
                          <td>
                          <button data-id="${anyNameAsParameter._id}"  class="edit">Edit</button></td>
                          <td><button data-id="${anyNameAsParameter._id}"  class="delete">Delete</button></td>
                          </tr>`
                       
                      }).join('')}

                   
                    
        
                </table>
              </div>
              <script type="text/javascript" src="https://unpkg.com/axios@0.21.4/dist/axios.min.js"></script>
              <script  src="browser_file_teachers.js"></script>

        </body>
        </html>`)  
    })
}
 
let teachersSubmit = async function(req, res) {
    // data structure inside database
var datetime = new Date();
// 'Asia/Dhaka'

let ExactTime =  await datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
// date and time formation and code must be included inside the function when it was called, it cannot be exported from another module otherwise it will be a fixed time when the program first compiled everytime a single data inserted.If it is called inside a function then it will record the time when it was called right away, hence the right time that we want to show output.
        await db.collection('vivaSystem').insertOne({
            idNumber: req.body.idnumber,
            Marks: req.body.marks, 
            time: ExactTime},
            function(){
                res.redirect('/teachers')
            }
        )
    
        // mail notification for students
        // mail body and contents
        var mailOptions =  {
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

let teachersEmail =  function(req, res) {
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
        console.log('Email sent(all marks): ' + info.response);
     
      }
    })
    res.redirect('/teachers')
  }
);}

let deleteStudent = function(req, res){
  let blogID = new mongodb.ObjectID(req.body.id)
  db.collection('vivaSystem').deleteOne({_id: blogID}, function(){
    res.send("success")
  })
}


let editStudent = function(req, res){
  let blogID = new mongodb.ObjectID(req.body.id)
  db.collection('vivaSystem').findOneAndUpdate({_id: blogID}, {$set: {idNumber: req.body.idnumber, Marks: req.body.marks}}, function(){
    
    res.send("Success")

  })
}

    
 
  


module.exports = {teachersPage, teachersSubmit, teachersEmail, deleteStudent, editStudent}