const MongoClient = require('mongodb').MongoClient;
const assertabc = require('assert');
var request = require('request');

const url = 'mongodb://localhost:27017';

const DatabaseName = 'ride_details';
exports.ride_create = function(req,res){
  let user_input = {
    authorizationToken : "cuosIaNyN460FN26WV0YVhKW7GMOVd9wLIjhiooebKs=",
    user_id : "11714",
    circle_id : "249",
    userDetails :req.body.userDetails ,
    startAddress :req.body.startAddress ,
    startLat :req.body.startLat,
    startLon :req.body.startLon,
    startCity :req.body.startCity,
    endAddress :req.body.endAddress,
    endLat  :req.body.endLat ,
    endLon  :req.body.endLon ,
    endCity  :req.body.endCity ,
    startTime  :req.body.startTime ,
    carType  :req.body.carType ,
    packageDetails   :req.body.packageDetails  ,
    rideType   :req.body.rideType  ,
    rentalType   :req.body.rentalType  ,
    returnRide    :req.body.returnRide   ,
    rideComments    :req.body.rideComments   ,
    statusCallBack   :req.body.statusCallBack
  }
  for (var each_key in user_input) {
    if (user_input[each_key] === "undefined" || user_input[each_key] === "" ) {
      res.send({
             "response": "data missing: "+ each_key,
             "success": "false"
            })
      return true;
    }
  }
    console.log(user_input);
    request({
      url: 'https://testapis.hopon.co.in/requests/submitnewride',
      json: user_input,
      headers: {
        'x-api-key': 'MIqXWCGGEfa3aHPQgYe0I3COYaxtl1I540YCPa4n',
        'Content-Type' : 'application/json'
      },
      method: 'post'
    },function(error, response, result) {
      if (!error && response.statusCode == 200){
           if(result.success == false){
             // res.send(response)
             res.send(result);return true;
           }
       user_input["seekerIds"] = result["seekerIds"];
       MongoClient.connect(url, function(err, client) {
         assertabc.equal(null, err);
         const db = client.db(DatabaseName);
         db.collection('booked_details').insert(user_input, function(err,result_data){
               assertabc.equal(null, err);
               res.send(result);return true;
             })
           })
       return true;
      }
   })
}

exports.cancel_ride = function(req,res){
  let hop_data ={
    authorizationToken : "cuosIaNyN460FN26WV0YVhKW7GMOVd9wLIjhiooebKs=",
    user_id : "11714",
    circleId : "249",
    requestId : req.body.requestId
  }
for (var each_data in hop_data) {
  if (hop_data[each_data] === "undefined" || hop_data[each_data] === "" ) {
    res.send({
           "response": "data missing: "+ each_data,
           "success": "false"
          })
    return true;
  }
}
  request({
    url: 'https://testapis.hopon.co.in/cancel/cancelride',
    json: hop_data,
    headers: {
      'x-api-key': 'MIqXWCGGEfa3aHPQgYe0I3COYaxtl1I540YCPa4n',
      'Content-Type' : 'application/json'
    },
    method: 'post'
  },function(error, response, result) {
    if (!error && response.statusCode == 200){
             res.send(result);
       }else{
         console.log(error);
       }
     })
 return true;
}

exports.get_all = function(req,res){
  let user_data = {
    authorizationToken : "cuosIaNyN460FN26WV0YVhKW7GMOVd9wLIjhiooebKs=",
    user_id : "11714",
    circleId : "249",
    from_time:req.body.from_time,
    to_time:req.body.to_time,
    ride_type: req.body.ride_type
  }
  for (var each_data in user_data) {
    if (user_data[each_data] === "undefined" || user_data[each_data] === "" ) {
      res.send({
             "response": "data missing: "+ each_data,
             "success": "false"
          })
    return true;
  }
}
   var trips = " ";
  request({
    url: 'https://testapis.hopon.co.in/trips/gettrips',
    json: user_data,
    headers: {
      'x-api-key': 'MIqXWCGGEfa3aHPQgYe0I3COYaxtl1I540YCPa4n',
      'Content-Type' : 'application/json'
        },
    method: 'post'
    },function(error, response, result) {
      if (!error && response.statusCode == 200){
         res.send(result);
      MongoClient.connect(url, function(err, client) {
        assertabc.equal(null, err);
        const db = client.db(DatabaseName);
      db.collection("booked_details").find().toArray(function(err,results){
        if(err){
          console.log(error);
      }else{
        results.push(trips)
            }
          })
        })
      }
   })
 return true;
}

exports.get_trip_details =function(req,res){
  let trip_data = {
    authorizationToken : "cuosIaNyN460FN26WV0YVhKW7GMOVd9wLIjhiooebKs=",
    user_id : "11714",
    circle_id : "249",
    request_id : req.body.request_id
  }
  for (var each_data in trip_data) {
    if (trip_data[each_data] === "undefined" || trip_data[each_data] === "" ) {
      res.send({
             "response": "data missing: "+ each_data,
             "success": "false"
            })
      return true;
    }
  }
    request({
      url: 'https://testapis.hopon.co.in/tripdata/gettripdetails',
      json: trip_data,
      headers: {
        'x-api-key': 'MIqXWCGGEfa3aHPQgYe0I3COYaxtl1I540YCPa4n',
        'Content-Type' : 'application/json'
      },
      method: 'post'
    },function(error, response, result) {
      if (!error && response.statusCode == 200){
               res.send(result);
         }else{
           console.log(error);
         }
       })
   return true;
}
