'use strict';

const axios = require('axios');
//weatherData: <the data to the front end in my response>
//every time when the server processes a request, it's saved to the cache (dataToSend)
//if the user searched for weather, the key is weatherData
let cache = {};

class Forecast {
  constructor(weatherObject) {
    // this.data = weatherObject;
    // this.city_name = weatherObject.city_name;

    this.date = weatherObject.valid_date;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.max_temp} with ${weatherObject.weather.description.toLowerCase()}`;
  }
}



async function getWeather(request, response, next) {

  let cityLat = request.query.lat;
  let cityLong = request.query.lon;
  let key = cityLat + cityLong + 'Data';

  // if the data is already cached and it's not expired, send the cached data
  let timeToTestCache = 1000 * 20;
  if (cache[key] && Date.now() - cache[key].timestamp < timeToTestCache) {
    console.log('the data is already in the cache');
    response.status(200).send(cache[key]);
    return;
  }

  // if the data isn't already in the cache or not recent enough, request the data from the API
  let config = {
    baseURL: 'http://api.weatherbit.io/v2.0/forecast/daily',
    params: {
      key: process.env.WEATHERBIT_API_KEY,
      lat: cityLat,
      lon: cityLong,
      days: 5,
    },
    method: 'get',
  };

  try {
    let weatherData = await axios(config);
    if (!weatherData || !weatherData.data || !weatherData.data.data || weatherData.data.data.length === 0) {
      throw new Error('Invalid weather data received from API');
    }

    let weatherDataResults = weatherData.data.data.map(item => new Forecast(item));
    cache[key] = {
      data: weatherDataResults,
      timestamp: Date.now(),
    };
    response.send(weatherDataResults);

  } catch (err) {
    console.error('Error fetching weather data:', err);
    let errorMessage = 'Error fetching weather data from API';
    if (err.response && err.response.status) {
      errorMessage += ` (status code ${err.response.status})`;
    }
    errorMessage += `: ${err.message}`;
    response.status(500).json({error: errorMessage});
    next(err);
  }
}

module.exports = getWeather;
