let dependencies = require('./export_files/dependencies')



let port = process.env.PORT
if(port == null || port == ""){
  port = 3000
}

let databaseConnect = dependencies.mongodb.connect(dependencies.connectionString, {useNewUrlParser: true}, function(err, client){
    
  db = client.db() 
  dependencies.app.listen(port)
}) 

module.exports = {databaseConnect}