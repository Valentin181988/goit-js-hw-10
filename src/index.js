import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const input = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(() => {
    resetCountries();
    console.log("deb")

    const name = input.value;

    if (name === "") {
        return;
    }

    fetchCountries(name).then(responceProcesing);
}, 300));

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies,flags,languages`)
        .then(response => {
            if (!response.ok) {
                console.log(response)
                throw new Error(response.statusText);
            }
            return response.json();
        })
}

function responceProcesing(countries) {
    
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    };

    if (countries.length > 1) {
        countries.forEach((country) => {
            countryRender(country);
        });
    };

    if (countries.length === 1) {
        countries.forEach((country) => {
            countryCardRender(country);
        });    
    };
}

function countryRender(country) {
    countryList
        .insertAdjacentHTML("beforeend", `<li class ="list"><img src="${country.flags.svg}" class ="size">${country.name.official}</li>`);   
}

function countryCardRender(country) {
    countryInfo.insertAdjacentHTML("beforeend",
        `<ul>
           <li class ="list">${country.name.official}</li>
           <li class ="list">${country.capital}</li>
           <li class ="list">${country.population}</li>
           <li class ="list" <img src="${country.flags.svg}" class ="size"></li>
           <li class ="list">${country.languages}</li>
        </ul>`);
}

function resetCountries() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}






