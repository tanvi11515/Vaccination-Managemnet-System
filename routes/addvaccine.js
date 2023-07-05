var express = require('express');
var router = express.Router();
var Vaccine = require('../models/Vaccine').Vaccine;

/* GET add item page. */
router.get('/', function(req, res, next) {
  res.render('add_vaccine', { title: 'Add Vaccine details' });
});

/*Add item*/
router.post('/', function(req, res) {
// Get our form values. These rely on the "name" attributes
    var cname = req.body.cname;
    var duration = req.body.duration;
    var start = req.body.start;
	var Lecturer = req.body.Lecturer;
    var seats = req.body.seats;
    console.log(req.body);
// Submit to the DB
Vaccine.create({        
        "cname" : cname,
        "duration" : duration,
        "start" : start,
		"Lecturer" : Lecturer,
        "seats" : seats

    }, function (err, doc) {
        if (err) {
        	console.log('error');
            // If it failed, return error
            res.send("There was a problem in adding items.");
        }
        else {
            // And forward to success page
			console.log('item added successfully');
            res.redirect('/people_vaccine');
        }
    });
});

module.exports = router;