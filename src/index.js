import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetch-api';
const debounce = require('lodash.debounce');

const input = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(() => {

    resetCountries();

    const name = input.value.trim();

    if (name === "") {
        return;
    }

    if (!name) {
        resetCountries();
        return;
    }

    API.fetchCountries(name)
        .then(responseProcessing)
          .catch(error => { console.log(error) })
}, 300));

function responseProcessing(countries) {
    resetCountries();

    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    };

    if (countries.length >= 2) {
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
        .insertAdjacentHTML("beforeend", `<li class ="list"><img src="${flags.svg}" class ="size"><span class="fields">${name.official}</span></li>`);   
}

function countryCardRender({name,capital,population,languages,flags}) {
    const languagesValue = Object.values(languages);

    countryInfo.insertAdjacentHTML("beforeend",
        `<ul>
           <li class ="list list-card"><img src="${flags.svg}" class ="size">${name.official}</li>
           <li class ="list">
              <h2>Country: <span class="fields">${capital}</span></h2>
           </li>
           <li class ="list">
              <h2>Population: <span class="fields">${population}</span></h2>
           </li>
           <li class ="list">
              <h2>Languages: <span class="fields">${languagesValue}</span></h2>
           </li>
        </ul>`);
}

function resetCountries() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}






