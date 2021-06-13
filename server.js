let express = require('express')
let app = express()
let mongodb = require('mongodb')
let db
let connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    db = client.db()
    app.listen(3000)
})

app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/teachers', function(req, res) {
    res.render('teachers')
})
app.post('/teachers')



app.get('/students', function(req, res) {
    res.render('students')
})

 






