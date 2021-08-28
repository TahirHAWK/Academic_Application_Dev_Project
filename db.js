let {express, app, nodemailer, mongodb, connectionString, transporter, datetime, ExactTime} = require('./export_files/dependencies')


let databaseConnect = mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
    
  db = client.db() 
  app.listen(3000)
}) 

module.exports = {databaseConnect}