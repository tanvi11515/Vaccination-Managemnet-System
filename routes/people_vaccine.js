var express = require('express');
var router = express.Router();
var Vaccine = require('../models/Vaccine').Vaccine;

/* GET Vaccines page. */
router.get('/', function(req, res, next) {
	Vaccine.find({},{}, function(err, docs){
            if(err) res.send(err);
            res.render('Vaccine', { Vaccine : docs });
  
    });
});

//Delete a Vaccine when Vaccine id has been given
router.get('/:id',function (req,res){
  Vaccine.findOneAndRemove({_id : req.params.id}, function (err,result){
    res.redirect('/people_vaccine')
  });
});

//Get Vaccine update page when Vaccine id has been given
router.get('/update/:id', function(req, res) {

    var id = req.params.id;
    Vaccine.findOne({_id:id}). 
    exec(function(err, Vaccine) {

        if (err) {

            // If Vaccine cannot be found, then display the error message
            res.send("Error occured when Vaccine was founding!");
        }
        else{
              res.render('update',{title: 'Update', updatingVaccine : Vaccine});
            }
        });
    });

//Update a Vaccine when Vaccine id has been given
router.post('/update/:id', function(req, res) {
    var id = req.params.id;
    var duration = req.body.duration; 
    var start = req.body.start;
    var Lecturer = req.body.Lecturer;
    var seats = req.body.seats;

    Vaccine.findOne({_id:id}).
    exec(function(err, Vaccine) {
        console.log(Vaccine);
        if (err) {
            // If it failed, return error
            res.send("Error in item founding.");
        }
        else{
            console.log(Vaccine);
            Vaccine.duration = duration; 
            Vaccine.start= start;
            Vaccine.Lecturer =Lecturer ;
            Vaccine.seats= seats;
            console.log(Vaccine);
            Vaccine.save(function (err, updatedVaccine) {
                if (err) {
                    throw err;
                }
                res.redirect('/people_vaccine');

        });
            
        }
            
    });
});

module.exports = router;