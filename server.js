'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const getMovies = require('./modules/movies.js');
app.get('/movie', movieHandler);

const weather = require('./modules/weather.js');
app.get('/weather', weatherHandler);

function movieHandler(request, response, next) {
  getMovies(request, response, next)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.log(error);
      response.status(500).send('Movies are unavailable');
    });
}


function weatherHandler(request, response, next) {
  // const { lat, lon } = request.query;
  weather(request, response, next)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something isn\'t right!');
    });
}



app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
