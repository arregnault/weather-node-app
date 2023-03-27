const mapboxClient = require('../clients/mapbox');
const { saveData, getData } = require('../helpers/files');

const Place = require('./Place');

const historyLimit = 5;

class SearchEngine {
    history = [];

    constructor() {
        this.chargeHistoryFromDB();
    }

    async searchPlaces(place = '', limit = 5) {
        try {
            const params = { proximity: 'ip', limit: limit };
            const response = await mapboxClient.get(`/geocoding/v5/mapbox.places/${place}.json`, { params })
            let data = response.data.features;
            data = data.map((place) => {
                return new Place(place.id, place.place_name, place.center[1], place.center[0]);
            })

            return data;
        } catch (error) {
            return [];
        }
    }

    addToSearchHistory(name = '') {
        name = name.toLocaleLowerCase();
        if (!this.history.includes(name)) {
            this.history.unshift(name);
            this.history = this.history.splice(0, historyLimit);
            this.storeHistoryAtDB(this.history);
        };
    }

    get capitalizedHistory() {
        return this.history.map((search) => {
            return search.replace(/\w\S*/g, function (str) {
                return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
            })
        })
    }

    printSearchHistory() {
        this.capitalizedHistory.forEach((name, i) => {
            const index = `[${i + 1}]`.america;
            console.log(index, name)
        });
    }

    chargeHistoryFromDB() {
        const data = getData();
        if (data) {
            this.history = JSON.parse(data).history || [];
        }
    }

    storeHistoryAtDB(history) {
        saveData(JSON.stringify({ history }));
    }

}

module.exports = SearchEngine;