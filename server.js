const express = require('express');
const hbs = require('hbs'); //hbs under npm -- wrapper for handlebars
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('serer.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Under Maintenance'
//   });
// });

app.use(express.static(__dirname + '/public')); //middlewear can be used using this function

hbs.registerHelper('getCurrentYear', () => {
  return(new Date().getFullYear());
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => { // request and response
  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Amir',
  //   likes: ['biking', 'cities']
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to My Website"
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  }); // 'views' is the default directory that express uses for templates
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page',
    welcomeMessage: 'Portfolio Page Here'
  });
});



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
