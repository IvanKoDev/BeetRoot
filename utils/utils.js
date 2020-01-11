const request = require('request');

const getLocation = (searchQuery, callback) => {
    const token = 'pk.eyJ1IjoiYm9uZGlrIiwiYSI6ImNrNGQyem42NzB0aWszbW14bDFmZzI5MngifQ._MESARDPYIA7vKywYjD4Lw';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${token}`;

    request(url , (error, response, body) => {
		const locationInfo = JSON.parse(body).features[0];
		const cityName = locationInfo
        const coordinates = [locationInfo.center[1], locationInfo.center[0]];

        if (error) {
            callback('Conection error!');
        } else if (response.statusCode !== 200) {
            callback('Geocoding API error!');
        } else {
            callback(undefined, coordinates);
        }
    });
};

const getWeather = (coords, callback) => {
    const token = 'c5b4a80d47ef8ccf58c9cdbdd2f39f4c';
    const url = `https://api.darksky.net/forecast/${token}/${coords[0]},${coords[1]}?units=si`;

    request(url, (error, response, body) => {
        const weatherInfo = JSON.parse(body).currently;

        if (error) {
            callback('Conection error!');
        } else if (response.statusCode !== 200) {
            callback('Weather API error!');
        } else {
            callback(undefined, weatherInfo);
        }
    });
};

const getWeatherByString = (cityName = '', callback) => {
    getLocation(cityName, (error, location) => {
        if (error) {
            callback(error);
        } else {
            getWeather(location, (error, weather) => {
                if (error) {
                    callback(error);
                } else {
                    callback(undefined, {location, weather});
                }
            })
        }
    })
}

module.exports = {
    getLocation,
    getWeather,
    getWeatherByString
};
