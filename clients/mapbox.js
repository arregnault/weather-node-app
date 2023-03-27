const axios = require('axios');

if (!process.env.MAPBOX_KEY) {
    throw `¡Configure la variable de entorno MAPBOX_KEY!`.red;
}

const mapboxClient = axios.create({
    baseURL: 'https://api.mapbox.com',
    params: {
        access_token: process.env.MAPBOX_KEY,
        language: 'es',
    },
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports = mapboxClient;