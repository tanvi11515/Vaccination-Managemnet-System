var express = require('express');
var router = express.Router();
var Peoples = require('../models/people').Peoples;

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('signin', { title: 'SignIn' });
});

/*Login user*/
router.post('/', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    
    Peoples.findOne({email:email}).
    exec(function(err, user) {
        if (err) {
            // If it failed, return error
            res.send("User authentication failed.");
        }
        else{
            console.log(user);
            if(user==null){
                res.render('error',{ message : 'Login Failed, You need to register first!.'});
                return;
            }else if(user.password != password){
                res.render('error',{ message : 'Password Mismatched!.'});
            }
            else{
                if(user.email == "windy@gmail.com")
                {
                  res.redirect('/people_vaccine');
                }
                else
                {
                  res.redirect('/vaccine_enroll');
                }
            }  
        }
    });

});

module.exports = router;