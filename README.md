# previous-week-weather-microservice

Provides weather conditions from the previous week.  All you need to provide are geographical coordinates and time in unix format.

## Requirements

- Node 8.x
- Express 4.x

## Development

First, sign up for your own API key for DarkSkyAPI.  Once you have an API key, add your API key into the config.js file inside of 'prev-week' directory.

From the command line inside the 'prev-week' directory, run the command ```npm install``` then start up the server by running ```npm start```.  Take note of the port number from command line.

Add your port number to this address http://localhost:YOURPORTNUMBER/prevWeek?latitude=34.0522&longitude=118.2437&time=1505105526 and open up in browser to test it out.

### Setting up Google App Engine for Deployment
Google Cloud Platform has created a simple way to deploy your microservice.  They provide a great way to start quick and set up with Google App Engine using NodeJS at this link: https://cloud.google.com/nodejs/getting-started/hello-world#before-you-begin.

The service is currently available at https://prev-week-dot-prev-weather.appspot.com
  (Example: https://prev-week-dot-prev-weather.appspot.com/prevWeek?latitude=34.0522&longitude=118.2437&time=1505105526) Note: Must provide latitude, longitude and time in unix format to obtain daily weather data for the previous week.

