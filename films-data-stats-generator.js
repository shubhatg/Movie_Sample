
import _ from 'lodash';
import { FilmsAPIService } from './films-api-service.js';

export class FilmsDataStatsGenerator {
    fileData
    constructor(filmsApiService) {
        this.filmsApiService = new FilmsAPIService();

    }

    getData() {
        return new Promise(resolve => {
            if (!this.fileData) {
                this.filmsApiService.getFilms().then(res => {
                    this.fileData = res['data'];
                    resolve(this.fileData);
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                resolve(this.fileData)
            }
        });
    }

    /**
     * Retrieves the name of the best rated film that was directed by the director with the given name.
     * If there are no films directed the the given director, this method should return null.
     * Note there will only be one film with the best rating.
    */
    async getBestRatedFilm(directorName) {
        let data = await this.getData() ;
            let temp1 = data.filter(element => element.directorName === directorName);
            let sorted_data = temp1.sort(function (a, b) {
                if (parseFloat(a.rating) < parseFloat(b.rating)) {
                    return 1;
                }
                if (parseFloat(a.rating) > parseFloat(b.rating)) {
                    return -1;
                }
                return 0;
            });

            return sorted_data[0].name;
    }

    /**
     * Retrieves the name of the director who has directed the most films in the CodeScreen Film service.
    */
    async getDirectorWithMostFilms() {
        let data = await this.getData();
        let uniqueDirectorCount = _.countBy(data, 'directorName') // get the uniq count of directors
        let max = _.orderBy(uniqueDirectorCount) // order By the count
        return (Object.keys(uniqueDirectorCount).find(key => uniqueDirectorCount[key] === max[max.length - 1]))
    }

    /**
     * Retrieves the average rating for the films directed by the given director, rounded to 1 decimal place.
     * If there are no films directed by the given director, this method should return null.
    */
    async getAverageRating(directorName) {
        let data = await this.getData();
        let moviesByDirector = _.filter(data, x => x.directorName === directorName);// get the uniq count of directors
        let avg = Math.round((_.sumBy(moviesByDirector, 'rating') * 10 / moviesByDirector.length)) / 10;
        return (avg)
    }

    /**
     * Retrieves the shortest number of days between any two film releases directed by the given director.

     * If there are no films directed the the given director, this method should return null.
     * If there is only one film directed by the given director, return 0.
     * Note that no director released more than one film on any given day.
     *
     * For example, if the service returns the following 3 films,
     *
     * {
     *    "name": "Batman Begins",
     *    "length": 140,
     *
     *    "rating": 8.2,
     *    "releaseDate": "2006-06-16",
     *    "directorName": "Christopher Nolan"
     * },
     * {
     *    "name": "Interstellar",
     *    "length": 169,
     *    "rating": 8.6,
     *    "releaseDate": "2014-11-07",
     *    "directorName": "Christopher Nolan"
     * },
     * {
     *   "name": "Prestige",
     *   "length": 130,
     *   "rating": 8.5,
     *   "releaseDate": "2006-11-10",
     *   "directorName": "Christopher Nolan"
     * }
     *
     * then this method should return 147 for Christopher Nolan, as Prestige was released 147 days after Batman Begins.
    */
    async getShortestNumberOfDaysBetweenFilmReleases(directorName) {
        let date_sorter = function (a, b) {
            return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        }

        let differenceInDays = function (d1, d2) {
            let Difference_In_Time = Math.abs(new Date(d1).getTime() - new Date(d2).getTime());
            let daysDiff = Difference_In_Time / (1000 * 3600 * 24);
            return daysDiff;
        }
        let getMinDiffBetweenDates = function (data) {
            let moviesByDirector = _.filter(data, x => x.directorName === directorName);
            if (moviesByDirector.length == 0) {
                return null;
            }
            if (moviesByDirector.length == 1) {
                return 0;
            }
            let data_sorted_by_date = moviesByDirector.sort(date_sorter);
            let minDiff = differenceInDays(data_sorted_by_date[0].releaseDate, data_sorted_by_date[1].releaseDate);
            for (let i = 2; i < data_sorted_by_date.length; i++) {
                let daysDiff = differenceInDays(data_sorted_by_date[i].releaseDate, data_sorted_by_date[i - 1].releaseDate);
                minDiff = Math.min(minDiff, daysDiff);
            }
            return minDiff;
        }
        return getMinDiffBetweenDates(await this.getData());
    }
}
