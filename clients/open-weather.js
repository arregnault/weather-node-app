const axios = require('axios');

if (!process.env.OPEN_WEATHER_KEY) {
    throw `¡Configure la variable de entorno OPEN_WEATHER_KEY!`.red;
}

const openWeatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data',
    params: {
        appid: process.env.OPEN_WEATHER_KEY,
        lang: 'es',
        mode: 'json',
        units: 'metric',
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports = openWeatherClient;