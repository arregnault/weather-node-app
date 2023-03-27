const openWeatherClient = require('../clients/open-weather');

const Weather = require('./Weather');

class Place {
    id = '';
    name = '';
    lat = 0;
    long = 0;

    constructor(id, name, lat, long) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.long = long;
    }

    async getWeather() {

        try {
            const response = await openWeatherClient.get(`/2.5/weather?lat=${this.lat}&lon=${this.long}`)
            const { weather, main } = response.data;
            return new Weather(
                (weather[0] || {}).description,
                main.temp,
                main.temp_min,
                main.temp_max,
            );
        } catch (error) {
            return {};
        }
    }

    async printDetails() {
        const weather = await this.getWeather();

        console.log(`\n--------------------------------------`.rainbow);
        console.log(`         Información del lugar        `.bgWhite);
        console.log(`--------------------------------------`.rainbow);
        console.log(`Lugar:`.yellow, this.name);
        console.log(`Latitud:`.magenta, this.lat);
        console.log(`Longitud:`.magenta, this.long);
        console.log(`Clima:`.blue, weather.description);
        console.log(`Temperatura normal:`.green, `${weather.temp} °C`);
        console.log(`Temperatura mínima:`.blue, `${weather.tempMin} °C`);
        console.log(`Temperatura máxima:`.red, `${weather.tempMax} °C`);
        console.log(`--------------------------------------\n`.rainbow);

    }
}

module.exports = Place;