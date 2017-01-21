var bodyParser = require('body-parser');  
var morgan = require('morgan');  
var passport = require('passport');
var config = require('./config/main')
var User = require('./app/models/users');    
var jwt = require('jsonwebtoken');  
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var cors = require('cors');
var officegen = require('officegen');
var async = require('async');
var nodemailer = require('nodemailer');


//Routes
var tokenAuthRoute = require('./routes/tokenAuth');
var authkeyRoute = require('./routes/generatekey');
var registerRoute = require('./routes/register');
var cvRoute = require('./routes/cvsave');
var cvExperienceRoute = require('./routes/cvExperience');
var cvEducationRoute = require('./routes/cvEducation');
var cvSkillRoute = require('./routes/cvSkill');



var PORT = process.env.PORT || 3000;

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// Log requests to console
app.use(morgan('dev'));  

// Initialize passport for use
app.use(passport.initialize());  

// Bring in defined Passport Strategy
require('./config/passport')(passport);  


mongoose.connect(config.database);

app.options('*', cors());
app.use(cors());




// Set url for API group routes
app.use(tokenAuthRoute);  
app.use(authkeyRoute);
app.use(registerRoute);
app.use(cvRoute);
app.use(cvExperienceRoute);
app.use(cvEducationRoute);
app.use(cvSkillRoute);



// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {  
  res.render('homepage.ejs');
});


app.listen(PORT, function(req, res){
	console.log('Server started at port ' + PORT);
});
