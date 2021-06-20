

let homepage = function(req, res){
    res.send(`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <style>
          
    /* nav starts here */
    nav {
      display: flex;
      position: fixed;
      top: 0px;
      left: 0px;
      padding: 20px 20px 20px 20px;
      justify-content: space-between;
      background-color: black;
      color: white;
      width: 100%;
      z-index: 10;
      
    }
    @media(max-width: 700px) {
      nav{
      flex-direction: column;
      }
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
    }
    nav li {
      display: inline-block;
      padding: 20px 50px 10px 20px;
      border-radius: 13px;
      }
    nav li:hover{
       background-color: rgb(55, 143, 224);
     
      
    }
     nav li:hover a{
      color: rgb(0, 2, 128);
       letter-spacing: 2px;
    }
    .logo {
      max-width: 50px;
      clip-path: circle(50% at 50% 50%);
      
    }
    
    /* nav finished here */
    
      .allExceptHeader {
        margin-top: 140px;
        left: 0px;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        border: 1px solid green;
        text-align: center;
        border-radius: 14px;
        background-color: rgb(0, 22, 95);
        color: rgb(255, 255, 255);
      }
      
      button{
        display: inline-block;
        font-size: 1em;
        background: rgb(255, 255, 255);
        padding: 10px 30px;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: 500;
        margin-top: 10px;
        margin-right: 2px;
        color: #111;
        letter-spacing: 2px;
        transition: 0.2s;
        border-radius: 12px;
        margin-bottom: 10px;
        
        
      }
      button:hover{
        background-color: rgb(24, 209, 255);
        color: rgb(45, 0, 104);
        transform: scale(1.1);
        border: 5px solid white;
        
      }
        </style>
        <title>Document</title>
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