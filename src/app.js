const express = require('express');
const utils = require('../utils/utils');

const app = express();

app.get('/weather', ((req, res) => {
    const cityName = req.query.city;
    utils.getWeatherByString(cityName, (error, weather) => {
        if (error) {
            res.sendStatus(500);
        } else {
            res.status(200).send(weather);
        }
    });
}));

app.listen(3000, (() => console.log('Hello world!')));