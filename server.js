const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hello, nice to meet you');

});

app.get('/weather', (request, response, next) => {
console.log(request.query);
  try {
    let cityRequested = request.query.city_name;
    console.log('user searched for:', cityRequested);

    let cityObject = data.find(city => city.city_name === cityRequested);
    console.log(cityObject.data);

    let forecast = cityObject.data.map(obj =>
      new Forecast(obj)
    );
    console.log(forecast);
    response.send(forecast);

    if (!cityObject) {
      throw new Error('City not found');
    }

  } catch (error) {
    next(error);
  }
});
function Forecast (cityObject) {
  this.date = cityObject.valid_date;
  this.description = cityObject.weather.description;
}

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen (PORT, () => console.log(`listening on ${PORT}`));
