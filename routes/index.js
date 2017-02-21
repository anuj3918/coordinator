var express = require('express');
var router = express.Router();
var https = require('http');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/api', function(req, res, next) {
  console.log("api hit");
  
	request('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBV4jkQuOWU25khud0fFM3vDk43QfCD-_c', function (error, response) {
	  if (!error && response.statusCode == 200) {
	    //console.log(body) // Show the HTML for the Google homepage. 
	    console.log('data came')
	  }else{
	  	console.log('data didnt came')
	  	console.log(error);
	  }
	})
});

module.exports = router;
