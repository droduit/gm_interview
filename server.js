const Controller = require('./controller');
const express = require('express')
const app = express()
const fetch = require('node-fetch');

app.use(express.json())

const controller = new Controller();
/*
controller.countryWithMostCases();
controller.capitalOfCountryWithLessCases();
controller.findCountriesWithoutCovidData();
*/

/**
     * This one will be access by a GET request
     * Set up a server in the server.js file
     * When you do a GET on localhost:5000/api/capitalToCovidCases?capital=Bern this method must be called
     * This method will take as query parameter a country capital name and you need to return the number of death for this capital's country
     */
app.get('/api/capitalToCovidCases', async function (req, res) {
    var capital = req.query.capital
    controller.capitalToCovidCases(capital)

    const resCountries = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await resCountries.json()

    const country = countries.filter(c => c.capital === capital).map(c => c.alpha2Code)[0]
    
    const resCov = await fetch('https://covid19-api.org/api/status/'+country);
    const covid = await resCov.json()
    
    res.status(200).json(covid.deaths)
})

// for the question 4
app.listen(5000, () => {
    console.log("running on localhost:5000")
});

// GET: '/api/capitalToCovidCases' => controller.capitalToCovidCases();

// this code call your server, do not touch this code
/*
axios.get('http://localhost:5000/api/capitalToCovidCases?capital=Bern', {
     headers: {
         'Content-Type': 'application/json',
     }
}).then(r => console.log("\n4) Death in Switzerland: ", r.data))
*/
