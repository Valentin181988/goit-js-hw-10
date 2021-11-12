import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
import API from './fetch-api';
const input = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(() => {
    resetCountries();

    const name = input.value;

    if (name === "") {
        return;
    }

    API.fetchCountries(name)
        .then(responseProcessing)
          .catch(error => { console.log(error) });;
}, 300));

function responseProcessing(countries) {
    
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    };

    if (countries.length > 1) {
        countries.map((country) => {
            countryRender(country);
        }).join();
    };

    if (countries.length === 1) {
        countries.map((country) => {
            countryCardRender(country);
        }).join();    
    };
}

function countryRender({name,flags}) {
    countryList
        .insertAdjacentHTML("beforeend", `<li class ="list"><img src="${flags.svg}" class ="size">${name.official}</li>`);   
}

function countryCardRender({name,capital,population,languages,flags}) {
    const languagesValue = Object.values(languages);

    countryInfo.insertAdjacentHTML("beforeend",
        `<ul>
           <li class ="list"><img src="${flags.svg}" class ="size">${name.official}</li>
           <li class ="list">
              <h2>Country:${capital}</h2>
           </li>
           <li class ="list">
              <h2>Population:${population}</h2>
           </li>
           <li class ="list">
              <h2>Languages:${languagesValue}</h2>
           </li>
        </ul>`);
}

function resetCountries() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}






