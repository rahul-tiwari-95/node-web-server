const express = require('express'); // Impprting Express.js
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('viewengine' , 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request , respond , next )=>{

  var now = new Date().toString();
  var log = `${now} : ${request.method} ${request.originalUrl}`;
  console.log(log + '\n');
  fs.appendFileSync('servers.json' , JSON.stringify(log) , (error)=>{

    if(error){
      console.log("Unable to write File");
    }
  })

  next();
});

app.use((request , respond , next)=>{
  respond.render('maintenance.hbs');
});



hbs.registerHelper('getCurrentYear' , ()=>{
  return new Date().getFullYear();
});


hbs.registerHelper('multiply' , (a,b)=>{
  return a*b;
});


app.get('/',(request , respond)=>{  //Classic exmaple of a callback function

    respond.send('Hello Express');
});

app.get('/about' , (request , respond)=>{

  respond.render('about.hbs' , {
    pageTitle : 'About Page',
    content: ' This is using Handlebars Functionality.'
  });
});

app.get('/home' , (request , respond)=>{

  respond.render('home.hbs' , {
    pageTitle : 'Home Page',
    content: ' Welcome to Home Page!! This is using Handlebars Functionality.'
  });
});

app.get('/bad' , (request , respond)=>{

  respond.send({

    Error_Type : 'Bad Code Encountered',
    Info  : [
      'Refresh the page',
      'Un-responsive Servers'
    ]
  })
})


app.listen( 4000 , ()=>{
  console.log("Server is up and serving on: localhost:3000");
});
