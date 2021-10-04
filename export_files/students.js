
let studentsPage = function(req, res){
    db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, vivaSystem){
        if (err) {
            console.log(err);
          } else if (vivaSystem.length) {
           console.log('Found:');
            mk = vivaSystem;
            res.render('students', {title: 'Students', cssfile: 'students',vivaSystem: vivaSystem})
            console.log('mk = ', mk);
          } else { 
            console.log('No document(s) found with defined "find" criteria!');
          }
    })
}
 
let studentsPageData = function(req, res){
  console.log("Time of requesting server from frontend: ", req.body.time)
  db.collection('vivaSystem').find().sort({"_id": -1}).toArray(function(err, info){
    if (err) {
        console.log(err);
      } else if (info.length) {
       console.log('Found:');
        mk = info;
        res.json(info)
        console.log(info)
      } else { 
        console.log('No document(s) found with defined "find" criteria!');
      }
})
}

module.exports = {studentsPage, studentsPageData}