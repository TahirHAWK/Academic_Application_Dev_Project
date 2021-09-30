
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
 
module.exports = {studentsPage}