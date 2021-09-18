let {express, app, nodemailer, mongodb, connectionString, transporter} = require('./export_files/dependencies')



let port = process.env.PORT
if(port == null || port == ""){
  port = 3000
}

let databaseConnect = mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    
  db = client.db() 
  app.listen(port)
}) 

module.exports = {databaseConnect}