var express = require('express');
var router = express.Router();
var Peoples = require('../models/people').Peoples;

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'SignUp' });
});

/*SignUp user*/
router.post('/', function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var address = req.body.age;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    
Peoples.create({
        
        "name" : name,
        "email" : email,
        "age" : age,
        "address" : address,
        "password" : password,
        "cpassword" : cpassword

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("Error occured when signup!");
        }
        else {
            // And forward to success page
            res.redirect('/people_login');
        }
    });
});

module.exports = router;