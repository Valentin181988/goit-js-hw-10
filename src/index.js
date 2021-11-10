import './css/styles.css';
const debounce = require('lodash.debounce');

const input = document.querySelector("#search-box");

input.addEventListener('input', () => {
    const name = input.value;
    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,languages,population,flags`)
        .then(response => response.json())
        .then(countryData => console.log(countryData))
});


