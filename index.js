
require('colors');
require("dotenv").config();

const { pause, readInput, showMenu, showChoiceMenu } = require('./helpers/inquirer');
const SearchEngine = require('./models/SearchEngine');

const main = async () => {
    let option;
    const searchEngine = new SearchEngine();

    do {

        option = (await showMenu()).option;

        switch (option) {
            case 1:
                const search = await readInput(`Lugar: `);
                const places = await searchEngine.searchPlaces(search);
                const placeId = await showChoiceMenu(places);

                if (placeId !== 0) {
                    const place = places.find((place) => { return place.id === placeId });
                    searchEngine.addToSearchHistory(place.name);
                    await place.printDetails();
                }

                break;
            case 2:
                searchEngine.printSearchHistory();
                break;
            default:
                break;
        }

        await pause();

        console.clear();

    } while (option !== 0);

}


console.clear();

main();