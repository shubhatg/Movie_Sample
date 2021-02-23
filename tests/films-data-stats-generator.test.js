/**
 * Note that this file cannot be modified.
 * If you would like to add your own unit tests, please put these in a separate test file.
 */

 //Setup
import { FilmsAPIService } from '../films-api-service.js'
import { FilmsDataStatsGenerator } from '../films-data-stats-generator.js'
import pkg from 'chai'
const { expect } = pkg;

const filmsDataStatsGenerator = new FilmsDataStatsGenerator(new FilmsAPIService());

describe("Films Data Stats Generator Tests", () => {

    describe("Tests for director Ridley Scott", () => {

        it("Test best rated film for Ridley Scott", async () => {
            const bestRatedFilm = await filmsDataStatsGenerator.getBestRatedFilm("Ridley Scott");
            expect(bestRatedFilm).to.eql("Gladiator");
        });

        it("Test average rating for Ridley Scott", async () => {
            const averageRating = await filmsDataStatsGenerator.getAverageRating("Ridley Scott");
            expect(averageRating).to.eql(7.0);
        });

        it("Test get shortest number of days between film releases for Ridley Scott", async () => {
            const shortestDays = await filmsDataStatsGenerator.getShortestNumberOfDaysBetweenFilmReleases("Ridley Scott");
            expect(shortestDays).to.eql(29);
        });

    });

    it("Tests director with most films", async () => {
        const directorWithMostFilms = await filmsDataStatsGenerator.getDirectorWithMostFilms();
        expect(directorWithMostFilms).to.eql("Ridley Scott");
    });

});
