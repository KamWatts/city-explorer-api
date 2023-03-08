const express = require('express');
const weather.json = require('./data/weather.json');
const app = express();

app.get('/', (request, response) => {
  response.send('Hello, nice to meet you');
  console.log(request);
  let cityName = request.query.city_name
  response.send(`Here's the weather in ${cityName}`)
})

app.listen(3000, () => {
  console.log('Listening on Port 3000');
})

// Define the three cities we have information about
const cities = {
  seattle: {
    lat: 47.6062,
    lon: -122.3321,
  },
  paris: {
    lat: 48.8566,
    lon: 2.3522,
  },
  amman: {
    lat: 31.9454,
    lon: 35.9284,
  },
};

// Get the search query from the user
const searchQuery = "Seattle weather";

// Check if the search query contains one of the city names
const city = Object.keys(cities).find((key) =>
  searchQuery.toLowerCase().indexOf(key) !== -1
);
if (city) {
  // If the city name is found, print the city name and its latitude and longitude
  console.log("City: ", city);
  console.log("Latitude: ", cities[city].lat);
  console.log("Longitude: ", cities[city].lon);
} else {
  // If none of the city names are found, print an error message
  console.log(
    "Error: The search query does not contain information about Seattle, Paris, or Amman."
  );
}

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

eachDay = [
  
Monday = new Forecast(date, description) {

},

Tuesday = new Forecast(date, description) {

},

Wednesday = new Forecast(date, description) {

},

Thursday = new Forecast(date, description) {

},

Friday = new Forecast(date, description) {

}

]