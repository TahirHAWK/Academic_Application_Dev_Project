let {express, app, nodemailer, mongodb, connectionString, transporter} = require('./export_files/dependencies')

const {databaseConnect} = require('./db')
// this line tells express to automatically take asynchronous request data and add it to req object

app.use(express.json())
// this line tells express to automatically take submitted form data and add it to request object
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
// dependencies that are needed to run the codes below






const {homepage} = require('./export_files/homepage')
const {teachersPage, teachersSubmit, teachersEmail, deleteStudent, editStudent} = require('./export_files/teachers')
const {studentsPage} = require('./export_files/students')
// dependencies and other include files and configurations ends here




// homepage
app.get('/', homepage) 

// teachers section starts here
app.post('/teachers-submit', teachersSubmit)
app.post('/teachers-email', teachersEmail)
app.post('/delete-student', deleteStudent)
app.post('/edit-student', editStudent)
app.get('/teachers', teachersPage)
// teachers section ends here


// student section starts here
app.get('/students', studentsPage)
