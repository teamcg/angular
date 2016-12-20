var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../app/models/users');
var Authkey = require('../app/models/authkey'); 
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var moment = require('moment');




// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/authenticate', function(req, res) {  
  User.findOne({
    studentid: req.body.studentid
  }, function(err, user) {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 1000 // in seconds
          });
          
          res.json({ 
            success: true, 
            token: 'JWT ' + token,
            data: user });

        } else {
          res.json({ success: false });
        }
      });
  });
});

// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
  res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;