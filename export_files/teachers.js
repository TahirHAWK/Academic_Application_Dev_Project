let  {express, app, nodemailer, mongoose, ejs, mongodb, connectionString, transporter, MailOptions} = require('./dependencies')
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
      if (err) {
        console.log(err);
      } else if (vivaSystem.length) {
       console.log('Found:');
        mk = vivaSystem;
        res.render('teachers', {title: 'Teachers', cssfile: 'teachers', vivaSystem: vivaSystem, error: ''})
        
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
          
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
        let mailhtmlParameter = `<tr><td>${req.body.idnumber}</td>${ExactTime}<td></td></tr> <br>`

            let mailoptions2 = new MailOptions('tahirtamin20@gmail.com', 'singleTime', mailhtmlParameter)
      
     
        // mail sending codes
         transporter.sendMail(mailoptions2, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);

          }
        })    
      }

let teachersEmail =  function(req, res) {
  db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem) {
    // data that are going be sent through mail
    let datafile = vivaSystem.map(function(data){
      return `<tr><td style="padding: 20px 20px 20px 20px; color: blue;">${data.idNumber} </td>
      <td style="padding: 20px 20px 20px 20px;"> ${data.Marks}</td>
      <td style="padding: 20px 20px 20px 20px;"> ${data.time}</td>`
    })
    console.log(datafile)

    // mail body and contents
    let mailoptions = new MailOptions(req.body.email, 'allMark', datafile)  
    

    // mail sending codes
    transporter.sendMail(mailoptions, function(err, info){
      if (err) {
        console.log(err);  
        res.send(err)
      } else {
        console.log('Email sent(all marks): ' + info.response);
        res.send('success')
     
      }
    })
    
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
  db.collection('vivaSystem').findOneAndUpdate({_id: blogID}, {$set: {idNumber: req.body.idnumber, Marks: req.body.marks}}, function(err, info){
    console.log(info)
    // res.send("success")
    res.json(info.value)

  })
}

let passwordProtection = function(req, res, next){
  res.set('WWW-Authenticate', 'Basic realm="Viva Marking System"')
  console.log(req.headers.authorization)
  if(req.headers.authorization == "Basic dGVzdDp0ZXN0"){
    next()
  } else {
    res.status(401).send(`Authentication required <br> <a href="/">Go to Home</a>`)
  }
  
}

    
 
  


module.exports = {teachersPage, teachersSubmit, teachersEmail, deleteStudent, editStudent, passwordProtection}