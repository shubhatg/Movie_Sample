import axios  from 'axios';

export class FilmsAPIService {

    static filmsEndpointUrl = "https://app.codescreen.dev/api/assessments/films";

    // Your API token. Needed to successfully authenticate when calling the films endpoint. 
    // This needs to be included in the Authorization header in the request you send to the films endpoint.
    static apiToken = "8c5996d5-fb89-46c9-8821-7063cfbc18b1";

    // Retrieves the data for all films by calling the https://app.codescreen.dev/api/assessments/films endpoint.
    async getFilms() {
        console.log("Calling Remote API....") ;
        return axios.get('https://app.codescreen.dev/api/assessments/films', {
            headers: {
              'Authorization': `Bearer 8c5996d5-fb89-46c9-8821-7063cfbc18b1`
            }
          })        
    }
    
}
