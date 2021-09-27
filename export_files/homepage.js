

let homepage = function(req, res){
    res.render('homepage', {title: 'Homepage', cssfile: 'homepage'}) 
}

module.exports = {homepage}