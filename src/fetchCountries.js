export default { fetchCountries };

const BASE_URL = 'https://restcountries.com/';

function fetchCountries(name) {
 return fetch(`${BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
     .then(response => {
         console.log(response.status)
         if (response.status !== 200) {
                return;
         }
        return response.json();
    })
};
