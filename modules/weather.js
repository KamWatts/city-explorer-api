async function getWeather(request, response, next) {
  const axios = require('axios');
  let cache = {};

  let cityLat = request.query.lat;
  let cityLong = request.query.lon;
  let key = cityLat + cityLong + 'Data';

  let timeToTestCache = 1000 * 20;
  if (cache[key] && Date.now() - cache[key].timestamp < timeToTestCache) {
    // console.log(cache[key]);
    // console.log('the data is already in the cache');
    // response.status(200).send(cache[key]);
  } else {
    console.log('It is not in the cache, make request');
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
      let weatherDataResults = weatherData.data.data.map(item => new Forecast(item));
      cache[key] = {
        data: weatherDataResults,
        timestamp: Date.now(),
      };
      return weatherDataResults;
      // response.send(weatherDataResults);
    } catch (err) {
      Promise.resolve().then(() => {
        throw new Error(err.message);
      }).catch(next);
    }
  }
}

class Forecast {
  constructor(weatherObject) {
    this.date = weatherObject.valid_date;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.max_temp} with ${weatherObject.weather.description.toLowerCase()}`;
  }
}

module.exports = getWeather;
