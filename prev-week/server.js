"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.js');
const rp = require('request-promise');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

function dates(today) {
  var weekArray = [];
  for(var day = 7; day > 0; day--) {
    weekArray.push(today - day*(24*60*60));
  }
  return weekArray
}

app.get('/prev-week', (req, res) => {
  var currentUnixTime = req.query.time;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  //send error if date, latitude, longitude are not provided
  if (!currentUnixTime || !latitude || !longitude) {
    res.status(400).send("Error: Latitude, longitude, and current unix time required");
  }

  var results = {};
  results.currentUnixTime = currentUnixTime;
  results.prevWeek = {};

  //group asynchronous calls to check for completion later
  var previousWeekDates = dates(currentUnixTime);
  var promisedDates = previousWeekDates.map((date, index) => {
    return new Promise((resolve) => {
      var url = `https://api.darksky.net/forecast/${config.key}/${latitude},${longitude},${date}?exclude=currently,flags,hourly`;
      rp(url)
       .then((response) => {
          results.prevWeek[index+1] = JSON.parse(response);
          resolve(response);
        })
       .catch((err) => {
          console.log("Error: DarkSkyAPI did not complete request");
       })
    })
  })

  //when async calls are complete, send response with data from all seven days
  Promise.all(promisedDates)
    .then((response) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(500).send("Error: Promise all not working");
    })

});

console.log("Listening on port: ", port);
app.listen(port);