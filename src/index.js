import './css/styles.css';
import './css/interface.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import API from './fetchCountries';
import getRefs from './get-refs'

const DEBOUNCE_DELAY = 2000;
const refs = getRefs();


refs.searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {

    const inputValue = e.target.value.trim();
    API.fetchCountries(inputValue)
        .then(render)
        .catch(error => {
            Notify.failure('Oops, there is no country with that name')
        })
        .finally();
};


function render(countries) {
    console.log(countries.length)

    if (countries.length >= 10) {
        console.log("INSIDE FIRST IF");
        Notify.info('Too many matches found. Please enter a more specific name');
        
} else 
        if (countries.length >= 2 && countries.length < 10) {
          createCountriesList(countries);
            cleanCountryList();
        }
        else {
            console.log("INSIDE THIRD IF");
            createCountryCard(countries);
        cleanCountryInfo();
        }
};

function cleanCountryList() {
    refs.countryList.innerHTML = '';
};

function cleanCountryInfo() {
    refs.countryInfo.innerHTML = '';
};



// ---- create card for one country
function createCountryCard(countries) {
    const markupCountryCard = countries
            .map(({ name, capital, population, flags, languages }) =>
                `<div class="container-country">
                <h1 class="title"> ${name.official} </h1>
                <img class="img-flag" src="${flags.svg}" 
            alt="Flag of ${name.official}" />
                <p><span class="subtitle">Capital: </span>${capital} </p>
                <p><span class="subtitle">Population:</span> ${population} </p>
            <p><span class="subtitle">Languages: </span>${Object.values(languages)} </p>
                </div>`)
            .join('');
    refs.countryInfo.insertAdjacentHTML('beforeend', markupCountryCard)
};



//---- create Countries`s List
function createCountriesList() {
    const markupCountriesList = countries
            .map(({ name, flags }) =>
                `<li class="countries">
            <img class="img-flags" src="${flags.svg}" 
             alt="Flag of ${name.official}" />
                  <h1 class ="countries-name">${name.official}</h1>
                  </li>`)
            .join('');
        console.log(markupCountriesList);
    refs.countryList.insertAdjacentHTML('beforeend', markupCountriesList);
};