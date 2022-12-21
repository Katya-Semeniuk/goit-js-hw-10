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


function render (countries) {
    
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
function createCountryCard() {
    const markupCountryCard = countries
            .map(({ name, capital, population, flags, language }) =>
                `<div class="country">
                <h1>Country ${name.official} </h1>
                <p>Capital ${capital} </p>
                <p>Population ${population} </p>
                <>
                <img class="img-flag" src="${flags.svg}" 
            alt="Flag of ${name.official}" />
            <p> languages${language} </p>
                </div>`)
            .join('');
    refs.countryInfo.insertAdjacentHTML('beforeend', markupCountryCard)
};



//---- create Countries`s List
function createCountriesList() {
    const markupCountriesList = countries
            .map(({ name, flags }) =>
                `<li class="country">
            <img class="img-flag" src="${flags.svg}" 
             alt="Flag of ${name.official}" />
                  <h1 class ="countries-name">${name.official}</h1>
                  </li>`)
            .join('');
        console.log(markupCountriesList);
    refs.countryList.insertAdjacentHTML('beforeend', markupCountriesList);
};