const express = require('express');
const router = express.Router();
var path = require('path');
var request = require('request');



const product_controllers = require('../controllers/product.controllers');


router.post('/requests', product_controllers.ride_create);
router.post('/pricing',product_controllers.ride_price);
router.post('/cancel',product_controllers.cancel_ride);
router.post('/gettrips',product_controllers.get_all);
router.post('/tripdata',product_controllers.get_trip_details);


module.exports = router;
