

let homepage = function(req, res){
    res.send(`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="homepage.css">

        <title>Viva Marking System</title>
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
          <div class="allExceptHeader">
        <h1>Are you a - </h1>
        <button><a href="/teachers">Teacher</a> </button>
        <button><a href="/students">Student</a></button>
          </div>
    </body>
    </html>`)  
}

module.exports = {homepage}