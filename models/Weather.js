class Weather {
    description = '';
    temp = 0;
    tempMax = 0;
    tempMin = 0;

    constructor(description, temp, tempMin, tempMax) {
        this.description = description;
        this.temp = temp;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
    }

}

module.exports = Weather;