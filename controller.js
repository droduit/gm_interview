/**
 * Country API: https://restcountries.eu/#api-endpoints-all
 * Covid API: https://documenter.getpostman.com/view/10877427/SzYW2f8n?version=latest#287c16a2-d2b3-4de7-a45e-0455642c1a92
 */

const fetch = require('node-fetch');

class Controller {
    /**
     * Display the country with the most covid-19 cases
     * The display can be a simple object/array
     */
    countryWithMostCases() {
        fetch('https://covid19-api.org/api/status')
        .then(res => res.json())
        .then(json => {
            var maxCases = Math.max(...json.map(c => c.cases))
            var countryWithMostCases = json.find(c => c.cases === maxCases)
            console.log("1) Country with most cases: ");
            console.log(countryWithMostCases)
        })
        //
    }

    /**
     * Display the coutry's capital name (country's name) with the less cases.
     * Display: country's capital (country's name)
     */
    capitalOfCountryWithLessCases() {
        
        fetch('https://covid19-api.org/api/status')
        .then(res => res.json())
        .then(json => {
            var minCases = Math.min(...json.map(c => c.cases))
            var countryWithLessCases = json.find(c => c.cases === minCases)

            fetch('https://restcountries.eu/rest/v2/alpha/'+countryWithLessCases.country.toLowerCase())
            .then(res => res.json())
            .then(json => {
                console.log("\n2) Capital of country with less cases: ", ` () `);
                console.log(json.capital);
            }).catch(err => {
                console.log(err);
            });     
        }).catch(err => {
            console.log("Error", err);
        })
    }

    /**
     * Display the coutry's name that have no covid data.
     * Some countries available in the restcountry API have no data (doesn't exist) in the covid API
     * The display must be nice, not a simple object/array (for example A, B, C ...)
     */
    async findCountriesWithoutCovidData() {
        var text = "\n3) Countries without covid data: ";

        const res = await fetch('https://restcountries.eu/rest/v2/all');
        const allCountries = await res.json()

        const resCov = await fetch('https://covid19-api.org/api/status');
        const covid = await resCov.json()

        const countriesWithCovid = covid.map(c => c.country)

        const diff = allCountries.filter(country => !countriesWithCovid.includes(country.alpha2Code))

        for (var c of diff) {
             text += c.name+", ";
        }
        text = text.substr(0, text.length-2)
        console.log(text);
    }

    /**
     * This one will be access by a GET request
     * Set up a server in the server.js file
     * When you do a GET on localhost:5000/api/capitalToCovidCases this method must be called
     * This method will take as query parameter a country capital name and you need to return the number of death for this capital's country
     */
    async capitalToCovidCases(req, res) {
        
    }
}

module.exports = Controller;