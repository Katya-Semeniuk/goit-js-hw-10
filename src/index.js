import './css/styles.css';
import './css/interface.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getCountriesInfo from './fetchCountries';
import getRefs from './get-refs'

const DEBOUNCE_DELAY = 500;
const refs = getRefs();


refs.searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {

    const inputValue = e.target.value.trim();
    if (!inputValue) {
        cleanCountryList();
        cleanCountryInfo();
        return;
    }
    getCountriesInfo.fetchCountries(inputValue)
        .then(render)
        .catch(error => {
        console.log('catch')
                Notify.failure('Oops, there is no country with that name')
                return;
            
            
        });
};


function render(countries) {
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name')
        return;
    }
        if (countries.length >= 2 && countries.length <= 10) {
            cleanCountryList();
              cleanCountryInfo();
          createCountriesList(countries);
           
        }
        if (countries.length === 1){
            cleanCountryInfo();
            cleanCountryList();
            createCountryCard(countries);
        
        }
}; 

function cleanCountryList() {
     console.log('inside cleanCountryList')
    refs.countryList.innerHTML = '';
};

function cleanCountryInfo() {
    console.log('INSIDE leanCountryInfo')
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
    console.log(markupCountryCard)
    refs.countryInfo.insertAdjacentHTML('beforeend', markupCountryCard)
};



//---- create Countries`s List
function createCountriesList(countries) {
    const markupCountriesList = countries
            .map(({ name, flags }) =>
                `<li class="countries">
            <img class="img-flags" src="${flags.svg}" 
             alt="Flag of ${name.official}" />
                  <h1 class ="countries-name">${name.official}</h1>
                  </li>`)
            .join('');
    refs.countryList.insertAdjacentHTML('beforeend', markupCountriesList);
};