var express = require('express');
var router = express.Router();
var Vaccine = require('../models/Vaccine').Vaccine;

/* GET stocks page. */
router.get('/', function(req, res, next) {	

	Vaccine.find().
    exec(function(err, Vaccine) {
              res.render('enroll' , {title: 'Enroll',VaccineList : Vaccine});
        });

  });  

/* GET order item page */
router.get('/:Id', function(req, res) {

    var Id = req.params.Id;

    Vaccine.findOne({_id:Id}).
    exec(function(err, Vaccine) {
        if (err) {
            // If it failed, return error
            res.send("Error in Vaccine founding.");
        }
        else{
              res.render('make_enroll',{title: 'Enroll', enrollingVaccine : Vaccine});
            }
        });
    });

/* Order an item */
router.post('/:Id', function(req, res) {
    var Id = req.params.Id;
    var count = req.body.enrollingSeats;

    Vaccine.findOne({_id:Id}).
    exec(function(err, Vaccine) {
        if (err) {
            // If it failed, return error
            res.send("Error occured when finding the Vaccine!");
        }
        else{
        	if((Vaccine.seats)>=count)
        	{
        		var rest_seats = Vaccine.seats-count;
                //update item table
        		updateSeatCount(Id,rest_seats);

        		res.redirect('/vaccine_enroll');
   
        	}else{

                if(Vaccine.seats<count){
        		  res.render('error',{ message : 'Cannot book the slot Because only '+Vaccine.seats+' no. of slots are available!'});
                }
        	}
            }
        });
    });

//function for updating item table after ordering an item
function updateSeatCount(_id,count){

	Vaccine.findOne({_id:_id}).
    exec(function(err,Vaccine) {

        	Vaccine.seats = count;

        	Vaccine.save(function (err, updatedSeatsno) {
            if (err) {
            }    
        });
    });
}
module.exports = router;